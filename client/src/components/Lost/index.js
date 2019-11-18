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
    const { sendRecoveryEmail } = this.props;
    const { resetForm, setFieldValue, setStatus, setSubmitting } = actions;
    const { email, recoveryType } = values;

    await sendRecoveryEmail({ email, recoveryType });

    const { recovery: { data, error } = {} } = this.props;
    const { message: successMessage = '' } = data || {};
    const { message: errorMessage = '' } = error || {};

    await resetForm();
    await setFieldValue('recoveryType', recoveryType);

    if (error) {
      await setStatus({
        content: errorMessage,
        header: 'Credential Recovery Error',
        severity: 'ERROR'
      });
    } else {
      await setStatus({
        content: successMessage,
        header: 'Success!',
        severity: 'OK'
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

export default connect(mapStateToProps, actions)(Lost);
