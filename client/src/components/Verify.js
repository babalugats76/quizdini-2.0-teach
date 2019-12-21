import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAPI, useRedirect, useResult } from '../hooks/';
import { Loader } from './UI/';

const Verify = props => {

  // Track verificaton attempt
  const [isComplete, setIsComplete] = useState(false);
  const { match: { params: { secret } = {} } = {} } = props;
  const { PUT: verifyAccount } = useAPI({
    url: '/api/account/verify'
  });

  const [getNotify] = useResult({ failHeader: 'Check yourself...' });

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

  // what to render
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
