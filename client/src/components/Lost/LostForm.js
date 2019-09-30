import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Divider, Form, Grid, Header, Segment } from 'semantic-ui-react';
import Icon from '../UI/Icon';
import InputText from '../UI/InputText';
import RadioGroup from '../UI/RadioGroup';
import Button from '../UI/Button';
import Message from '../UI/Message';
import DisplayFormikState from '../UI/FormikHelper';

import logo from '../../logo.svg';

const validateLost = Yup.object().shape({
  email: Yup.string()
    .email('Valid email required.')
    .required('Email is required.')
});

const recoveryTypes = [
  {
    key: '0',
    label: 'recoverying my username',
    value: 'username'
  },
  {
    key: '1',
    label: 'resetting my password',
    value: 'password'
  }
];

const LostForm = props => {
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

  const handleRecoveryTypeChange = e => {
    const { setFieldValue } = props;
    const { value } = e.target;
    setFieldValue('recoveryType', value);
  };

  const renderForm = ({
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    isValid,
    touched,
    values,
    handleSubmit
  }) => {
    return (
      <Segment basic textAlign="left">
        <Form id="lost" onSubmit={handleSubmit} size="large">
          <Form.Group>
            <InputText
              disabled={isSubmitting}
              error={touched.email && errors.email}
              label="Email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder=""
              required
              tabIndex={1}
              type="text"
              value={values.email}
              width={16}
            />
          </Form.Group>
          <Divider horizontal section>
            <Header as="h4">
              <Icon icon="key" />
              Recovery Options
            </Header>
          </Divider>
          <Form.Group grouped={true}>
            <strong>I need help...</strong>
            <RadioGroup
              disabled={isSubmitting}
              name="recoveryType"
              onBlur={handleBlur}
              onChange={handleRecoveryTypeChange}
              options={recoveryTypes}
              tabIndex={2}
              value={values.recoveryType}
            />
          </Form.Group>
          <Form.Group>
            <Button
              active
              disabled={isSubmitting}
              icon="mail"
              positive={isValid && !!values.email && !!values.recoveryType}
              size="large"
              tabIndex={3}
              title="Send Email"
              type="submit"
              labelPosition="left"
            >
              SEND EMAIL
            </Button>
          </Form.Group>
        </Form>
      </Segment>
    );
  };
  const { status, setStatus } = props;
  const form = renderForm(props);
  return (
    <Grid centered columns={1}>
      <Grid.Column>
        <Header
          className="logo"
          content="Lost Credentials"
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

const FormikLostForm = withFormik({
  enableReinitialize: false,
  validateOnBlur: false,
  validateOnChange: true,
  mapPropsToValues: () => ({
    email: '',
    recoveryType: 'username'
  }),
  mapPropsToStatus: () => {
    return null;
  },
  validationSchema: validateLost,
  handleSubmit: async (
    values,
    { resetForm, setFieldValue, setStatus, setSubmitting, props }
  ) => {
    const { onLostSubmit } = props;
    setStatus(null); // Clear form status
    await onLostSubmit(values, {
      resetForm,
      setFieldValue,
      setStatus,
      setSubmitting
    });
  },
  displayName: 'LostForm'
})(LostForm);

export default FormikLostForm;
