import { useCallback, useEffect, useState } from "react";

/***
 * Custom Hook for handling messages forwarded to components using react router.
 *
 * Saves message as state and provides function to dismiss, i.e., to "clear" the message.
 *
 * Replaces current entry on the history stack by using its history's `replace` function.
 * Refer to: `https://reacttraining.com/react-router/web/api/history`
 * This is required so that the user cannot abuse back button.
 *
 * @param {object} props  Props object from component (must include location and `history`!)
 * @returns {array}       State items and dismiss function
 *
 * To debug:
 * ```
 *   useEffect(() => {
 *     console.log(JSON.stringify(message));
 *   }, [message]);
 * ```
 */

export default function useMessage(props) {
  // destructure props
  const {
    location: { state: { message: notify } = {}, pathname } = {},
    history: { replace } = {}
  } = props;

  // save dismissable message in state
  const [message, setMessage] = useState(null);

  /***
   * Memoized function which initializes `message` state
   * and replaces current entry in history, clearing its `state` sub-object.
   */
  const handleMessage = useCallback(() => {
    notify && setMessage(m => notify);
    notify && replace({ pathname, state: {} });
  }, [notify, pathname, replace]);

  /***
   * Memoized function which "clears" `message` state.
   */
  const dismissMessage = useCallback(() => {
    setMessage(null);
  }, [setMessage]);

  /***
   * Side effect which calls `handleMessage`.
   * Will execute on mount only.
   */
  useEffect(() => {
    handleMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    message, // current state value of message (shown to user)
    dismissMessage // function call to "clear" message
  ];
}
