import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import * as actions from '../../actions/';
import * as selectors from '../../selectors/';
import { useActions, useRedirect } from '../../hooks/';
import LoginForm from './LoginForm';
import { Loader, LogoHeader } from '../UI/';

const Login = props => {
  // action (to perform)
  const loginUser = useActions(actions.loginUser);
  const loginReset = useActions(actions.loginReset);
  const fetchAuth = useActions(actions.fetchAuth);

  // data (to subscribe to)
  const login = useSelector(selectors.login);
  const notify = useSelector(
    selectors.notify({
      inputSelectors: selectors.login,
      successHeader: "Welcome back!",
      errorHeader: "Oops! We can't log you in!",
      errorSeverity: 'ERROR'
    })
  );

  // what to do on mount/unmount
  useEffect(() => {
    loginReset();
    return () => loginReset();
  }, [loginReset]);

  // function to determine redirect
  const loginRedirect = login => {
    return login.data ? true : false;
  };

  // redirect hook, including metadata and dependencies
  const [isRedirecting] = useRedirect({
    history: props.history,
    ready: loginRedirect(login),
    deps: [login],
    fetchAuth: fetchAuth,
    to: '/dashboard',
    state: { message: { ...notify }, skipAuth: true },
    timeout: 500,
    debug: true
  });

  // what to render
  return (
    (isRedirecting && <Loader />) || (
      <Container as="main" className="page small" fluid id="login">
        {/*message && this.renderMessage({ ...message }) */}
        <LogoHeader>Login to Quizdini</LogoHeader>
        <LoginForm notify={notify} onLogin={loginUser} onDismiss={loginReset} />
      </Container>
    )
  );
};

export default Login;
