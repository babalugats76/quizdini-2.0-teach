import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Container, Divider, Form, Image, Item, Label, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import * as actions from '../../actions/';
import { useActions, useReduxData, useResult } from '../../hooks/';
import {
  Button,
  Dropdown,
  ErrorMessage,
  InputText,
  Loader,
  Notify
} from '../UI/';
import avatar from '../../avatar.svg';

/***
 * To test:
 * import DisplayFormikState from '../UI/FormikHelper';
 * {<DisplayFormikState {...props} />}
 */

const { format } = require('date-fns');

export default props => {
  // direct redux interactions (persistent)
  const updateAccount = useActions(actions.updateAccount);

  const account = useSelector(state => state.account);
  const countries = useSelector(state => state.countries);
  const states = useSelector(state => state.states);

  // Redux data
  const fetchItems = [
    'fetchAccount', // fetch latest account data on mount
    ...(!countries.data ? ['fetchCountries'] : []), // conditionally fetch country data
    ...(!states.data ? ['fetchStates'] : []) // conditionally fetch state data
  ];

  // Fetch redux data
  const { errors, hasError } = useReduxData({ items: fetchItems, deps: [] });

  // Destructure and rename data
  const { data: countryOptions } = countries;
  const { data: stateOptions } = states;
  const { data: user } = account;

  // When to show loader
  const showLoader = !user || !countryOptions || !stateOptions;

  return (
    (hasError && <ErrorMessage details={errors} />) ||
    (showLoader && <Loader />) || (
      <Container className="medium" id="account" fluid>
        <Segment>
          <AccountSummary {...user} />
          <Divider />
          <AccountForm
            countryOptions={countryOptions}
            onUpdate={updateAccount}
            stateOptions={stateOptions}
            user={user}
          />
        </Segment>
      </Container>
    )
  );
};

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
  const getNotify = useResult();

  const { countryOptions, stateOptions } = props;

  return (
    <Formik
      enableReinitialize={false}
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
        const { onUpdate } = props;
        const {
          city,
          countryCode,
          firstName,
          lastName,
          stateCode,
          title
        } = values;
        const { setStatus, setSubmitting } = actions;
        await setSubmitting(true);
        const results = await onUpdate({
          city,
          countryCode,
          firstName,
          lastName,
          stateCode,
          title
        });
        const success = results.data || false;
        const notify = getNotify(results);
        !success && (await setStatus(notify));
        await setSubmitting(false);
      }}
      validationSchema={validateUser}
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
          <Segment basic>
            {status && <Notify {...status} onDismiss={() => setStatus(null)} />}
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
                  width={8}
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
                    width={6}
                  />
                )}
              </Form.Group>
              <Form.Group>
                <Button
                  active
                  disabled={isSubmitting || !dirty}
                  icon="user"
                  labelPosition="left"
                  loading={isSubmitting}
                  positive={isValid && dirty}
                  tabIndex={7}
                  type="submit"
                >
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Segment>
        );
      }}
    </Formik>
  );
};
