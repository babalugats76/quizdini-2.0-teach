import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

const elementOptions = {
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Lexend+Deca' }]
};

class Checkout extends Component {
  // Needed for async function
  handlePayment = this.handlePayment.bind(this);
  constructor(props) {
    super(props);
    this.state = {}; // Values added dynamically by downstream form
  }

  // Reset state upon navigation
  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.props.checkoutReset();
    }
  }

  handleCardChange = change => {
    this.setState((state, props) => {
      return {
        [change.elementType]: change.complete
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
    const { cardNumber = false, cardExpiry = false, cardCvc = false } =
      this.state || {};
    return cardNumber && cardExpiry && cardCvc;
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
    const { processCard } = this.props; // Get Redux action
    const { tokenId, amount, credits, cardholderName } = values; // Get form values (for charge)
    const { setStatus, setSubmitting } = actions; // Get Formik helper functions, etc.
    await processCard({ tokenId, amount, credits, cardholderName }); // Call Redux action passing charge values
    const { payment, error } = this.props; // Get latest version of payment props (mapped from state)
    if (error) {
      // If error in processing
      await setStatus({
        header: 'Transaction Failed',
        content: error.message || '',
        color: 'red'
      });
      return setSubmitting(false);
    } else {
      return setTimeout(() => {
        this.props.history.push('/dashboard', {
          message: {
            header: 'Payment Successful',
            content: payment.description || '',
            color: 'green'
          }
        });
      }, 300);
    }
  }

  renderForm = () => (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
      <Elements {...elementOptions}>
        <CheckoutForm
          onCardChange={this.handleCardChange}
          isCardComplete={this.isCardComplete}
          onPayment={(values, actions) => this.handlePayment(values, actions)}
        />
      </Elements>
    </StripeProvider>
  );

  render() {
    const { loading } = this.props;
    const form = this.renderForm();
    return !loading && form; // loading is used to force form rerender on navigation
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
