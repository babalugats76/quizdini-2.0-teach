import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Divider, Form, Segment } from 'semantic-ui-react';
import { Button, ExternalLink, InputText, Notify } from '../UI/';

const validateLogin = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  password: Yup.string().required('Password is required.')
});

const LoginForm = props => {
  const { notify, onDismiss } = props;

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
        const { onLogin } = props;
        const { resetForm, setSubmitting } = actions;
        if (notify) await onDismiss();
        await resetForm();
        await onLogin(values);
        return setSubmitting(false);
      }}
      validationSchema={validateLogin}
    >
      {props => {
        const {
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          touched,
          values
        } = props;

        return (
          <Segment padded>
            {notify &&
              notify.severity === 'ERROR' &&
              Notify({ ...notify, onDismiss })}
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
                    disabled={isSubmitting}
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

export default LoginForm;
