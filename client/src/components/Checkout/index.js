import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeScriptLoader from 'react-stripe-script-loader';
import { Container } from 'semantic-ui-react';
import LogoHeader from '../UI/LogoHeader';
import Loader from '../UI/Loader';
import CheckoutForm from './CheckoutForm';

const elementOptions = {
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Lexend+Deca' }]
};

class Checkout extends Component {
  handleCheckout = this.handleCheckout.bind(this);
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: {},
      cardExpiry: {},
      cardCvc: {}
    };
  }

  // Reset state upon navigation
  componentDidUpdate(prevProps) {
    /* if (prevProps.location.key !== this.props.location.key) {
      this.props.checkoutReset();
    }*/
  }

  handleStripeChange = change => {
    this.setState((state, props) => {
      return {
        [change.elementType]: {
          ...state[change.elementType],
          complete: change.complete
        }
      };
    });
  };

  handleStripeReady = StripeElement => {
    this.setState((state, props) => {
      return {
        [StripeElement._componentName]: {
          ...state[StripeElement._componentName],
          ref: StripeElement
        }
      };
    });
  };

  /**
   * Determines whether all React Stripe Elements
   * have been completed by the user
   *
   * @returns {boolean} - Whether card input is complete
   */
  isCardComplete = () => {
    const {
      cardNumber: { complete: cardComplete = false },
      cardExpiry: { complete: expiryComplete = false },
      cardCvc: { complete: cvcComplete = false }
    } = this.state;
    return cardComplete && expiryComplete && cvcComplete;
  };

  clearStripeFields = () => {
    const {
      cardNumber: { ref: cardRef = undefined },
      cardExpiry: { ref: expiryRef = undefined },
      cardCvc: { ref: cvcRef = undefined }
    } = this.state;

    cardRef && cardRef.clear();
    expiryRef && expiryRef.clear();
    cvcRef && cvcRef.clear();
  };

  /**
   * Calls checkout Redux action to finalize credit card transaction
   * To be used from Formik's handleSubmit function
   *
   * Uses setStatus Formik function to communicate API response and success/error formatting
   * Call setSubmitting (false) in case of error
   * Otherwise, redirects to /profile, sending message in state
   *
   * @param {*} values  Values from child Formik form
   * @param {*} actions FormikBag functions
   */
  async handleCheckout(values, actions) {
    const { checkout, fetchAuth } = this.props;
    const { tokenId, amount, credits, cardholderName } = values;
    const { setStatus, setSubmitting, clearStripeFields } = actions;
    await checkout({ tokenId, amount, credits, cardholderName });
    const { checkout: { data, error } = {} } = this.props;
    const { message: successMessage = '' } = data || {};
    const { message: errorMessage = '' } = error || {};

    if (error) {
      clearStripeFields();
      await setStatus({
        content: errorMessage,
        header: 'Payment Failed',
        severity: 'ERROR'
      });
      return setSubmitting(false);
    }

    await fetchAuth();
    return setTimeout(() => {
      this.props.history.push('/dashboard', {
        from: 'CHECKOUT',
        message: {
          content: successMessage,
          header: 'Payment Successful!',
          severity: 'OK'
        },
        skipAuth: true
      });
    }, 300);
  }

  renderForm = () => (
    <StripeScriptLoader
      uniqueId="stripe-script"
      script={process.env.REACT_APP_STRIPE_SCRIPT}
      loader={<Loader />}
    >
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <Elements {...elementOptions}>
          <CheckoutForm
            onStripeChange={this.handleStripeChange}
            onStripeReady={this.handleStripeReady}
            isCardComplete={this.isCardComplete}
            clearStripeFields={this.clearStripeFields}
            onCheckout={(values, actions) =>
              this.handleCheckout(values, actions)
            }
          />
        </Elements>
      </StripeProvider>
    </StripeScriptLoader>
  );

  render() {
    const form = this.renderForm();
    return (
      <Container as="main" className="page small" fluid id="checkout">
        <LogoHeader>Purchase Credits</LogoHeader>
        {form}
      </Container>
    );
  }
}

Checkout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ checkout }) => ({ checkout });

export default connect(mapStateToProps, actions)(Checkout);
