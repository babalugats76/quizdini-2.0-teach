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
    this.setState((state, props) => {
      return {
        message: null
      };
    });
  };

  renderMessage = ({ header, content, color }) => {
    return (
      <Message
        color={color}
        content={content}
        header={header}
        hidden={!content}
        onDismiss={e => this.handleDismiss(e)}
      />
    );
  };

  async handleLogin(values, actions) {
    const { loginUser, fetchAuth } = this.props; // Redux action
    const { username, password } = values; // Values from form
    const { resetForm, setStatus, setSubmitting } = actions; // Actions from form
    await resetForm();
    await loginUser(username, password); // Redux API call / will update login prop
    const { login: { error } = {} } = this.props; // Destructure error from login props

    if (error) {
      const { message: errorMessage = ''} = error;
      await setStatus({
        header: "Oops! We can't log you in!",
        content: errorMessage,
        color: 'red'
      });
      return setSubmitting(false);
    }

    await fetchAuth();
    return this.props.history.push({ pathname: '/dashboard', state: { from: 'LOGIN', skipAuth: true } });

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

export default connect(
  mapStateToProps,
  actions
)(Login);
