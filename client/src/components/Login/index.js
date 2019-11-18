import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container } from 'semantic-ui-react';
import LogoHeader from '../UI/LogoHeader';
import Message from '../UI/Message';
import LoginForm from './LoginForm';

class Login extends Component {
  // bind this way due to async/await arrow function bug in Babel
  handleLogin = this.handleLogin.bind(this);

  constructor(props) {
    super(props);
    const { location: { state: { message } = {} } = {}, history } = this.props;
    this.state = { message };
    history.replace({ pathname: '/login', state: {} });
  }

  handleDismiss = e => {
    e.preventDefault();
    this.setState({ message: null });
  };

  renderMessage = ({ content, header, severity }) => {
    return (
      <Message
        content={content}
        header={header}
        hidden={!content}
        onDismiss={e => this.handleDismiss(e)}
        severity={severity}
      />
    );
  };

  async handleLogin(values, actions) {
    const { loginUser, fetchAuth } = this.props; 
    const { username, password } = values;
    const { resetForm, setStatus, setSubmitting } = actions;

    await loginUser({username, password});

    const { login: { data, error } = {} } = this.props;
    const { message: successMessage = '' } = data || {};
    const { message: errorMessage = '' } = error || {};

    if (error) {
      await resetForm();
      await setStatus({
        content: errorMessage,
        header: "Oops! We can't log you in!",
        severity: 'ERROR'
      });
      return setSubmitting(false);
    }

    await fetchAuth();
    return this.props.history.push({
      pathname: '/dashboard',
      state: {
        message: {
          content: successMessage,
          header: 'Welcome to Quizdini!',
          severity: 'OK'
        },
        from: 'LOGIN',
        skipAuth: true
      }
    });
  }

  renderForm = () => {
    return (
      <LoginForm
        onLogin={(values, actions) => this.handleLogin(values, actions)}
      />
    );
  };

  render() {
    const { message } = this.state;
    const form = this.renderForm();

    return (
      <Container as="main" className="page small" fluid id="login">
        {message && this.renderMessage({ ...message })}
        <LogoHeader>Login to Quizdini</LogoHeader>
        {form}
      </Container>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = ({ login }) => ({ login });

export default connect(mapStateToProps, actions)(Login);
