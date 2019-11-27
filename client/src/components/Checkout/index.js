import React from 'react';
import StripeScriptLoader from 'react-stripe-script-loader';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Container } from 'semantic-ui-react';
import InjectedCheckoutForm from './CheckoutForm';
import LogoHeader from '../UI/LogoHeader';
import Loader from '../UI/Loader';

const elementsOptions = {
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Lexend+Deca' }]
};

const Checkout = props => (
  <Container as="main" className="page small" fluid id="checkout">
    <LogoHeader>Purchase Credits</LogoHeader>
    <StripeScriptLoader
      uniqueId="stripe-script"
      script={process.env.REACT_APP_STRIPE_SCRIPT}
      loader={<Loader />}
    >
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <Elements {...elementsOptions}>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    </StripeScriptLoader>
  </Container>
);

export default Checkout;
