import React from 'react';
import { withFormik } from 'formik';
import { Form, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import Button from '../UI/Button';
import InputText from '../UI/InputText';
import Message from '../UI/Message';

/* Used to debug behind-the-scenes Formik state, etc. */
//import DisplayFormikState from '../UI/FormikHelper';

/* eslint-disable no-template-curly-in-string */
const validatePassword = Yup.object().shape({
  oldPassword: Yup.string().required('Current Password is required.'),
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

const PasswordForm = props => {
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
      <Segment basic textAlign="center">
        <Form id="password-form" onSubmit={handleSubmit}>
          <Form.Group>
            <InputText
              disabled={isSubmitting}
              error={touched.oldPassword && errors.oldPassword}
              label="Current Password"
              name="oldPassword"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Your 'old' password"
              required
              tabIndex={1}
              type="password"
              value={values.oldPassword}
              width={16}
            />
          </Form.Group>
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
              tabIndex={2}
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
              tabIndex={3}
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
                touched.oldPassword &&
                touched.newPassword &&
                touched.confirmPassword
              }
              size="large"
              tabIndex={4}
              title="Update"
              type="submit"
            >
              UPDATE
            </Button>
          </Form.Group>
        </Form>
      </Segment>
    );
  };

  const { status, setStatus } = props;
  const form = renderForm(props);

  return (
    <Segment padded>
      {status && renderMessage({ ...status, setStatus })}
      {form}
    </Segment>
  );
};

const FormikPasswordForm = withFormik({
  enableReinitialize: false,
  validateOnChange: false,
  validateOnBlur: true,
  mapPropsToValues: () => ({
    confirmPassword: '',
    newPassword: '',
    oldPassword: ''
  }),
  mapPropsToStatus: () => {
    return null;
  },
  validationSchema: validatePassword,
  handleSubmit: (values, { resetForm, setSubmitting, setStatus, props }) => {
    const { onUpdatePassword } = props; // prop function to call
    // Call prop function to update account passing values and actions
    onUpdatePassword(values, {
      resetForm,
      setSubmitting,
      setStatus,
      props
    });
  },
  displayName: 'PasswordForm'
})(PasswordForm);

export default FormikPasswordForm;
