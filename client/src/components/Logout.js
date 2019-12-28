import React, { useEffect } from 'react';
import * as actions from '../actions';
import { useActions } from '../hooks/';

export default props => {
  const logout = useActions(actions.logout);

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Logout!</div>;
};
