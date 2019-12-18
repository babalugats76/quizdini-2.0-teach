import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Container,
  Divider,
  Form,
  Image,
  Item,
  Label,
  Segment
} from 'semantic-ui-react';
import * as Yup from 'yup';
import { useActions, useAPI, useRedirect, useResult } from '../../hooks/';
import { fetchAccount, fetchCountries, fetchStates } from '../../actions/';
import {
  accountSelector,
  countrySelector,
  stateSelector
} from '../../selectors/';
import {
  Button,
  Checkbox,
  Dropdown,
  InputText,
  Loader,
  LogoHeader,
  Notify
} from '../UI/';
import avatar from '../../avatar.svg';

export default props => {
  // Redux actions
  const getAccount = useActions(fetchAccount);
  const getCountries = useActions(fetchCountries);
  const getStates = useActions(fetchStates);

  // Selectors (memoized with Reselect)
  const account = useSelector(accountSelector);
  const countries = useSelector(countrySelector);
  const states = useSelector(stateSelector);

  useEffect(() => {
    getAccount();
    if (!states.data) getStates();
    if (!countries.data) getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="medium">
      <Segment id="account">
        <AccountSummary {...(account.data || {})} />
        <Divider />
        <AccountForm
          countryOptions={countries.data}
          stateOptions={states.data}
          user={account.data || {}}
        />
      </Segment>
    </Container>
  );
};

const { format } = require('date-fns');

const AccountSummary = ({
  createDate,
  email,
  fullName,
  googleId,
  googlePicture,
  username
}) => {
  /* Use Google-provided avatar; otherwise, placeholder */
  const picture = googlePicture || avatar;

  return (
    <Segment basic id="account-summary">
      <Item.Group>
        <Item>
          <Image avatar size="small" spaced="right" src={picture} />
          <Item.Content verticalAlign="middle">
            <Item.Header className="fullname">{fullName}</Item.Header>
            {username ? (
              <Item.Description className="username">
                {username}
              </Item.Description>
            ) : null}
            <Item.Description className="email">{email}</Item.Description>
            <Item.Extra attached="top" className="since">
              Since&nbsp;
              {createDate && format(Date.parse(createDate), "MMM. ''yy")}
            </Item.Extra>
            <Label attached="top right">
              {googleId ? 'Google account' : 'Local account'}
            </Label>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

AccountSummary.propTypes = {
  createDate: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  googleId: PropTypes.string,
  googlePicture: PropTypes.string,
  username: PropTypes.string
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
const transformUser = Yup.object().shape({
  firstName: Yup.string()
    .transform(v => (v === null ? '' : v))
    .required('First Name is required.')
    .default(''),
  lastName: Yup.string()
    .transform(v => (v === null ? '' : v))
    .required('Last Name is required.')
    .default(''),
  city: Yup.string()
    .transform(v => (v === null ? '' : v))
    .max(100, 'City is too long. ${max} characters are allowed.')
    .default(''),
  countryCode: Yup.string()
    .transform(v => (v === null ? '' : v))
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
  const { countryOptions, stateOptions } = props;

  return (
    <Formik
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={true}
      initialValues={{
        city: props.user.city || '',
        countryCode: props.user.countryCode || '',
        firstName: props.user.firstName || '',
        lastName: props.user.lastName || '',
        stateCode: props.user.stateCode || null,
        title: props.user.title || null
      }}
      onSubmit={async (values, actions) => {
        const { setSubmitting } = actions;
        return setSubmitting(false);
      }}
      validationSchema={validateUser}
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
          <Segment basic>
            {status && Notify({ ...status, onDismiss: () => setStatus(null) })}
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
          </Segment>
        );
      }}
    </Formik>
  );
};
