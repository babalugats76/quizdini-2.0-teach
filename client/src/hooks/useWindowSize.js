import { useEffect, useMemo, useState, useCallback } from "react";

/**
 * Custom Hook to subscribe to browser window dimension information.
 *
 * @param {number} tabletBreakpoint  Min width of tablet, i.e., transition from mobile -> tablet
 * @returns {object}                 State items and utility function(s)
 *
 * To debug:
 * ```
 * useEffect(() => {
 *    console.log(JSON.stringify(windowSize, null, 4));
 *    console.log('isMobile', isMobile);
 * }, [windowSize, isMobile])
 * ```
 */

export default function useWindowSize(tabletBreakpoint = 768) {
  const isClient = typeof window === "object"; // ensure client JavaScript context

  // Memoized function to determine current window dimensions
  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize); // local state

  /***
   * Memoized calculation to determine whether viewport is mobile
   *
   * @returns {boolean}  Whether viewport is mobile (or not)
   */
  const isMobile = useMemo(() => {
    return windowSize.width < tabletBreakpoint ? true : false;
  }, [tabletBreakpoint, windowSize.width]);

  /***
   * Side effect that listens for changes to browser window.
   *
   * Attaches window listener, providing callback.
   * Callback updates state with current window dimensions.
   *
   * Runs once (on mount) and whenever dependencies change.
   * Cancel function removes window listener.
   */
  useEffect(() => {
    if (!isClient) return false;

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSize, isClient, setWindowSize]);

  return {
    width: windowSize.width, // current width of viewport
    height: windowSize.height, // current height of viewport
    isMobile // whether viewport is mobile (or not)
  };
}
