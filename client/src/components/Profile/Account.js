import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Container, Divider, Segment } from 'semantic-ui-react';
import Loader from '../UI/Loader';
import AccountSummary from './AccountSummary';
import AccountForm from './AccountForm';

class Account extends Component {
  componentDidMount() {
    const { fetchStates, fetchCountries, fetchAccount } = this.props;
    fetchStates();
    fetchCountries();
    fetchAccount();
  }

  /**
   * Calls updateAccount Redux action to update "profile"
   * To be used from Formik's handleSubmit function
   *
   * Uses setStatus Formik function to communicate API response and success/error formatting
   * Calls setSubmitting(false) once processing is complete
   *
   * @param {*} values  Values from child Formik form
   * @param {*} actions FormikBag functions
   */
  async handleUpdateAccount(values, actions) {
    const { updateAccount } = this.props;
    const { setSubmitting, setStatus } = actions;
    const { city, countryCode, firstName, lastName, stateCode, title } = values;

    await updateAccount({
      city,
      countryCode,
      firstName,
      lastName,
      stateCode,
      title
    });

    const { account: { error } = {} } = this.props;
    const { message: errorMessage = '' } = error || {};

    if (error) {
      await setStatus({
        content: errorMessage,
        header: "Something's not quite right.",
        severity: 'ERROR'
      });
    }
    return await setSubmitting(false);
  }

  renderForm = ({ stateOptions, countryOptions, account }) => {
    return (
      <AccountForm
        countryOptions={countryOptions.data}
        stateOptions={stateOptions.data}
        user={account.user}
        onUpdateAccount={(values, actions) =>
          this.handleUpdateAccount(values, actions)
        }
      />
    );
  };

  render() {
    const {
      stateOptions: {
        error: stateError,
        loading: stateLoading,
        data: stateData
      } = {},
      countryOptions: {
        error: countryError,
        loading: countryLoading,
        data: countryData
      } = {},
      account: { error: accountError, loading: accountLoading, user } = {}
    } = this.props;

    if (stateError || countryError || (accountError && !user))
      return <div>Error!</div>;

    const showLoader =
      stateLoading ||
      !stateData ||
      countryLoading ||
      !countryData ||
      accountLoading ||
      !user;

    const form = this.renderForm(this.props);

    return (
      <Container className="medium">
        {(showLoader && <Loader />) || (
          <Segment id="account">
            <AccountSummary {...user} />
            <Divider />
            {form}
          </Segment>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ stateOptions, countryOptions, account }) => ({
  stateOptions,
  countryOptions,
  account
});

export default connect(mapStateToProps, actions)(Account);
