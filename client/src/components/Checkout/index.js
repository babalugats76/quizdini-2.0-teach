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
  // Needed for async function
  handlePayment = this.handlePayment.bind(this);
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
    if (prevProps.location.key !== this.props.location.key) {
      this.props.checkoutReset();
    }
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
   * Calls processCard Redux action to finalize credit card transaction
   * To be used from Formik's handleSubmit function
   *
   * Uses setStatus Formik function to communicate API response and success/error formatting
   * Call setSubmitting (false) in case of error
   * Otherwise, redirects to /profile, sending message in state
   *
   * @param {*} values  Values from child Formik form
   * @param {*} actions FormikBag functions
   */
  async handlePayment(values, actions) {
    const { processCard, fetchAuth } = this.props; // Get Redux action
    const { tokenId, amount, credits, cardholderName } = values; // Get form values (for charge)
    const { setStatus, setSubmitting, clearStripeFields } = actions; // Get Formik helper functions, etc.
    await processCard({ tokenId, amount, credits, cardholderName }); // Call Redux action passing charge values
    const { payment, error } = this.props; // Get latest version of payment props (mapped from state)
    if (error) {

      // Clear form (hide sensitive info)
      clearStripeFields();

      await setStatus({
        header: 'Transaction Failed',
        content: error.message || '',
        color: 'red'
      });
      return setSubmitting(false);
    } else {
    
       // This is done here to show credit increase ASAP
      await fetchAuth();

      return setTimeout(() => {
        this.props.history.push('/dashboard', {
          from: 'CHECKOUT',
          message: {
            header: 'Payment Successful',
            content: payment.description || '',
            color: 'green'
          },
          skipAuth: true
        });
      }, 300);
    }
  }

  renderForm = () => (
    <StripeScriptLoader uniqueId="stripe-script" script={process.env.REACT_APP_STRIPE_SCRIPT} loader={<Loader/>}>
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <Elements {...elementOptions}>
          <CheckoutForm
            onStripeChange={this.handleStripeChange}
            onStripeReady={this.handleStripeReady}
            isCardComplete={this.isCardComplete}
            clearStripeFields={this.clearStripeFields}
            onPayment={(values, actions) => this.handlePayment(values, actions)}
          />
        </Elements>
      </StripeProvider>
    </StripeScriptLoader>
  );

  render() {
    const { loading } = this.props;
    const form = this.renderForm();
    return (
      !loading && (
        <Container as="main" className="page small" fluid id="checkout">
          <LogoHeader>Purchase Credits</LogoHeader>
          {form}
        </Container>
      )
    ); // loading is used to force form rerender on navigation
  }
}

Checkout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ checkout }) => ({ ...checkout });

export default connect(
  mapStateToProps,
  actions
)(Checkout);
