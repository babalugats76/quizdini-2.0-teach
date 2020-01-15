import { useEffect, useState } from "react";

/**
 * Custom Hook to implement simple timeout functionality.
 *
 * Use cases vary, but most commonly used for rendering things for a specific amount of time, etc.
 *
 * @param {number} millseconds  Duration (in milliseconds) of timeout
 * @returns {array}             State item(s) and function that enables timer
 *
 * To debug:
 * ```
 *   useEffect(() => {
 *     console.log(active);
 *   }, [active]);
 * ```
 */

export default function useTimeout(millseconds = 0) {
  const [active, setActive] = useState(false); // local state

  /***
   * Side effect that activates timer.
   * Runs once (on mount) and whenever dependencies change.
   * Cancel function clears active timers only.
   */
  useEffect(() => {
    const timer =
      active &&
      setTimeout(() => setActive(prevState => !prevState), millseconds);
    return () => timer && clearTimeout(timer);
  }, [active, millseconds]);

  return [
    active, // whether currently in timeout
    setActive // function to activate timer 
  ];
}
