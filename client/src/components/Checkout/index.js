// eslint-disable-next-line
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { buyCreditsReset, buyCredits } from '../../actions';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeScriptLoader from 'react-stripe-script-loader';
import { Container } from 'semantic-ui-react';
import LogoHeader from '../UI/LogoHeader';
import Loader from '../UI/Loader';
import CheckoutForm from './CheckoutForm';

import useStripe from '../../hooks/useStripe';
import useReset from '../../hooks/useReset';

const elementOptions = {
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Lexend+Deca' }]
};

const Checkout = props => {
  const [
    handleStripeReady,
    handleStripeChange,
    isCardComplete,
    clearStripeFields
  ] = useStripe({ debug: true });

  const [isReset] = useReset(buyCreditsReset);
  const creditPurchase = useSelector(state => state.creditPurchase);

  // eslint-disable-next-line
  //const { buyCredits, fetchAuth } = props;
  const { error } = creditPurchase;

  const handleCheckout = async (values, actions) => {
    const { tokenId, amount, credits, cardholderName } = values;
    console.log('before dispatch');
    console.log(creditPurchase);
    //await dispatch(buyCredits({ tokenId, amount, credits, cardholderName }));
    console.log('after dispatch');
    console.log(creditPurchase);
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
  /*const handleCheckout = async (values, actions) => {
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
    }, 300);
  };*/

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
            onCheckout={handleCheckout}
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

//const mapStateToProps = ({ creditPurchase }) => ({ creditPurchase });

export default Checkout;

//export default connect(mapStateToProps, actions)(Checkout);

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

//const data = useRedux(creditPurchase);
//console.log(data);

//const didMount = useRef(false);

/*const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};*/

/*const useRedux = deps => {
  const [reduxData, setReduxData] = useState({});
  useEffect(() => { 
    setReduxData(deps);
    const { loading, error, data } = deps || {};
    if (loading) return console.log("LOADING");
    if (error) return console.log("ERROR");
    if (!data) return console.log("IDLE");
    if (data) return console.log("SUCCESS");
  }, [deps]);
  return reduxData;
};*/
