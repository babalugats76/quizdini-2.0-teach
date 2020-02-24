import React, { useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { Container, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { useAPI, useRedirect, useReduxData, useResult } from "../hooks/";
import {
  Button,
  Checkbox,
  Dropdown,
  ErrorMessage,
  FormStep,
  InputText,
  Loader,
  LogoHeader,
  Notify
} from "./UI/";
//import DisplayFormikState from './UI/FormikHelper';

export default props => {
  // direct API interactions (ephemeral)
  const { POST: registerUser } = useAPI({ url: "/api/account" });

  // useRedirect
  const [isRedirecting, redirect] = useRedirect({
    history: props.history,
    to: "/login",
    timeout: 1000
  });

  // Selectors
  const countries = useSelector(state => state.countries);
  const states = useSelector(state => state.states);

  // Redux data
  const fetchItems = [
    ...(!countries.data ? ["fetchCountries"] : []),
    ...(!states.data ? ["fetchStates"] : [])
  ];

  // Fetch redux data
  let { errors, hasError } = useReduxData({ items: fetchItems, deps: [] });

  // Destructure and rename data
  const { data: countryOptions } = countries;
  const { data: stateOptions } = states;

  // when to show loader
  const showLoader = !countryOptions || !stateOptions || isRedirecting;

  // Conditionally render error, loader, and content - in that order
  return (
    (hasError && <ErrorMessage details={errors} />) ||
    (showLoader && <Loader />) || (
      <Container className="page padded small" fluid id="register">
        <RegisterForm
          countryOptions={countryOptions}
          onRegister={registerUser}
          onSuccess={notify => redirect(notify)}
          stateOptions={stateOptions}
        />
      </Container>
    )
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
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Confirm Password is required."),
  recaptcha: Yup.boolean().oneOf([true], "Confirm that you are human."),
  terms: Yup.boolean().oneOf([true], "Please read and accept our Terms and Conditions"),
  cookie: Yup.boolean().oneOf([true], "Please read and accept our Cookie policy"),
  privacy: Yup.boolean().oneOf([true], "Please read and accept our Privacy policy")
});

/**
 * Sets focus to form field ref and scrolls into view of "scroll" ref.
 *
 * Reference:
 * `/https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView`
 * `https://caniuse.com/#feat=scrollintoview`
 *
 * @param {ref}     scrollRef   Reference to scroll element
 * @param {ref}     fieldRef    Reference to custom Semantic UI input field
 */
const scrollTo = (scrollRef, fieldRef) => {
  setTimeout(() => {
    const scroll = scrollRef?.current;
    const field = fieldRef?.current?.inputRef?.current;
    field && field.focus();
    scroll && scroll.scrollIntoView({ behavior: "auto" });
  }, 250);
};

const scrollToTop = () => {
  window.scrollTo({ x: 0, y: 0, behavior: "auto" });
};

const RegisterForm = props => {
  const scrollRef = useRef();
  const fieldRef = useRef();

  const initialState = { step: 1 };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "HOME":
        return {
          ...state,
          step: 1
        };
      case "NEXT":
        return {
          ...state,
          step: state.step + 1
        };
      case "PREVIOUS":
        return {
          ...state,
          step: Math.max(state.step - 1, 1)
        };
      default:
        return state;
    }
  }, initialState);

  const home = () => {
    dispatch({ type: "HOME" });
    scrollToTop();
  };

  const next = () => {
    dispatch({ type: "NEXT" });
    scrollTo(scrollRef, fieldRef);
  };

  const previous = () => {
    dispatch({ type: "PREVIOUS" });
    scrollTo(scrollRef, fieldRef);
  };

  const getNotify = useResult({
    failHeader: "Have we met before?",
    successHeader: "Welcome to Quizdini!"
  });

  const { step } = state;
  const { countryOptions, stateOptions } = props;

  return (
    <Formik
      enableReinitialize={false}
      validateOnBlur={false}
      validateOnChange={true}
      validateOnMount={true}
      initialValues={{
        city: "",
        confirmPassword: "",
        cookie: false,
        countryCode: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        privacy: false,
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
        home();
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
          <>
            <LogoHeader>Sign Up for Quizdini</LogoHeader>
            <span
              id="form-scroller"
              style={{
                display: "block",
                visibility: "hidden",
                position: "relative",
                top: "-3rem"
              }}
              ref={scrollRef}
            />
            {status && Notify({ ...status, onDismiss: () => setStatus(null) })}
            <Form id="register-form" onSubmit={handleSubmit}>
              <FormStep
                errors={errors}
                icon="user"
                onNext={next}
                show={step === 1}
                step={1}
                title="Profile"
              >
                <Form.Group>
                  <Dropdown
                    disabled={isSubmitting}
                    error={touched.title && errors.title}
                    label="Title"
                    name="title"
                    onBlur={handleBlur}
                    options={titleOptions}
                    ref={fieldRef}
                    selection
                    setFieldValue={setFieldValue}
                    tabIndex={1}
                    upward={false}
                    value={values.title}
                    width={6}
                  />
                  <InputText
                    disabled={isSubmitting}
                    error={touched.firstName && errors.firstName}
                    fluid
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
                    width={10}
                  />
                </Form.Group>
                <InputText
                  disabled={isSubmitting}
                  error={touched.lastName && errors.lastName}
                  fluid
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
                />
                <InputText
                  disabled={isSubmitting}
                  error={touched.city && errors.city}
                  fluid
                  label="City"
                  maxLength={100}
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder=""
                  tabIndex={4}
                  type="text"
                  value={values.city}
                />
                <Dropdown
                  disabled={isSubmitting}
                  error={touched.countryCode && errors.countryCode}
                  fluid
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
                />
                {values.countryCode === "US" && (
                  <Dropdown
                    disabled={isSubmitting}
                    error={touched.stateCode && errors.stateCode}
                    fluid
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
                  />
                )}
              </FormStep>
              <FormStep
                errors={errors}
                icon="user"
                onNext={next}
                onPrevious={previous}
                show={step === 2}
                step={2}
                title="Account"
              >
                <InputText
                  disabled={isSubmitting}
                  error={touched.email && errors.email}
                  label="Email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder=""
                  ref={fieldRef}
                  required
                  tabIndex={7}
                  type="email"
                  value={values.email}
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
                />
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
                />
              </FormStep>
              <FormStep
                errors={errors}
                icon="user"
                onPrevious={previous}
                show={step === 3}
                step={3}
                title="Terms"
              >
                <Checkbox
                  checked={values.terms ? true : false}
                  disabled={isSubmitting}
                  error={touched.terms && errors.terms}
                  name="terms"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  ref={fieldRef}
                  tabIndex={11}
                  value={values.terms ? 1 : 0}
                >
                  I agree to Quizdini's&nbsp;
                  <Link name="terms-link" target="_blank" to="/terms">
                    Terms of Use
                  </Link>
                  .
                </Checkbox>
                <Checkbox
                  checked={values.privacy ? true : false}
                  disabled={isSubmitting}
                  error={touched.privacy && errors.privacy}
                  name="privacy"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  tabIndex={12}
                  value={values.privacy ? 1 : 0}
                >
                  I agree to Quizdini's&nbsp;
                  <Link name="privacy-link" target="_blank" to="/terms/privacy">
                    Privacy Policy
                  </Link>
                  .
                </Checkbox>
                <Checkbox
                  checked={values.cookie ? true : false}
                  disabled={isSubmitting}
                  error={touched.cookie && errors.cookie}
                  name="cookie"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  tabIndex={13}
                  value={values.cookie ? 1 : 0}
                >
                  I agree to Quizdini's&nbsp;
                  <Link name="cookies-link" target="_blank" to="/terms/cookies">
                    Cookie Policy
                  </Link>
                  .
                </Checkbox>
                {isValid && (
                  <Button
                    disabled={isSubmitting || !isValid || !dirty}
                    icon="user-plus"
                    labelPosition="left"
                    loading={isSubmitting}
                    primary
                    //positive={isValid && !status && dirty}
                    size="large"
                    tabIndex={7}
                    type="submit"
                  >
                    SIGN UP
                  </Button>
                )}
              </FormStep>
            </Form>
            {/* <DisplayFormikState {...props} /> */}
          </>
        );
      }}
    </Formik>
  );
};
