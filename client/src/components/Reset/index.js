import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container } from 'semantic-ui-react';
import LogoHeader from '../UI/LogoHeader';
import ResetForm from './ResetForm';

class Reset extends Component {
  // Needed for async function
  handleResetPassword = this.handleResetPassword.bind(this);

  constructor(props) {
    super(props);
    const { match: { params: { secret } = {} } = {} } = this.props;
    this.state = { secret };
  }

  async componentDidMount() {
    const { secret } = this.state;
    const { verifyToken } = this.props;
    
    await verifyToken(secret);
    
    const { tokenVerify: { error } = {} } = this.props;
    const { message: errorMessage = '' } = error || {};

    console.log(this.props.tokenVerify);

    if (error) {
      return setTimeout(() => {
        this.props.history.push('/login', {
          message: {
            content: errorMessage,
            header: 'Check yourself...',
            severity: 'ERROR'
          },
        });
      }, 300);
    }
  }

  /**
   * Calls resetPassword Redux action to reset user's password
   * To be used from Formik's handleSubmit function
   *
   * Uses setStatus Formik function to communicate API response and success/error formatting
   * Calls setSubmitting (false) in case of error
   * Otherwise, redirects to /login, sending message in state
   *
   * @param {*} values  Values from child Formik form
   * @param {*} actions FormikBag functions
   */
  async handleResetPassword(values, actions) {
    const { resetPassword } = this.props;
    const { secret } = this.state;
    const { newPassword } = values;
    const { setSubmitting, setStatus } = actions;
    
    await resetPassword({ newPassword, secret });
    
    const { passwordChange: { data, error } = {} } = this.props;
    const { message: successMessage = '' } = data || {};
    const { message: errorMessage = '' } = error || {};
    
    if (error) {
      await setStatus({
        content: errorMessage,
        header: 'Check yourself...',
        severity: 'ERROR'
      });
      return setSubmitting(false);
    } else {
      return setTimeout(() => {
        this.props.history.push('/login', {
          message: {
            content: successMessage,
            header: 'Success!',
            severity: 'OK'
          }
        });
      }, 300);
    }
  }

  renderForm = () => {
    return (
      <ResetForm
        onResetPassword={(values, actions) =>
          this.handleResetPassword(values, actions)
        }
      />
    );
  };

  render() {
    const form = this.renderForm(this.props);
    const { tokenVerify: { loading, error } = {} } = this.props;
    return (
      !error &&
      !loading && (
        <Container as="main" className="page small" fluid id="reset">
          <LogoHeader>Reset Password</LogoHeader>
          {form}
        </Container>
      )
    );
  }
}

Reset.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      secret: PropTypes.string.isRequired
    })
  })
};

const mapStateToProps = ({ tokenVerify, passwordChange }) => ({ tokenVerify, passwordChange });

export default connect(
  mapStateToProps,
  actions
)(Reset);
