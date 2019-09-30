import React from 'react';
import { withFormik } from 'formik';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import Button from '../UI/Button';
import InputText from '../UI/InputText';
import Message from '../UI/Message';

/* Used to debug behind-the-scenes Formik state, etc. */
import DisplayFormikState from '../UI/FormikHelper';

import logo from '../../logo.svg';

/* eslint-disable no-template-curly-in-string */
const validateReset = Yup.object().shape({
  newPassword: Yup.string()
    .required('New Password is required.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/,
      'New password must be at least 8 characters and include: uppercase, lowercase, numeric, and special characters, e.g., @$!%*#?&'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.')
    .required('Confirm Password is required.')
});

const ResetForm = props => {
  const handleDismiss = (e, setStatus) => {
    e.preventDefault();
    setStatus(null);
  };

  const renderMessage = ({ header, content, color, setStatus }) => {
    return (
      <Message
        hidden={!content}
        header={header}
        content={content}
        color={color}
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
      <Form id="reset" onSubmit={handleSubmit} size="large">
        <Form.Group></Form.Group>
        <Form.Group>
          <InputText
            disabled={isSubmitting}
            error={touched.newPassword && errors.newPassword}
            label="New Password"
            name="newPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="e.g. Qu1zd!n!"
            required
            tabIndex={1}
            type="password"
            value={values.newPassword}
            width={16}
          />
        </Form.Group>
        <Form.Group>
          <InputText
            disabled={isSubmitting}
            error={touched.confirmPassword && errors.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Repeat new password"
            required
            tabIndex={2}
            type="password"
            value={values.confirmPassword}
            width={16}
          />
        </Form.Group>
        <Form.Group>
          <Button
            active
            disabled={isSubmitting}
            icon="key"
            labelPosition="left"
            loading={isSubmitting}
            positive={
              !status &&
              isValid &&
              touched.newPassword &&
              touched.confirmPassword
            }
            size="large"
            tabIndex={3}
            title="Reset Password"
            type="submit"
          >
            RESET PASSWORD
          </Button>
        </Form.Group>
      </Form>
    );
  };

  const { status, setStatus } = props;
  const form = renderForm(props);

  return (
    <Grid centered columns={1}>
      <Grid.Column>
        <Header
          className="logo"
          content="Reset Password"
          image={logo}
          size="large"
          textAlign="center"
        />
        <Segment padded>
          {status && renderMessage({ ...status, setStatus })}
          {form}
          <DisplayFormikState {...props} />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const FormikResetForm = withFormik({
  enableReinitialize: false,
  validateOnBlur: false,
  validateOnChange: true,
  mapPropsToValues: () => ({
    confirmPassword: '',
    newPassword: ''
  }),
  mapPropsToStatus: () => {
    return null;
  },
  validationSchema: validateReset,
  handleSubmit: (values, { resetForm, setSubmitting, setStatus, props }) => {
    const { onResetPassword } = props; // prop function to call
    // Call prop function to update account passing values and actions
    onResetPassword(values, {
      resetForm,
      setSubmitting,
      setStatus,
      props
    });
  },
  displayName: 'ResetForm'
})(ResetForm);

export default FormikResetForm;
