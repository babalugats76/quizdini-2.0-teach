import { useCallback, useEffect } from "react";

/**
 * Custom Hook to set web page title.
 *
 * Dependencies: process.env.REACT_APP_WEBSITE_NAME
 *
 * @param {object}       Params, including: `title`, `deps`
 */

export default function useTitle({ title, deps = [] } = {}) {
  // Memoized function to set document's title attribute
  const setTitle = useCallback(() => {
    document.title = [process.env.REACT_APP_WEBSITE_NAME, title].join(" | ");
  }, [title]);

  /***
   * Side effect that sets timer.
   * Runs once (on mount) and whenever dependencies change.
   */
  useEffect(
    () => title && setTitle(title),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps, title] : []
  );
}
