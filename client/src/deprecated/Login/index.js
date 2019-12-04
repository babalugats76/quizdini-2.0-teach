import React from 'react';
import { Container } from 'semantic-ui-react';
import LoginForm from './LoginForm';
import { Loader, LogoHeader } from '../../components/UI';
import { useAPI, useRedirect } from '../../hooks';

const Login = props => {

  // direct API interactions (emphemeral)
  const [post] = useAPI({ url: '/auth/local' });

  // useRedirect
  const [isRedirecting, redirect] = useRedirect({
    history: props.history,
    refreshAuth: true,
    to: '/dashboard',
    state: { skipAuth: true },
    timeout: 1000,
    debug: true
  });

  console.log(isRedirecting);

  // what to render
  return (
    (isRedirecting && <Loader />) || (
      <Container as="main" className="page small" fluid id="login">
        {/*message && this.renderMessage({ ...message }) */}
        <LogoHeader>Login to Quizdini</LogoHeader>
        <LoginForm onLogin={post} onSuccess={notify => redirect(notify)} />
      </Container>
    )
  );
};

export default Login;
