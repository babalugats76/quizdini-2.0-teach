import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

/**
 * Hook recipe, modified from `https://react-redux.js.org/next/api/hooks#recipe-useactions`.
 *
 * "Helper" hook which returns reference(s) to the provided dispatch function(s) -- after they are bound -- from the Redux store.
 * Used elsewhere -- in other hooks -- that need to interact with Redux store.
 *
 * @param {object || array || function} actions Action creator(s) to bind (make dispatchable)
 * @returns {object}                            Dispatchable action creators
 */

export default function useActions(actions) {
  const dispatch = useDispatch(); // redux hook

  // memoized calculation (to bind actions)
  const boundActions = useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map(a => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    [actions, dispatch]
  );

  return boundActions; // dispatchable action creator(s)
}
