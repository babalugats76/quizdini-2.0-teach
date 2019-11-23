import React, { useEffect, useState, useReducer, useRef } from 'react';
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

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

const useRedux = deps => {
  const [data, setData] = useState();
  useEffect(() => { 
    setData(deps);
  }, [deps]);
  return data;
};

const Checkout = props => {
  const isCancelled = useRef(false);
 //const didMount = useRef(false);

  const initialState = {
    cardNumber: { ref: undefined, complete: false },
    cardExpiry: { ref: undefined, complete: false },
    cardCvc: { ref: undefined, complete: false }
  };

  const { creditPurchase, buyCredits, fetchAuth } = props;
  const { error } = creditPurchase;
  // const { message: successMessage = '' } = data || {};
  // const { message: errorMessage = '' } = error || {};

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'STRIPE_READY':
        return { ...state, [action.name]: { ref: action.ref } };
      case 'STRIPE_CHANGE':
        return {
          ...state,
          [action.name]: { ...state[action.name], complete: action.complete }
        };
      case 'CLEAR_DATA':
        return initialState;
      default:
        return state;
    }
  }, initialState);

  const safeDispatch = (...args) => !isCancelled.current && dispatch(...args);

  useEffect(() => {
    return () => {
      console.log('tearing down');
      isCancelled.current = true;
    };
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  /*useEffect(() => {
    if (!didMount.current) {
      console.log('creditPurchase - marking mounted...');
      didMount.current = true;
      return;
    }

    if (didMount.current) {
      console.log('creditPurchase - changed...');
      if (creditPurchase.loading) return;
      if (creditPurchase.error) console.log('Purchase failed...');
      else console.log('Purchase succeeded...');
    } else {
      console.log('creditPurchase - marking mounted...');
      didMount.current = true;
    }
  }, [creditPurchase]); */

  const data = useRedux(creditPurchase);
  console.log(data);

  const handleStripeReady = StripeElement => {
    safeDispatch({
      type: 'STRIPE_READY',
      name: StripeElement._componentName,
      ref: StripeElement
    });
  };

  const handleStripeChange = change => {
    safeDispatch({
      type: 'STRIPE_CHANGE',
      name: change.elementType,
      complete: change.complete
    });
  };

  /**
   * Determines whether all React Stripe Elements
   * have been completed by the user
   *
   * @returns {boolean} - Whether card input is complete
   */
  const isCardComplete = () => {
    const {
      cardNumber: { complete: cardComplete = false },
      cardExpiry: { complete: expiryComplete = false },
      cardCvc: { complete: cvcComplete = false }
    } = state;
    return cardComplete && expiryComplete && cvcComplete;
  };

  /**
   * Clears the Stripe element references
   */
  const clearStripeFields = () => {
    const {
      cardNumber: { ref: cardRef = undefined },
      cardExpiry: { ref: expiryRef = undefined },
      cardCvc: { ref: cvcRef = undefined }
    } = state;

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
  const handleCheckout = async (values, actions) => {
    const { buyCredits, fetchAuth } = props;
    const { tokenId, amount, credits, cardholderName } = values;
    const { setStatus, setSubmitting, clearStripeFields } = actions;

    return await buyCredits({ tokenId, amount, credits, cardholderName });

    /*const { creditPurchase: { data, error } = {} } = props;
    const { message: successMessage = '' } = data || {};
    const { message: errorMessage = '' } = error || {};

    if (error) {
      clearStripeFields();
      await setStatus({
        content: errorMessage,
        header: "Something's not quite right.",
        severity: 'ERROR'
      });
      return setSubmitting(false);
    }

    await fetchAuth();

    return setTimeout(() => {
      props.history.push('/dashboard', {
        from: 'CHECKOUT',
        message: {
          content: successMessage,
          header: 'Thank you for your purchase!',
          severity: 'OK'
        },
        skipAuth: true
      });
    }, 300);*/
  };

  const renderForm = () => (
    <StripeScriptLoader
      uniqueId="stripe-script"
      script={process.env.REACT_APP_STRIPE_SCRIPT}
      loader={<Loader />}
    >
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <Elements {...elementOptions}>
          <CheckoutForm
            clearStripeFields={clearStripeFields}
            isCardComplete={isCardComplete}
            buyCredits={buyCredits}
            fetchAuth={fetchAuth}
            onCheckout={(values, actions) => handleCheckout(values, actions)}
            onStripeChange={handleStripeChange}
            onStripeReady={handleStripeReady}
            error={error}
          />
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
