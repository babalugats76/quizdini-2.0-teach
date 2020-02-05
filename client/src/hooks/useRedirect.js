import { useCallback, useEffect, useRef, useState } from 'react';

/***
 * Custom Hook for redirecting from one component to another.
 *
 * Performs redirect by calling `push` method of `history` object.
 * Refer to: `https://reacttraining.com/react-router/web/api/history`
 *
 * Incorporates a timeout.
 *
 * @param {object}        Params, including: `history`, `to`, `state`, and `timeout`
 * @returns {array}       State items and redirect function
 *
 * To debug:
 * ```
 *   useEffect(() => {
 *     console.log(JSON.stringify(isRedirecting));
 *   }, [isRedirecting]);
 * ```
 */

export default function useRedirect({
  history = null,
  to = '/',
  state = {},
  timeout = 300
}) {
  const isCancelled = useRef(false); // for tracking dismounting
  const [isRedirecting, setState] = useState(false); // local state

  /***
   * Wraps `setState` to avoid no-ops.
   *
   * Attempts to `setState` on dismounted components will be short-circuited.
   * Relies upon `isCancelled` ref and side effect that maintains its value.
   */
  const setIsRedirecting = arg => !isCancelled.current && setState(arg);

  /***
   * Memoized function which performs redirect
   * @param {object} notify Optional, object containing message info to pass along
   *
   * Wraps in timeout to faciliate brief delay.
   * Redirects using react-router's mutable `history` object.
   */
  const redirect = useCallback(
    notify => {
      setIsRedirecting(true);
      setTimeout(() => {
        history.push(to, { ...state, message: { ...notify } });
      }, timeout);
    },
    [history, to, state, timeout]
  );

  /***
   * Side effect whose cancel function updates current value of `isCancelled` ref.
   * Used to prevent no-ops from `setState` calls made after the component dismounts.
   * Runs once (on mount only); cancel function called on dismount.
   */
  useEffect(() => {
    return () => (isCancelled.current = true);
  }, []);

  return [
    isRedirecting, // current state value of isRedirecting
    redirect // function that initiates redirect
  ];
}
