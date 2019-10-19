import React from 'react';
import { withFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Divider, Form, Segment } from 'semantic-ui-react';
import InputText from '../UI/InputText';
import * as Yup from 'yup';
import Button from '../UI/Button';
import Message from '../UI/Message';
import ExternalLink from '../UI/ExternalLink';

//import DisplayFormikState from '../UI/FormikHelper';

const validateLogin = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  password: Yup.string().required('Password is required.')
});

const LoginForm = props => {
  const handleDismiss = (e, setStatus) => {
    e.preventDefault();
    setStatus(null);
  };

  const renderMessage = ({ color, content, header, setStatus }) => {
    return (
      <Message
        color={color}
        content={content}
        header={header}
        hidden={!content}
        onDismiss={(e, data) => handleDismiss(e, setStatus)}
      />
    );
  };

  const renderForm = ({
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    touched,
    values
  }) => {
    return (
      <Segment basic textAlign="left">
        <ExternalLink href="/auth/google" id="google-login" />
        <Divider content="OR" horizontal section />
        <Form id="login-form" onSubmit={handleSubmit}>
          <Form.Group>
            <InputText
              disabled={isSubmitting}
              error={touched.username && errors.username}
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Username"
              tabIndex={1}
              type="text"
              value={values.username}
              width={14}
            />
          </Form.Group>
          <Form.Group>
            <InputText
              disabled={isSubmitting}
              error={touched.password && errors.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Password"
              tabIndex={2}
              type="password"
              value={values.password}
              width={14}
            />
          </Form.Group>
          <Form.Group>
            <Button
              active
              disabled={isSubmitting}
              icon="login"
              loading={isSubmitting}
              positive={isValid && !!values.username && !!values.password}
              size="large"
              tabIndex={3}
              title="Log in to Quizdini"
              type="submit"
              labelPosition="left"
            >
              LOG IN
            </Button>
          </Form.Group>
        </Form>
        <Segment basic textAlign="center">
            <Link id="lost" title="Get help with your credentials" to="/lost">
              Forgot your username or password?
            </Link>
          </Segment>
      </Segment>
    );
  };

  const { status, setStatus } = props;
  const form = renderForm(props);
  return (
    <Segment padded>
      {status && renderMessage({ ...status, setStatus })}
      {form}
      {/*<DisplayFormikState {...props} /> */}
    </Segment>
  );
};

const FormikLoginForm = withFormik({
  enableReinitialize: false,
  validateOnBlur: false,
  validateOnChange: true,
  mapPropsToValues: () => ({
    username: '',
    password: ''
  }),
  mapPropsToStatus: () => {
    return null;
  },
  validationSchema: validateLogin,
  handleSubmit: async (
    values,
    { props, resetForm, setStatus, setSubmitting }
  ) => {
    const { onLogin } = props;
    setStatus(null); // Clear form status
    await onLogin(values, { props, resetForm, setStatus, setSubmitting });
  },
  displayName: 'LoginForm'
})(LoginForm);

export default FormikLoginForm;
