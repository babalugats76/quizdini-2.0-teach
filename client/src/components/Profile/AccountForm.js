import React from 'react';
import { withFormik } from 'formik';
import { Form, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import Button from '../UI/Button';
import InputText from '../UI/InputText';
import Dropdown from '../UI/Dropdown';
import Message from '../UI/Message';

/* Used to debug behind-the-scenes Formik state, etc. */
//import DisplayFormikState from '../UI/FormikHelper';

const titleOptions = [
  { key: 0, text: '', value: '' },
  { key: 1, text: 'Mr.', value: 'Mr.' },
  { key: 2, text: 'Mrs.', value: 'Mrs.' },
  { key: 3, text: 'Ms.', value: 'Ms.' },
  { key: 4, text: 'Prof.', value: 'Prof.' },
  { key: 5, text: 'Miss', value: 'Miss' },
  { key: 6, text: 'Dr.', value: 'Dr.' }
];

/* eslint-disable no-template-curly-in-string */
const transformUser = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required.')
    .default(''),
  lastName: Yup.string()
    .required('Last Name is required.')
    .default(''),
  city: Yup.string()
    .max(100, 'City is too long. ${max} characters are allowed.')
    .default(''),
  countryCode: Yup.string()
    .required('Country is required.')
    .default('')
});

/* eslint-disable no-template-curly-in-string */
const validateUser = Yup.object().shape({
  firstName: Yup.string().required('First Name is required.'),
  lastName: Yup.string().required('Last Name is required.'),
  city: Yup.string().max(
    100,
    'City is too long. ${max} characters are allowed.'
  ),
  countryCode: Yup.string().required('Country is required.')
});

const AccountForm = props => {
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
    countryOptions,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    setFieldValue,
    stateOptions,
    touched,
    values
  }) => {
    return (
      <Form id="account-form" onSubmit={handleSubmit}>
        <Form.Group>
          <Dropdown
            disabled={isSubmitting}
            error={touched.title && errors.title}
            label="Title"
            name="title"
            onBlur={handleBlur}
            options={titleOptions}
            selection
            setFieldValue={setFieldValue}
            tabIndex={1}
            upward={false}
            value={values.title}
            width={3}
          />
          <InputText
            disabled={isSubmitting}
            error={touched.firstName && errors.firstName}
            label="First Name"
            maxLength={40}
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder=""
            required
            tabIndex={2}
            type="text"
            width={5}
            value={values.firstName}
          />
          <InputText
            disabled={isSubmitting}
            error={touched.lastName && errors.lastName}
            label="Last Name"
            maxLength={60}
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder=""
            required
            tabIndex={3}
            type="text"
            width={8}
            value={values.lastName}
          />
        </Form.Group>
        <Form.Group>
          <InputText
            disabled={isSubmitting}
            error={touched.city && errors.city}
            label="City"
            maxLength={100}
            name="city"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder=""
            tabIndex={4}
            type="text"
            value={values.city}
            width={7}
          />
          <Dropdown
            disabled={isSubmitting}
            error={touched.countryCode && errors.countryCode}
            label="Country"
            name="countryCode"
            onBlur={handleBlur}
            options={countryOptions}
            required
            selection
            setFieldValue={setFieldValue}
            tabIndex={5}
            upward={false}
            value={values.countryCode}
            width={9}
          />
          {values.countryCode === 'US' && (
            <Dropdown
              disabled={isSubmitting}
              error={touched.stateCode && errors.stateCode}
              label="State"
              name="stateCode"
              onBlur={handleBlur}
              options={stateOptions}
              required={false}
              selection
              setFieldValue={setFieldValue}
              tabIndex={6}
              upward={false}
              value={values.stateCode}
              width={5}
            />
          )}
        </Form.Group>
        <Form.Group>
          <Button
            active
            disabled={isSubmitting}
            icon="user"
            labelPosition="left"
            loading={isSubmitting}
            positive={isValid && !status}
            size="large"
            tabIndex={7}
            title="Update"
            type="submit"
          >
            UPDATE
          </Button>
        </Form.Group>
      </Form>
    );
  };

  const { status, setStatus } = props;
  const form = renderForm(props);

  return (
    <Segment basic>
      {status && renderMessage({ ...status, setStatus })}
      {form}
      {/*<DisplayFormikState {...props} /> */}
    </Segment>
  );
};

const FormikAccountForm = withFormik({
  enableReinitialize: true,
  validateOnChange: false,
  validateOnBlur: true,
  mapPropsToValues: ({ user }) => {
    // 1. Cast and transform incoming data as appropriate
    const data = transformUser.cast(user || {});

    // 2. Map data to Formik's 'values'
    return {
      city: data.city,
      countryCode: data.countryCode,
      firstName: data.firstName,
      lastName: data.lastName,
      stateCode: data.stateCode, // OK is null (no transform necessary)
      title: data.title // OK if null (no transform necessary)
    };
  },
  mapPropsToStatus: () => {
    return null;
  },
  validationSchema: validateUser,
  handleSubmit: (values, { setSubmitting, setStatus, props }) => {
    const { onUpdateAccount } = props; // prop function to call
    // Call prop function to update account passing values and actions
    setStatus(null); // Clear form status
    onUpdateAccount(values, { setSubmitting, setStatus, props });
  },
  displayName: 'AccountForm'
})(AccountForm);

export default FormikAccountForm;
