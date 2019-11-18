import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container } from 'semantic-ui-react';
import PasswordForm from './PasswordForm';

class Password extends Component {
  /**
   * Calls updatePassword Redux action to update user's local credentials
   * To be used from Formik's handleSubmit function
   *
   * Uses setStatus Formik function to communicate API response and success/error formatting
   * Calls setSubmitting(false) once processing is complete
   *
   * @param {*} values  Values from child Formik form
   * @param {*} actions FormikBag functions
   */
  async handleUpdatePassword(values, actions) {
    const { updatePassword } = this.props;
    const { resetForm, setSubmitting, setStatus } = actions;

    await updatePassword(values);
    await resetForm();

    const { passwordChange: { data, error } = {} } = this.props;
    const { message: successMessage = '' } = data || {};
    const { message: errorMessage = '' } = error || {};

    if (error) {
      await setStatus({
        content: errorMessage,
        header: 'Check yourself...',
        severity: 'ERROR'
      });
    } else {
      await setStatus({
        content: successMessage,
        header: 'Success!',
        severity: 'OK'
      });
    }
    return await setSubmitting(false);
  }

  renderForm = () => {
    return (
      <PasswordForm
        onUpdatePassword={(values, actions) =>
          this.handleUpdatePassword(values, actions)
        }
      />
    );
  };

  render() {
    const form = this.renderForm(this.props);
    return (
      <Container className="small" fluid>
        {form}
      </Container>
    );
  }
}

const mapStateToProps = ({ passwordChange }) => ({ passwordChange });

export default connect(mapStateToProps, actions)(Password);
