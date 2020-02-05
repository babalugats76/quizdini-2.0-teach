import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container, Divider, Form, Segment } from 'semantic-ui-react';
import { useAPI, useAuth, useMessage, useRedirect, useResult } from '../hooks/';
import {
  Button,
  ExternalLink,
  InputText,
  Loader,
  LogoHeader,
  Notify
} from './UI/';

export default props => {
  // handles show/dismiss of redirect messages
  const [message, dismissMessage] = useMessage(props);

  // direct API interactions (ephemeral)
  const { POST: loginUser } = useAPI({ url: '/auth/local' });

  // used to refresh redux store with initial auth
  const fetchAuth = useAuth();

  // used to redirect 
  const [isRedirecting, redirect] = useRedirect({
    history: props.history,
    to: '/',
    timeout: 1000
  });

  // upon successful logon
  const onSuccess = () => {
    fetchAuth(); // updates redux store
    redirect(); // go home
  };

  // what to render
  return (
    (isRedirecting && <Loader />) || (
      <Container as="main" className="page small" fluid id="login">
        {message && Notify({ ...message, onDismiss: () => dismissMessage() })}
        <LogoHeader>Login to Quizdini</LogoHeader>
        <LoginForm onLogin={loginUser} onSuccess={() => onSuccess()} />
      </Container>
    )
  );
};

const validateLogin = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  password: Yup.string().required('Password is required.')
});

const LoginForm = props => {
  const getNotify = useResult({
    failHeader: "Oops, we can't log you in!",
    successHeader: 'Welcome back!'
  });
  return (
    <Formik
      enableReinitialize={false}
      validateOnBlur={false}
      validateOnChange={true}
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={async (values, actions) => {
        const { onLogin, onSuccess } = props;
        const { resetForm, setStatus, setSubmitting } = actions;
        await resetForm();
        await setSubmitting(true);
        const results = await onLogin(values);
        const success = results.data || false;
        const notify = getNotify(results);
        if (success) return onSuccess();
        await setStatus(notify);
        await setSubmitting(false);
      }}
      validationSchema={validateLogin}
    >
      {props => {
        const {
          dirty,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          setStatus,
          status,
          touched,
          values
        } = props;

        return (
          <Segment padded>
            {status && Notify({ ...status, onDismiss: () => setStatus(null) })}
            <Segment basic textAlign="center">
              <ExternalLink
                href="/auth/google"
                id="google-login"
                target="_self"
              />
              <Divider content="OR" horizontal section />
              <Form id="login-form" onSubmit={handleSubmit}>
                <Form.Group>
                  <InputText
                    disabled={isSubmitting}
                    error={touched.username && errors.username}
                    id="username"
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Username"
                    tabIndex={1}
                    type="text"
                    value={values.username}
                  />
                </Form.Group>
                <Form.Group>
                  <InputText
                    disabled={isSubmitting}
                    error={touched.password && errors.password}
                    id="password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Password"
                    tabIndex={2}
                    type="password"
                    value={values.password}
                  />
                </Form.Group>
                <Form.Group>
                  <Button
                    active
                    disabled={isSubmitting || !isValid || !dirty}
                    icon="login"
                    id="login-btn"
                    labelPosition="left"
                    loading={isSubmitting}
                    positive={isValid && !!values.username && !!values.password}
                    size="large"
                    tabIndex={3}
                    title="Log in to Quizdini"
                    type="submit"
                  >
                    LOG IN
                  </Button>
                </Form.Group>
              </Form>
              <p>
                <Link
                  id="lost"
                  title="Get help with your credentials"
                  to="/lost"
                >
                  Forgot your username or password?
                </Link>
              </p>
            </Segment>
          </Segment>
        );
      }}
    </Formik>
  );
};
