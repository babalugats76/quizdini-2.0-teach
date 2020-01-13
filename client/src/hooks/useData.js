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
 * @param {object}        Params, including: url (path to resource), deps (array for get)
 * @returns {object}      Containing state items and reset function
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

  // Wraps setState to avoid no-ops
  // Attempts to setState on dismounted components will be short-circuited
  const dispatch = useCallback(
    (...args) => {
      !isCancelled.current && setState(...args);
    },
    [isCancelled, setState]
  );

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

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  const initialized = useMemo(() => {
    return state.executions > 0;
  }, [state.executions]);

  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get, ...deps]);

  useEffect(() => {
    return () =>  {
      console.log('component dismounting...');
      isCancelled.current = true;
    }
  }, []);

  return {
    data: state.data,          // successful response (from API)
    error: state.error,        // unsuccessful response (from API) 
    initialized,               // if there has been at least one execution attempt
    loading: state.loading,    // if fetch is in progress
    reset                      // function to "reset" state to initialState
  };
}
