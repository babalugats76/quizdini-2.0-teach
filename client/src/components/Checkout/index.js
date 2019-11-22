import React, { useEffect, useReducer, useRef } from 'react';
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

const Checkout = props => {
  const isCancelled = useRef(false);
  const [stripeComponents, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'STRIPE_COMPONENT_READY':
          return {...state, [action.name]: { ref: action.ref } };
        default:
          return state;
      }
    },
    { cardNumber: {}, cardExpiry: {}, cardCvc: {} }
  );

  const safeDispatch = (...args) => !isCancelled.current && dispatch(...args);

  useEffect(() => {
    return () => {
      console.log('tearing down');
      isCancelled.current = true;
    };
  }, []);

  useEffect(() => {
    console.log(stripeComponents);
  }, [stripeComponents]);

  const handleStripeReady = StripeElement => {
    console.log('handleStripeReady called...');
    safeDispatch({
      type: 'STRIPE_COMPONENT_READY',
      name: StripeElement._componentName,
      ref: StripeElement
    });
  };

  const renderForm = () => (
    <StripeScriptLoader
      uniqueId="stripe-script"
      script={process.env.REACT_APP_STRIPE_SCRIPT}
      loader={<Loader />}
    >
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <Elements {...elementOptions}>
          <CheckoutForm onStripeReady={handleStripeReady} />
        </Elements>
      </StripeProvider>
    </StripeScriptLoader>
  );

  const form = renderForm();
  return (
    <Container as="main" className="page small" fluid id="checkout">
      <LogoHeader>Purchase Credits</LogoHeader>
      {form}
    </Container>
  );
};

Checkout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ creditPurchase }) => ({ creditPurchase });

export default connect(mapStateToProps, actions)(Checkout);
