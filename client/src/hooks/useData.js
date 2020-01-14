import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import axios from "axios";

/***
 * Custom Hook for direct API interactions using the axios library.
 *
 * Saves responses, successful and unsuccesful, to state.
 * Fetches via GET method are updatable (through use of user-defined deps).
 * Tracks executions (state.executions) and whether initialized (executions > 0).
 * State can be reset to initialState (useful in switching data sources, i.e., url).
 *
 * @param {object}        Params, including: `url` (path to resource), `deps` (array for `get`)
 * @returns {object}      State items and reset function
 *
 * To debug:
 * ```
 *   useEffect(() => {
 *     console.log(JSON.stringify(state));
 *   }, [state]);
 * ```
 */

export default function useData({ url, deps = [] }) {
  const isCancelled = useRef(false); // for tracking dismounting

  const initialState = {
    data: null,
    error: null,
    executions: 0,
    loading: false
  };

  const [state, setState] = useReducer((state, action) => {
    switch (action.type) {
      case "BEGIN":
        return {
          ...state,
          error: null,
          loading: true
        };
      case "SUCCESS":
        return {
          ...state,
          data: action.data,
          error: null,
          executions: state.executions + 1,
          loading: false
        };
      case "FAILURE":
        return {
          ...state,
          error: action.error,
          executions: state.executions + 1,
          loading: false
        };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  }, initialState);

  /***
   * Wraps `setState` to avoid no-ops.
   *
   * Attempts to `setState` on dismounted components will be short-circuited.
   * Relies upon `isCancelled` ref and side effect that maintains its value.
   */
  const dispatch = useCallback(
    (...args) => {
      !isCancelled.current && setState(...args);
    },
    [isCancelled, setState]
  );

  /***
   * Calls GET method of url using axios.
   *
   * Appropriate action is dispatched to the reducer (to update state).
   *
   * @returns {object}  data or error object (from server)
   */
  const get = useCallback(async () => {
    try {
      dispatch({ type: "BEGIN" });
      const res = await axios.get(url);
      const { data } = res;
      dispatch({ type: "SUCCESS", data });
      return { data };
    } catch (err) {
      const { data: error } = err.response;
      dispatch({ type: "FAILURE", error });
      return { error };
    }
  }, [dispatch, url]);

  /***
   * Dispatches action to reducer which resets state to initialState
   * Used by client in order to switch data sources, etc.
   */
  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  /***
   * Memoized calculations indicating whether data
   * has been initialized, i.e., state.executions > 0.
   *
   * @returns {boolean}  Whether data has been initialized
   */
  const initialized = useMemo(() => {
    return state.executions > 0;
  }, [state.executions]);

  /***
   * Side effect which calls `get()` to fetch data from resource (url).
   * Will fetch on mount and should provided `deps` change.
   */
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get, ...deps]);

  /***
   * Side effect whose cancel function updates current value of `isCancelled` ref.
   * Used to prevent no-ops from `setState` calls made after the component dismounts.
   * Runs once (on mount only); cancel function called on dismount.
   */
  useEffect(() => {
    return () => (isCancelled.current = true);
  }, []);

  return {
    data: state.data, // successful response (from API)
    error: state.error, // unsuccessful response (from API)
    initialized, // if there has been at least one execution attempt
    loading: state.loading, // if fetch is in progress
    reset // function to "reset" state to initialState
  };
}
