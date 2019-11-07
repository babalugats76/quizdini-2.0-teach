import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container } from 'semantic-ui-react';
import Loader from '../UI/Loader';
import LogoHeader from '../UI/LogoHeader';
import RegisterForm from './RegisterForm';

class Register extends Component {
  // Needed for async function
  handleRegister = this.handleRegister.bind(this);

  componentDidMount() {
    const { fetchStates, fetchCountries } = this.props;
    fetchStates();
    fetchCountries();
  }

  /**
   * Calls createAccount Redux action to register new site user
   * To be used from Formik's handleSubmit function
   *
   * Uses setStatus Formik function to communicate API response and success/error formatting
   * Calls setSubmitting (false) in case of error
   * Otherwise, redirects to /login, sending message in state
   *
   * @param {*} values  Values from child Formik form
   * @param {*} actions FormikBag functions
   */
  async handleRegister(values, actions) {
    const { createAccount } = this.props; // Get Redux action
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
    } = values; // Get form values (for registration)

    const { setSubmitting, setStatus } = actions; // Get Formik helper functions, etc.

    await createAccount({
      city,
      countryCode,
      email,
      firstName,
      lastName,
      password,
      stateCode,
      title,
      username
    }); // Call Redux action passing registration values

    const { register: { user, error } = {} } = this.props; // get latest version of props (mapped from state)

    if (error) {
      // If error in processing
      await setStatus({
        color: 'red',
        content: error.message || '',
        header: 'Registration Error'
      });
      return setSubmitting(false);
    } else {
      return setTimeout(() => {
        const { email } = { ...user };
        this.props.history.push('/login', {
          message: {
            color: 'green',
            content: `Check your email, ${email}, for a link to validate your email`,
            header: 'Registration Successful'
          }
        });
      }, 300);
    }
  }

  renderForm = ({ stateOptions, countryOptions }) => {
    return (
      <RegisterForm
        countryOptions={countryOptions.data}
        handleRegister={(values, actions) =>
          this.handleRegister(values, actions)
        }
        stateOptions={stateOptions.data}
      />
    );
  };

  render() {
    const {
      stateOptions: {
        error: stateError,
        loading: stateLoading
      } = {},
      countryOptions: {
        error: countryError,
        loading: countryLoading
      } = {}
    } = this.props;

    if (stateError || countryError) return <div>Error!</div>;
    
    const showLoader = stateLoading || countryLoading;
    const form = this.renderForm(this.props);

    return (
      <Container as="main" className="page medium" fluid id="register">
        {(showLoader && <Loader />) || (
          <>
            <LogoHeader>Sign Up for Quizdini</LogoHeader>
            {form}
          </>
        )}
      </Container>
    );
  }
}

Register.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = ({ countryOptions, register, stateOptions }) => ({
  countryOptions,
  register,
  stateOptions
});

export default connect(
  mapStateToProps,
  actions
)(Register);
