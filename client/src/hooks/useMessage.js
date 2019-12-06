import { useCallback, useEffect, useState } from 'react';

const useMessage = ({ props, debug = false }) => {
  // destructure props
  const {
    location: { state: { message: notify } = {}, pathname } = {},
    history: { replace } = {}
  } = props;

  // save dismissable message in state
  const [message, setMessage] = useState(null);

  /**
   * memoized function that sets initial message
   * replaces browser history record
   */

  const handleMessage = useCallback(() => {
    notify && setMessage(m => notify);
    notify && replace({ pathname, state: {} });
  }, [notify, pathname, replace]);

  // handle message on mount only
  useEffect(() => {
    debug && console.log('handling message...');
    handleMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debug]);

  // memoized clear "dismiss" message
  const dismissMessage = useCallback(() => {
    debug && console.log('Dismissing message...');
    setMessage(null);
  }, [debug]);

  return [message, dismissMessage];
};

export default useMessage;
