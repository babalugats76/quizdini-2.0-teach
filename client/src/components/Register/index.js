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
    const { registerUser } = this.props; // Get Redux action
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
    const { setSubmitting, setStatus } = actions;

    await registerUser({
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

    const { registration: { data, error } = {} } = this.props;
    const { message: successMessage = '' } = data || {};
    const { message: errorMessage = '' } = error || {};

    if (error) {
      await setStatus({
        content: errorMessage,
        header: 'Registration Failed',
        severity: 'ERROR'
      });
      return setSubmitting(false);
    }

    return setTimeout(() => {
      this.props.history.push('/login', {
        message: {
          content: successMessage,
          header: 'Welcome to Quizdini!',
          severity: 'OK'
        }
      });
    }, 300);
  }

  renderForm = ({ stateOptions, countryOptions }) => {
    return (
      <RegisterForm
        countryOptions={countryOptions.data}
        onRegister={(values, actions) =>
          this.handleRegister(values, actions)
        }
        stateOptions={stateOptions.data}
      />
    );
  };

  render() {
    const {
      stateOptions: { error: stateError, loading: stateLoading } = {},
      countryOptions: { error: countryError, loading: countryLoading } = {}
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

const mapStateToProps = ({ countryOptions, registration, stateOptions }) => ({
  countryOptions,
  registration,
  stateOptions
});

export default connect(mapStateToProps, actions)(Register);
