import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import StripeScriptLoader from 'react-stripe-script-loader';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Container } from 'semantic-ui-react';
import * as actions from '../../actions';
import { checkoutSelector, generateNotify } from '../../selectors/';
import useActions from '../../hooks/useActions';
import useRedirect from '../../hooks/useRedirect';
import InjectedCheckoutForm from './CheckoutForm';
import LogoHeader from '../UI/LogoHeader';
import Loader from '../UI/Loader';

const elementsOptions = {
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Lexend+Deca' }]
};

const Checkout = props => {
  // action (to perform)
  const buyCredits = useActions(actions.buyCredits);
  const buyCreditsReset = useActions(actions.buyCreditsReset);
  const fetchAuth = useActions(actions.fetchAuth);

  // data (to subscribe to)
  const checkout = useSelector(checkoutSelector);
  const notify = useSelector(generateNotify([checkoutSelector]));

  // what to do on mount/unmount
  useEffect(() => {
    buyCreditsReset();
    return () => buyCreditsReset();
  }, [buyCreditsReset]);

  // function to determine redirect
  const checkoutRedirect = checkout => {
    return checkout.data ? true : false;
  };

  // redirect hook, including metadata and dependencies
  useRedirect({
    history: props.history,
    ready: checkoutRedirect(checkout),
    deps: [checkout],
    fetchAuth: fetchAuth,
    to: '/dashboard',
    state: { message: { ...notify }, skipAuth: true },
    timeout: 3000,
    debug: true
  });

  // what to render
  return (
    <Container as="main" className="page small" fluid id="checkout">
      <LogoHeader>Purchase Credits</LogoHeader>
      <StripeScriptLoader
        uniqueId="stripe-script"
        script={process.env.REACT_APP_STRIPE_SCRIPT}
        loader={<Loader />}
      >
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
          <Elements {...elementsOptions}>
            <InjectedCheckoutForm
              notify={notify}
              onCheckout={buyCredits}
              onDismiss={buyCreditsReset}
            />
          </Elements>
        </StripeProvider>
      </StripeScriptLoader>
    </Container>
  );
};

export default Checkout;
