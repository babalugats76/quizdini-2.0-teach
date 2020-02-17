import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container, Divider, Form, Segment } from 'semantic-ui-react';
import { useAPI, useAuth, useMessage, useResult } from '../hooks/';
import {
  Button,
  ExternalLink,
  InputText,
  Loader,
  LogoHeader,
  Notify
} from './UI/';

//import DisplayFormikState from './UI/FormikHelper';

export default props => {
  // handles show/dismiss of redirect messages
  const [message, dismissMessage] = useMessage(props);
  const [isRedirecting, setRedirecting] = useState(false);

  // direct API interactions (ephemeral)
  const { POST: loginUser } = useAPI({ url: '/auth/local' });

  // used to refresh redux store with initial auth
  const fetchAuth = useAuth();

  // upon successful logon
  const onSuccess = () => {
    setRedirecting(true);
    setTimeout(() => fetchAuth(), 2000);
  };

  // when to show loader
  const showLoader = isRedirecting;

  // what to render
  return (
    (showLoader && <Loader />) || (
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
      validateOnMount={true}
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
          <>
            {status && Notify({ ...status, onDismiss: () => setStatus(null) })}
            <Segment padded>
              <ExternalLink
                href="/auth/google"
                id="google-login"
                target="_self"
              />
              <Divider content="OR" horizontal section />
              <Form id="login-form" onSubmit={handleSubmit}>
                <InputText
                  disabled={isSubmitting}
                  error={touched.username && errors.username}
                  id="username"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                  tabIndex={1}
                  type="text"
                  value={values.username}
                  width={10}
                />
                {values.username && !('username' in errors) && (
                  <InputText
                    disabled={isSubmitting}
                    error={touched.password && errors.password}
                    id="password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    tabIndex={2}
                    type="password"
                    value={values.password}
                    width={10}
                  />
                )}
                {isValid && touched.username && (
                  <Button
                    disabled={isSubmitting || !isValid || !dirty}
                    icon="login"
                    id="login-btn"
                    labelPosition="right"
                    loading={isSubmitting}
                    primary={isValid && !!values.username && !!values.password}
                    size="large"
                    tabIndex={3}
                    type="submit"
                  >
                    LOGIN
                  </Button>
                )}
                <p>
                  <Link id="lost" to="/lost">
                    Forgot your username or password?
                  </Link>
                </p>
              </Form>
              {/* <DisplayFormikState {...props} /> */}
            </Segment>
          </>
        );
      }}
    </Formik>
  );
};
