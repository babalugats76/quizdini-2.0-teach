import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../UI/Button';
import InputText from '../UI/InputText';
import Dropdown from '../UI/Dropdown';
import Checkbox from '../UI/Checkbox';
import Message from '../UI/Message';

// eslint-disable-next-line
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
const validateNewUser = Yup.object().shape({
  firstName: Yup.string().required('First Name is required.'),
  lastName: Yup.string().required('Last Name is required.'),
  city: Yup.string().max(
    100,
    'City is too long. ${max} characters are allowed.'
  ),
  countryCode: Yup.string().required('Country is required.'),
  email: Yup.string()
    .email('Valid email required.')
    .required('Email is required.'),
  username: Yup.string()
    .min(6, 'Username is too short. ${min} characters are required.')
    .max(20, 'Username is too long. ${max} characters are allowed.')
    .required('Username is required.'),
  password: Yup.string() /* Add rules for password complexity */
    .required('Password is required.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/,
      'Password must be at least 8 characters and include: uppercase, lowercase, numeric, and special characters, e.g., @$!%*#?&'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
    .required('Confirm Password is required.'),
  terms: Yup.boolean().oneOf(
    [true],
    'Please read and accept our Terms and Conditions'
  )
});

const RegisterForm = props => {
  const handleDismiss = (e, setStatus) => {
    e.preventDefault();
    setStatus(null);
  };

  const renderMessage = ({ content, header, setStatus, severity }) => {
    return (
      <Message
        content={content}
        header={header}
        hidden={!content}
        onDismiss={(e, data) => handleDismiss(e, setStatus)}
        severity={severity}
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
    status,
    touched,
    values
  }) => {
    return (
      <Segment basic textAlign="left">
        <Form id="register-form" onSubmit={handleSubmit}>
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
              value={values.firstName}
              width={5}
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
              value={values.lastName}
              width={8}
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
              width={5}
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
              width={6}
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
            <InputText
              disabled={isSubmitting}
              error={touched.email && errors.email}
              label="Email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder=""
              required
              tabIndex={7}
              type="email"
              value={values.email}
              width={8}
            />
            <InputText
              disabled={isSubmitting}
              error={touched.username && errors.username}
              label="Username"
              maxLength={20}
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder=""
              required
              tabIndex={8}
              type="text"
              value={values.username}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <InputText
              disabled={isSubmitting}
              error={touched.password && errors.password}
              label="Password"
              maxLength={20}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder=""
              required
              tabIndex={9}
              type="password"
              value={values.password}
              width={8}
            />
            <InputText
              disabled={isSubmitting}
              error={touched.confirmPassword && errors.confirmPassword}
              label="Confirm Password"
              maxLength={20}
              name="confirmPassword"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder=""
              required
              tabIndex={10}
              type="password"
              value={values.confirmPassword}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Checkbox
              disabled={isSubmitting}
              error={touched.terms && errors.terms}
              name="terms"
              onBlur={handleBlur}
              onChange={handleChange}
              tabIndex={11}
              value={values.terms ? 1 : 0}
            >
              By signing up, I agree to Quizdini's&nbsp;
              <Link target="_blank" title="Terms and Conditions" to="/terms">
                Terms of Use
              </Link>
              ,&nbsp;
              <Link
                target="_blank"
                title="The Privacy Policy"
                to="/terms/privacy"
              >
                Privacy Policy
              </Link>
              ,&nbsp;and&nbsp;
              <Link target="_blank" title="Cookie Policy" to="/terms/cookies">
                Cookie Policy
              </Link>
              .
            </Checkbox>
          </Form.Group>
          <Form.Group>
            <Button
              active
              disabled={isSubmitting}
              icon="user-plus"
              labelPosition="left"
              loading={isSubmitting}
              positive={isValid && !status}
              size="large"
              tabIndex={7}
              title="Register"
              type="submit"
            >
              SIGN UP
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
      {/*<DisplayFormikState {...props} />*/}
    </Segment>
  );
};

const FormikRegisterForm = withFormik({
  enableReinitialize: false,
  validateOnBlur: false,
  validateOnChange: true,
  mapPropsToValues: () => ({
    city: '',
    confirmPassword: '',
    countryCode: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    stateCode: null,
    terms: false,
    title: null,
    username: ''
  }),
  mapPropsToStatus: () => {
    return null;
  },
  validationSchema: validateNewUser,
  handleSubmit: async (values, { setSubmitting, setStatus, props }) => {
    const { onRegister } = props; // prop function to call
    setStatus(null); // Clear form status
    await onRegister(values, { setSubmitting, setStatus }); // Call prop function to create charge passing values and actions
  },
  displayName: 'RegisterForm'
})(RegisterForm);

export default FormikRegisterForm;
