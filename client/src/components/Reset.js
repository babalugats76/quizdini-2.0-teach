import React, { useCallback, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Container, Form, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useAPI, useRedirect, useResult } from '../hooks/';
import { Button, InputText, Loader, LogoHeader, Notify } from './UI/';

export default props => {
  const [verified, setVerified] = useState(false);
  const { match: { params: { secret } = {} } = {} } = props;
  const { GET: verifyToken } = useAPI({ url: `/api/token/${secret}` });
  const getNotify = useResult({ failHeader: 'Check yourself...' });

  // useRedirect
  const [isRedirecting, redirect] = useRedirect({
    history: props.history,
    to: '/login',
    timeout: 1000
  });

  // memoized verify function
  const verify = useCallback(async () => {
    const results = await verifyToken();
    // If token verified
    if (results.data) return setVerified(true);
    // Otherwise, redirect with error
    const notify = getNotify(results);
    return redirect(notify);
  }, [verifyToken, getNotify, redirect]);

  // verify token on mount only
  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // direct API interactions (ephemeral)
  const { PUT: resetPassword } = useAPI({
    url: '/api/account/password-reset'
  });

  // what to render
  return (
    ((isRedirecting || !verified) && <Loader />) || (
      <Container as="section" className="page small" fluid id="reset">
        <LogoHeader>Reset Password</LogoHeader>
        <ResetForm
          onReset={resetPassword}
          onSuccess={notify => redirect(notify)}
          secret={secret}
        />
      </Container>
    )
  );
};

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
  const getNotify = useResult({ failHeader: 'Check yourself...' });

  return (
    <Formik
      enableReinitialize={false}
      validateOnBlur={false}
      validateOnChange={true}
      initialValues={{
        confirmPassword: '',
        newPassword: ''
      }}
      onSubmit={async (values, actions) => {
        const { onReset, onSuccess, secret } = props;
        const { newPassword } = values;
        const { resetForm, setStatus, setSubmitting } = actions;
        await resetForm();
        await setSubmitting(true);
        const results = await onReset({ newPassword, secret });
        const success = results.data || false;
        const notify = getNotify(results);
        if (success) return onSuccess(notify);
        await setStatus(notify);
        await setSubmitting(false);
      }}
      validationSchema={validateReset}
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
            <Form id="reset-form" onSubmit={handleSubmit}>
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
                  disabled={isSubmitting || !isValid || !dirty}
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
          </Segment>
        );
      }}
    </Formik>
  );
};
