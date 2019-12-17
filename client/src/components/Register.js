import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Formik } from 'formik';
import { Container, Form, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { fetchStates, fetchCountries } from '../actions/';
import { useActions, useAPI, useRedirect, useResult } from '../hooks/';
import {
  Button,
  Checkbox,
  Dropdown,
  InputText,
  Loader,
  LogoHeader,
  Notify
} from './UI/';

export default props => {
  // direct API interactions (ephemeral)
  const { POST: registerUser } = useAPI({ url: '/api/account' });

  // useRedirect
  const [isRedirecting, redirect] = useRedirect({
    history: props.history,
    to: '/login',
    timeout: 1000,
    debug: true
  });

  /**
   *  Remap object array keys
   *
   *  Needed because dropdowns want information in common, generic format
   *
   *  stateCode = key
   *  stateCode = value
   *  stateName = text
   **/
  const stateSelector = createSelector(
    state => state.states,
    states => {
      const stateOptions =
        states.data &&
        states.data.reduce((acc, state) => {
          acc.push({
            key: state.stateCode,
            value: state.stateCode,
            text: state.stateName
          });
          return acc;
        }, []);
      return { ...states, data: stateOptions };
    }
  );

  /**
   *  Remap object array keys
   *
   *  Needed because dropdowns want information in common, generic format
   *
   *  countryId = key
   *  countryCode = value
   *  countryName = text
   **/
  const countrySelector = createSelector(
    state => state.countries,
    countries => {
      const countryOptions =
        countries.data &&
        countries.data.reduce((acc, country) => {
          acc.push({
            key: country.countryId,
            value: country.countryCode,
            text: country.countryName
          });
          return acc;
        }, []);
      return { ...countries, data: countryOptions };
    }
  );

  const states = useSelector(stateSelector);
  const countries = useSelector(countrySelector);

  const getStates = useActions(fetchStates);
  const getCountries = useActions(fetchCountries);

  useEffect(() => {
    if (!states.data) getStates();
    if (!countries.data) getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container as="main" className="page medium" fluid id="register">
      {((!states.data || !countries.data || isRedirecting) && <Loader />) || (
        <>
          <LogoHeader>Sign Up for Quizdini</LogoHeader>
          <RegisterForm
            countryOptions={countries.data}
            onRegister={registerUser}
            onSuccess={notify => redirect(notify)}
            stateOptions={states.data}
          />
        </>
      )}
    </Container>
  );
};

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
  const [getNotify] = useResult({
    failHeader: 'Have we met before?',
    successHeader: 'Welcome to Quizdini!'
  });

  const { countryOptions, stateOptions } = props;

  return (
    <Formik
      enableReinitialize={false}
      validateOnBlur={false}
      validateOnChange={true}
      initialValues={{
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
      }}
      onSubmit={async (values, actions) => {
        const { onRegister, onSuccess } = props;
        const {
          city,
          countryCode,
          email,
          firstName,
          lastName,
          password,
          stateCode,
          title,
          username
        } = values;
        const { setStatus, setSubmitting } = actions;
        await setSubmitting(true);

        const results = await onRegister({
          city,
          countryCode,
          email,
          firstName,
          lastName,
          password,
          stateCode,
          title,
          username
        });
        const success = results.data || false;
        const notify = getNotify(results);
        await setStatus(notify);
        if (success) onSuccess(notify);
        await setSubmitting(false);
      }}
      validationSchema={validateNewUser}
    >
      {props => {
        const {
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue,
          setStatus,
          status,
          touched,
          values
        } = props;

        return (
          <Segment padded>
            {status && Notify({ ...status, onDismiss: () => setStatus(null) })}
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
                    <Link
                      target="_blank"
                      title="Terms and Conditions"
                      to="/terms"
                    >
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
                    <Link
                      target="_blank"
                      title="Cookie Policy"
                      to="/terms/cookies"
                    >
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
          </Segment>
        );
      }}
    </Formik>
  );
};
