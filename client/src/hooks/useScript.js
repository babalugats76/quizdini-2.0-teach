import { useState, useEffect } from 'react';

/**
 * Custom Hook to dynamically load 3rd-party scripts.
 *
 * Adapted from: `https://usehooks.com/useScript/`
 *
 * @param {string} src        Fully-qualified URL of script to load
 * @param {string} uniqueId   `id` attribute to give the script tag
 * @param {function} onLoad   Function to fire on Load
 * @returns {array}           State item(s)
 */

export default function useScript(src, uniqueId, onLoad = null) {
  const [state, setState] = useState({
    loaded: false,
    error: false
  }); // for tracking loading and error

  /***
   * Side effect that loads 3rd-party scripts.
   * Scripts are attached to page and event listeners handle `load` and `error` callbacks.
   * Runs on mount and whenever `src` or `uniqueId` changes.
   */
  useEffect(() => {
    if (document.getElementById(uniqueId)) {
      setState({ loaded: true, error: false });
    } else {
      let script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.id = uniqueId;
      script.onload = onLoad || (() => console.log(uniqueId, 'loaded...'));

      const onScriptLoad = () => {
        setState({ loaded: true, error: false });
      };

      const onScriptError = () => {
        setState({ loaded: true, error: true });
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('error', onScriptError);

      document.body.appendChild(script);

      return () => {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);
      };
    }
  }, [src, uniqueId, onLoad]);

  return [
    state.loaded, // if script has been added to page
    state.error // whether error occurred when loading script
  ];
}
