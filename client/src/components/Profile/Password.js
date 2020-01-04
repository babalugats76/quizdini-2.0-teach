import React from 'react';
import { Formik } from 'formik';
import { Container, Form, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useAPI, useResult } from '../../hooks/';
import { Button, InputText, Notify } from '../UI/';

export default props => {
  // direct API interactions (ephemeral)
  const { PUT: changePassword } = useAPI({
    url: '/api/account/password'
  });

  return (
    <Container className="small">
      <PasswordForm onUpdate={changePassword} />
    </Container>
  );
};

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
  const [getNotify] = useResult({
    failHeader: 'Check yourself...'
  });

  return (
    <Formik
      enableReinitialize={false}
      validateOnBlur={false}
      validateOnChange={true}
      initialValues={{
        confirmPassword: '',
        newPassword: '',
        oldPassword: ''
      }}
      onSubmit={async (values, actions) => {
        const { onUpdate } = props;
        const { newPassword, oldPassword } = values;
        const { resetForm, setStatus, setSubmitting } = actions;
        await resetForm();
        await setSubmitting(true);
        const results = await onUpdate({ newPassword, oldPassword });
        const notify = getNotify(results);
        await setStatus(notify);
        await setSubmitting(false);
      }}
      validationSchema={validatePassword}
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
            <Segment basic>
              {status &&
                Notify({ ...status, onDismiss: () => setStatus(null) })}
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
                    disabled={isSubmitting || !isValid || !dirty}
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
          </Segment>
        );
      }}
    </Formik>
  );
};
