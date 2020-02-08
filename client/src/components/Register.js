import React, { useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { Container, Form, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import {
  useAPI,
  useEventCallback,
  useRedirect,
  useReduxData,
  useResult,
  useScript
} from "../hooks/";
import { Button, Checkbox, Dropdown, InputText, Loader, LogoHeader, Notify } from "./UI/";
import DisplayFormikState from "./UI/FormikHelper";

export default props => {

  // direct API interactions (ephemeral)
  const { POST: registerUser } = useAPI({ url: "/api/account" });

  // useRedirect
  const [isRedirecting, redirect] = useRedirect({
    history: props.history,
    to: "/login",
    timeout: 1000
  });

  const [loaded, error] = useScript(process.env.REACT_APP_RECAPTCHA_SCRIPT, "recaptcha-v2");

  function onRecaptcha() {
    console.log("onRecaptcha fired....");
  }

  useEffect(() => {

    let widgitId;

    if (loaded) {
      
      console.log(window.grecaptcha);
      window.grecaptcha.ready(() => {
        widgitId = window.grecaptcha.render("recaptcha", {
          sitekey: process.env.REACT_APP_RECAPTCHA_SITE_KEY,
          callback: onRecaptcha
        });
        console.log(widgitId);
      });
    }
    return () => {
      if (loaded && window.grecaptcha) {
        console.log('unloading', widgitId);
        console.log(window.grecaptcha);
        window.grecaptcha.reset();
      }
    }
  }, [loaded]);

  // Selectors
  const countries = useSelector(state => state.countries);
  const states = useSelector(state => state.states);

  // Redux data
  const fetchItems = [
    ...(!countries.data ? ["fetchCountries"] : []),
    ...(!states.data ? ["fetchStates"] : [])
  ];

  // Fetch redux data
  const { errors } = useReduxData({ items: fetchItems, deps: [] });

  // Destructure and rename data
  const { data: countryOptions } = countries;
  const { data: stateOptions } = states;

  // when to show loader
  const showLoader = !countryOptions || !stateOptions || isRedirecting;

  // Conditionally render error, loader, and content - in that order
  return (
    <Container as="main" className="page medium" fluid id="register">
      {(errors && <pre>{JSON.stringify(errors, null, 4)}</pre>) || (showLoader && <Loader />) || (
        <>
          <LogoHeader>Sign Up for Quizdini</LogoHeader>
          <RegisterForm
            countryOptions={countryOptions}
            onRegister={registerUser}
            onSuccess={notify => redirect(notify)}
            stateOptions={stateOptions}
          />
        </>
      )}
      <form action="?" method="POST">
        <button type="button" id="recaptcha">Submit</button>
      </form>
    </Container>
  );
};

const titleOptions = [
  { key: 0, text: "", value: "" },
  { key: 1, text: "Mr.", value: "Mr." },
  { key: 2, text: "Mrs.", value: "Mrs." },
  { key: 3, text: "Ms.", value: "Ms." },
  { key: 4, text: "Prof.", value: "Prof." },
  { key: 5, text: "Miss", value: "Miss" },
  { key: 6, text: "Dr.", value: "Dr." }
];

/* eslint-disable no-template-curly-in-string */
const validateNewUser = Yup.object().shape({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  city: Yup.string().max(100, "City is too long. ${max} characters are allowed."),
  countryCode: Yup.string().required("Country is required."),
  email: Yup.string()
    .email("Valid email required.")
    .required("Email is required."),
  username: Yup.string()
    .min(6, "Username is too short. ${min} characters are required.")
    .max(20, "Username is too long. ${max} characters are allowed.")
    .required("Username is required."),
  password: Yup.string() /* Add rules for password complexity */
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/,
      "Password must be at least 8 characters and include: uppercase, lowercase, numeric, and special characters, e.g., @$!%*#?&"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Confirm Password is required."),
  terms: Yup.boolean().oneOf([true], "Please read and accept our Terms and Conditions")
});

const RegisterForm = props => {
  const getNotify = useResult({
    failHeader: "Have we met before?",
    successHeader: "Welcome to Quizdini!"
  });

  const { countryOptions, stateOptions } = props;

  return (
    <Formik
      enableReinitialize={false}
      validateOnBlur={false}
      validateOnChange={true}
      initialValues={{
        city: "",
        confirmPassword: "",
        countryCode: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        stateCode: null,
        terms: false,
        title: null,
        username: ""
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
        if (success) return onSuccess(notify);
        await setStatus(notify);
        await setSubmitting(false);
      }}
      validationSchema={validateNewUser}
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
                  {values.countryCode === "US" && (
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
                    checked={values.terms ? true : false}
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
                    <Link target="_blank" title="The Privacy Policy" to="/terms/privacy">
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
                    disabled={isSubmitting || !isValid || !dirty}
                    icon="user-plus"
                    labelPosition="left"
                    loading={isSubmitting}
                    positive={isValid && !status && dirty}
                    size="large"
                    tabIndex={7}
                    title="Register"
                    type="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Group>
              </Form>
              {<DisplayFormikState {...props} />}
            </Segment>
          </Segment>
        );
      }}
    </Formik>
  );
};
