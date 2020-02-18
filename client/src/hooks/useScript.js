import { useCallback, useEffect, useReducer, useRef } from "react";

/**
 * Custom Hook to dynamically load 3rd-party scripts.
 *
 * Adapted from: `https://usehooks.com/useScript/`
 *
 * @param {string} src         Fully-qualified URL of script to load
 * @param {object} attributes  Additional attributes to add to `<script>` tag
 * @returns {array}            State item(s)
 */

export default function useScript(src, attributes = {}) {
  const isCancelled = useRef(false); // for tracking dismounting
  const attribs = useRef(attributes); // used to avoid infinite loop, i.e., object in dependency list
  const initialState = { loaded: false, error: null }; // local state

  const [state, setState] = useReducer((state, action) => {
    switch (action.type) {
      case "LOADED":
        return {
          ...state,
          loaded: true
        };
      case "ERROR":
        return {
          ...state,
          error: action.error
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
   * Side effect that loads 3rd-party scripts.
   * Scripts are attached to page and event listeners handle `load` and `error` callbacks.
   * Runs on mount and whenever `src` or `uniqueId` changes.
   */
  useEffect(
    () => {
      if (document.querySelector(`script[src="${src}"]`)) {
        // console.log("script already loaded...");
        dispatch({ type: "LOADED" });
        return;
      }

      let script = document.createElement("script");
      script.src = src;
      console.log(attribs.current);
      Object.keys(attribs.current).forEach(key => (script[key] = attributes[key]));

      const onScriptLoad = () => { dispatch({ type: "LOADED" }); };
      const onScriptError = err => { dispatch({ type: "ERROR", error: err }); };

      script.addEventListener("load", onScriptLoad);
      script.addEventListener("error", onScriptError);

      document.body.appendChild(script);

      return () => {
        // console.log("unloading...");
        script.removeEventListener("load", onScriptLoad);
        script.removeEventListener("error", onScriptError);
      };
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [src, attribs, dispatch]
  ); // Only run effect on mount (new instance is required for each script)

  /***
   * Side effect whose cancel function updates current value of `isCancelled` ref.
   * Used to prevent no-ops from `setState` calls made after the component dismounts.
   * Runs once (on mount only); cancel function called on dismount.
   */
  useEffect(() => {
    return () => (isCancelled.current = true);
  }, []);

  return [
    state.loaded, // if script has been added to page
    state.error // whether error occurred when loading script
  ];
}
