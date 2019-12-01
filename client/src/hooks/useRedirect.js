import { useCallback, useMemo, useRef } from 'react';

export default function useRedirect({
  history = null,
  ready = null,
  deps = [],
  fetchAuth = null,
  to = '/dashboard',
  state = {},
  timeout = 300,
  debug = false
}) {
  const isRedirecting = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timeToRedirect = useMemo(() => ready, [ready, ...deps]);
  const redirect = useCallback(async () => {
    isRedirecting.current = true;
    if (fetchAuth) await fetchAuth();
    setTimeout(async function() {
      history.push(to, state);
    }, timeout);
  }, [history, fetchAuth, to, state, timeout]);

  debug && console.log('isRedirecting: %s', isRedirecting.current);
  debug && console.log('timeToRedirect: %s', timeToRedirect);

  if (!isRedirecting.current && timeToRedirect) redirect();
}
