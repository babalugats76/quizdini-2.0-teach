import { useCallback, useEffect, useRef, useState } from 'react';
import { useActions } from './';
import * as actions from '../actions/';

const useRedirect = ({
  history = null,
  refreshAuth = false,
  to = '/dashboard',
  state = {},
  timeout = 300,
  debug = false
}) => {
  const isCancelled = useRef(false);
  const [isRedirecting, setState] = useState(null);
  const fetchAuth = useActions(actions.fetchAuth);
  const setIsRedirecting = arg => !isCancelled.current && setState(arg);

  const redirect = useCallback(
    notify => {
      setIsRedirecting(true);
      setTimeout(async function() {
        if (refreshAuth) await fetchAuth();
        history.push(to, { ...state, message: { ...notify } });
      }, timeout);
    },
    [history, refreshAuth, fetchAuth, to, state, timeout]
  );

  useEffect(() => {
    return () => {
      debug && console.log('redirect cleanup...');
      isCancelled.current = true;
    };
  }, [debug]);

  return [isRedirecting, redirect];
}

export default useRedirect;