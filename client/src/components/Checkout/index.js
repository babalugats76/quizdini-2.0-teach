import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import StripeScriptLoader from 'react-stripe-script-loader';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Container } from 'semantic-ui-react';
import * as actions from '../../actions/';
import * as selectors from '../../selectors/';
import { useActions, useRedirect } from '../../hooks/';
import InjectedCheckoutForm from './CheckoutForm';
import { Loader, LogoHeader } from '../UI/';

/* TODO - disposition, depends upon font ulitmately chosen for checkout form */
/*const elementsOptions = {
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Lexend+Deca' }]
};*/
const elementsOptions = {};

const Checkout = props => {
  // action (to perform)
  const buyCredits = useActions(actions.buyCredits);
  const buyCreditsReset = useActions(actions.buyCreditsReset);
  const fetchAuth = useActions(actions.fetchAuth);

  // data (to subscribe to)
  const checkout = useSelector(selectors.checkout);
  const notify = useSelector(
    selectors.notify({ inputSelectors: [selectors.checkout] })
  );

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
    timeout: 500,
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
