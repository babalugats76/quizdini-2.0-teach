import { useCallback, useEffect, useRef, useState } from 'react';

const useMessage = ({ props, debug = false }) => {
  // necessary because history.replace both mutable and a dependency
  const isSet = useRef(false);

  // destructure props
  const {
    location: { state: { message: notify } = {}, pathname } = {},
    history: { replace } = {}
  } = props;

  // save dismissable message in state
  const [message, setMessage] = useState(null);

  // sets initial message and replaces browser history record
  useEffect(() => {
    debug && console.log('Effect in useMessage fired...');
    if (!isSet.current) {
      debug && console.log('Setting message...');
      notify && setMessage(m => notify);
      notify && replace({ pathname, state: {} });
      isSet.current = true;
    }
  }, [notify, pathname, replace, debug]);

  // used to clear "dismiss" message
  const dismissMessage = useCallback(() => {
    debug && console.log('Dismissing message...');
    setMessage(null);
  }, [debug]);

  return [message, dismissMessage];
};

export default useMessage;
