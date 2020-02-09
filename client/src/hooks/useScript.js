import { useState, useEffect } from 'react';

/**
 * Custom Hook to dynamically load 3rd-party scripts.
 *
 * Adapted from: `https://usehooks.com/useScript/`
 *
 * @param {string} src        Fully-qualified URL of script to load
 * @returns {array}           State item(s)
 */

export default function useScript(src, attributes = {}) {
  const [state, setState] = useState({
    loaded: false,
    error: false
  }); // for tracking loading and error

  /***
   * Side effect that loads 3rd-party scripts.
   * Scripts are attached to page and event listeners handle `load` and `error` callbacks.
   * Runs on mount and whenever `src` or `uniqueId` changes.
   */
  useEffect(
    () => {
      let didCancel = false;

      console.log('effect fired...');

      if (document.querySelector(`script[src="${src}"]`)) {
        console.log('script already loaded...');
        if (!didCancel) setState({ loaded: true, error: false });
        return;
      }

      let script = document.createElement('script');
      script.src = src;

      Object.keys(attributes).forEach(key => (script[key] = attributes[key]));

      const onScriptLoad = () => {
        if (!didCancel) setState({ loaded: true, error: false });
      };

      const onScriptError = () => {
        if (!didCancel) setState({ loaded: true, error: true });
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('error', onScriptError);

      document.body.appendChild(script);

      return () => {
        didCancel = true;
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);
      };
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ); // Only run effect on mount (new instance is required for each script)

  return [
    state.loaded, // if script has been added to page
    state.error // whether error occurred when loading script
  ];
}
