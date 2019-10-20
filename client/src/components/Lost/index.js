import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container } from 'semantic-ui-react';
import LogoHeader from '../UI/LogoHeader';
import LostForm from './LostForm';

class Lost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * TO DO...
   *
   * @param {*} values  Values from child Formik form
   * @param {*} actions FormikBag functions
   */
  async handleLostSubmit(values, actions) {
    const { sendRecoveryEmail } = this.props; // Redux action
    const { resetForm, setFieldValue, setStatus, setSubmitting } = actions; // Actions from form
    const { email, recoveryType } = values; // Values from form
    await setStatus(null); // Clear form status
    await sendRecoveryEmail({ email, recoveryType });
    await resetForm();
    await setFieldValue('recoveryType', recoveryType);
    const { recovery: { error, message } = {} } = this.props; // Get latest version of recovery props (mapped from state)
    if (error) {
      await setStatus({
        color: 'red',
        content: error.message || '',
        header: 'Credential Recovery Error'
      });
    } else {
      await setStatus({
        color: 'green',
        content: message || '',
        header: 'Success!'
      });
    }
    return setSubmitting(false);
  }

  renderForm = () => {
    return (
      <LostForm
        onLostSubmit={(values, actions) =>
          this.handleLostSubmit(values, actions)
        }
      />
    );
  };

  render() {
    const form = this.renderForm();

    return (
      <Container as="main" className="page small" id="lost" fluid>
        <LogoHeader>Lost Credentials</LogoHeader>
        {form}
      </Container>
    );
  }
}

const mapStateToProps = ({ recovery }) => ({ recovery });

export default connect(
  mapStateToProps,
  actions
)(Lost);
