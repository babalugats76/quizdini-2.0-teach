import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import * as actions from "../actions";
import { useActions } from "/";

/**
 * Custom Hook for Redux interactions.
 *
 * Faciliates the ability to perform simultaneous redux fetches.
 *
 * @param {object}        Params, including: `items` (array of redux actions), `deps` (array for `fetchData`)
 * @returns {object}      State items
 *
 * To debug:
 * ```
 *   useEffect(() => {
 *     console.log(JSON.stringify(state));
 *   }, [state]);
 * ```
 */

export default function useReduxData({ items = [], deps = [] }) {
  const isCancelled = useRef(false); // for tracking dismounting
  const boundActions = useActions(actions); // bind all possible actions (object contains dispatchable actions)
  const initialState = {
    executions: 0,
    hasError: false,
    loading: false,
    requests: 0,
    results: null
  };
  const [state, setState] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCH_BEGIN":
        return {
          ...state,
          hasError: false,
          loading: true,
          results: null
        };
      case "FETCH_END":
        return {
          ...state,
          executions: state.executions + 1,
          hasError: action.errorCount ? true : false,
          loading: false,
          requests: state.requests + action.count,
          results: action.results
        };
      case "FETCH_FAILURE":
        return {
          ...state,
          executions: state.executions + 1,
          hasError: true,
          loading: false,
          results: action.results
        };
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
   * Memoized calculation which determines error from results.
   *
   * @returns {array}  Errors (if there are any)
   */
  const errors = useMemo(() => {
    if (state.hasError) {
      return (
        (Array.isArray(state.results) &&
          state.results.map((accum, result) => {
            if (result.error) accum.push(result.error);
            return accum;
          }, [])) || [state.results]
      );
    }
  }, [state.hasError, state.results]);

  /***
   * Simultaneous calls one or more redux actions.
   *
   * Assumes that action creators return responses directly to the caller.
   * Once all actions are complete, appropriate actions are dispatched to the reducer (to update state).
   */
  const fetchData = useCallback(() => {
    if (!items.length) return;
    dispatch({ type: "FETCH_BEGIN" });
    Promise.all(
      items.map(async action => {
        const res = await boundActions[action]();
        if (res.data) return { action, data: res.data };
        if (res.error) return { action, error: res.error };
      })
    )
      .then(res => {
        const errorCount = res.reduce((accum, action) => {
          if (action.error) return accum + 1;
          return accum;
        }, 0);
        dispatch({
          type: "FETCH_END",
          count: res.length,
          errorCount,
          results: res
        });
      })
      .catch(err => {
        dispatch({
          type: "FETCH_FAILURE",
          count: err.length,
          results: "Error fetching data..."
        });
      });
  }, [items, boundActions, dispatch]);

  /***
   * Side effect that fetches data items.
   * Runs once (on mount) and whenever `deps`' values change.
   */
  useEffect(
    () => fetchData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? deps : []
  );

  /***
   * Side effect whose cancel function updates current value of `isCancelled` ref.
   * Used to prevent no-ops from `setState` calls made after the component dismounts.
   * Runs once (on mount only); cancel function called on dismount.
   */
  useEffect(() => {
    return () => (isCancelled.current = true);
  }, []);

  return {
    errors, // array of errors (if they exist)
    executions: 0, // running fetch count, successful or not
    hasError: false, // whether one or more errors occured during last fetch
    loading: false, // whether fetch underway
    requests: 0, // running total of api calls
    results: null // results
  };
}
