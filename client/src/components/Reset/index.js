import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container, Grid } from 'semantic-ui-react';
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
    const { fetchToken } = this.props;
    await fetchToken(secret);
    const { token } = this.props;
    const { error } = { ...token };

    if (error) {
      const { message } = error;
      return setTimeout(() => {
        this.props.history.push('/login', {
          message: {
            color: 'red',
            content: `${message}`,
            header: 'Reset Unsuccessful'
          }
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
    const { resetPassword } = this.props; // Get Redux action
    const { secret } = this.state; // Get "secret" token
    const { newPassword } = values; // Get form values (for reset)
    const { setSubmitting, setStatus } = actions; // Get Formik helper functions, etc.
    await resetPassword({ newPassword, secret }); // Call Redux action passing registration values
    console.log(this.props.password);
    const { password: { error, message } = {} } = this.props; // Get latest version of password props (mapped from state)
    if (error) {
      const {
        message: { errorMessage }
      } = error;
      await setStatus({
        color: 'red',
        content: errorMessage,
        header: 'Unable to Reset Password'
      });
      return setSubmitting(false);
    } else {
      // redirect
      return setTimeout(() => {
        this.props.history.push('/login', {
          message: {
            color: 'green',
            content: `${message}`,
            header: 'Password Reset Successful'
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
    const { token: { loading, error } = {} } = this.props;
    return (
      !error &&
      !loading && (
        <Grid
          id="reset-container"
          as={Container}
          centered
          columns={1}
          stackable
          text
        >
          <Grid.Row>
            <Grid.Column>{form}</Grid.Column>
          </Grid.Row>
        </Grid>
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

const mapStateToProps = ({ token, password }) => ({ token, password });

export default connect(
  mapStateToProps,
  actions
)(Reset);
