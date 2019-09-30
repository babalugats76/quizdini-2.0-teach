import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import PasswordForm from "./PasswordForm";

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
    const { updatePassword } = this.props; // Redux action */
    const { resetForm, setSubmitting, setStatus } = actions; // Get Formik helper functions, etc.
    await setStatus(null); // Clear form status
    await updatePassword(values); // Call action to updatePassword (of user)
    await resetForm();
    const { password: { error, message } = {} } = this.props; // Get latest version of password props (mapped from state)
    if (error) {
      await setStatus({
        color: "red",
        content: error.message || "",
        header: "Unable to Change Password"
      });
    } else {
      await setStatus({
        color: "green",
        content: message || "",
        header: "Success!"
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
    return form;
  }
}

const mapStateToProps = ({ password }) => ({ password });

export default connect(
  mapStateToProps,
  actions
)(Password);
