import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAPI, useRedirect, useResult } from '../hooks/';
import { Loader } from './UI/';

const Verify = props => {
  // local state - isComplete - whether attempt to verify is complete
  const [isComplete, setIsComplete] = useState(false);

  // grab "secret" from url
  const { match: { params: { secret } = {} } = {} } = props;

  // direct API interactions (ephemeral)
  const { PUT: verifyAccount } = useAPI({
    url: '/api/account/verify'
  });

  // converts results to notifications
  const getNotify = useResult({ failHeader: 'Check yourself...' });

  // useRedirect
  const [isRedirecting, redirect] = useRedirect({
    history: props.history,
    refreshAuth: false,
    to: '/login',
    timeout: 500
  });

  // memoized verify function
  const verify = useCallback(async () => {
    const results = await verifyAccount({ secret });
    setIsComplete(true);
    const notify = getNotify(results);
    return redirect(notify);
  }, [verifyAccount, getNotify, redirect, secret, setIsComplete]);

  // verify token on mount only
  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When to show loader; for this component, all that is rendered
  return (!isComplete || isRedirecting) && <Loader />;
};

Verify.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      secret: PropTypes.string.isRequired
    })
  })
};

export default Verify;
