import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import StripeScriptLoader from 'react-stripe-script-loader';
import {
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
  Elements,
  injectStripe,
  StripeProvider
} from 'react-stripe-elements';
import {
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react';
import { useAPI, useNotify, useRedirect, useStripe } from '../hooks/';
import {
  Button,
  Icon,
  InputText,
  Loader,
  LogoHeader,
  Notify,
  RadioGroup
} from './UI/';

/* TODO - disposition, depends upon font ulitmately chosen for checkout form */
/*const elementsOptions = {
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Lexend+Deca' }]
};*/
const elementsOptions = {};

export default props => {
  // direct API interactions (emphemeral)
  const [buyCredits] = useAPI({ url: '/api/payment' });

  // useRedirect
  const [isRedirecting, redirect] = useRedirect({
    history: props.history,
    refreshAuth: true,
    to: '/dashboard',
    state: { skipAuth: true },
    timeout: 1000,
    debug: true
  });

  // what to render
  return (
    (isRedirecting && <Loader />) || (
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
                onCheckout={buyCredits}
                onSuccess={notify => redirect(notify)}
              />
            </Elements>
          </StripeProvider>
        </StripeScriptLoader>
      </Container>
    )
  );
};

const elementOptions = disabled => {
  return {
    disabled,
    style: {
      base: {
        color: 'rgba(10, 10, 10, 0.40)',
        fontFamily: 'Verdana, Geneva, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '17px',
        '::placeholder': {
          fontFamily: 'Verdana, Geneva, sans-serif',
          fontWeight: 'normal',
          color: '#e1e1e1'
        },
        ':focus': {
          backgroundColor: 'rgba(255,250,205,.03)',
          color: 'rgba(10, 10, 10, 0.87)'
        },
        ':disabled': {
          color: 'rgba(0,0,0,.05)'
        }
      },
      invalid: {
        color: '#e0b4b4',
        iconColor: '#e0b4b4'
      }
    }
  };
};

const amountToCredits = (amount, scaleFactor = 33) =>
  Math.floor(parseInt(amount) * Math.pow(2, parseInt(amount) / scaleFactor));

const getPaymentOptions = increments => {
  return increments.reduce((acc, increment) => {
    const credits = amountToCredits(increment);
    acc.push({
      key: increment,
      label: `$${increment} for ${credits} credits`,
      value: increment // Store value in pennies
    });
    return acc;
  }, []);
};

const validateCheckout = Yup.object().shape({
  cardholderName: Yup.string().required('Cardholder Name is required.'),
  postalCode: Yup.string().required('Postal / Zip is required.')
});

const CheckoutForm = props => {
  const [
    onStripeReady,
    onStripeChange,
    isCardComplete,
    clearStripeFields
  ] = useStripe({ debug: false });

  const [getNotify] = useNotify({
    successHeader: 'Thank you for your purchase!'
  });
  const handleAmountChange = (e, { setFieldValue }) => {
    const { value } = e.target;
    setFieldValue('amount', value);
    setFieldValue('credits', amountToCredits(value));
  };

  return (
    <Formik
      enableReinitialize={false}
      validateOnBlur={false}
      validateOnChange={true}
      initialValues={{
        amount: '10',
        cardholderName: '',
        credits: amountToCredits('10'),
        postalCode: ''
      }}
      onSubmit={async (values, actions) => {
        const { onCheckout, onSuccess, stripe } = props;
        const {
          credits,
          amount,
          cardholderName = '',
          postalCode = ''
        } = values;
        const { setStatus, setSubmitting } = actions;

        // Clear sensitive fields and notification
        await setStatus(null);
        await setSubmitting(true);

        // Validate card; obtain token
        const res = await stripe.createToken({
          name: cardholderName,
          address_zip: postalCode
        });

        if (!res.token || res.error) {

          clearStripeFields();

          // If token-related validation errors
          setStatus({
            content: res.error.message,
            header: "Something's not quite right.",
            severity: 'ERROR'
          });
          return setSubmitting(false);
        }

        // Process transactions using token
        const results = await onCheckout({
          tokenId: res.token.id,
          amount,
          credits,
          cardholderName
        });
        const success = results.data || false;
        const notify = getNotify(results);
        await setStatus(notify);
        if (success) onSuccess(notify);
        if (!success) clearStripeFields();
        await setSubmitting(false);
      }}
      validationSchema={validateCheckout}
    >
      {props => {
        const {
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue,
          setStatus,
          status,
          touched,
          values
        } = props;

        return (
          <Segment padded>
            {status && Notify({ ...status, onDismiss: () => setStatus(null) })}
            <Form id="checkout-form" onSubmit={handleSubmit}>
              <Divider horizontal section>
                <Header as="h4">
                  <Icon name="thumbs-up" />
                  <Header.Content>Buy More, Get More!</Header.Content>
                </Header>
              </Divider>
              <Form.Group id="credit-options" grouped={true}>
                <RadioGroup
                  disabled={isSubmitting}
                  name="amount"
                  onBlur={handleBlur}
                  onChange={(e, data) =>
                    handleAmountChange(e, { setFieldValue })
                  }
                  options={getPaymentOptions(['5', '10', '15', '20'])}
                  value={values.amount}
                />
              </Form.Group>
              <Divider horizontal section>
                <Header as="h4">
                  <Icon name="credit-card" />
                  <Header.Content>Payment Information</Header.Content>
                </Header>
              </Divider>
              <Grid id="credit-card" padded>
                <Grid.Row>
                  <Grid.Column stretched>
                    <label htmlFor="cardholderName" className="required">
                      Name on Card
                    </label>
                    <InputText
                      disabled={isSubmitting}
                      error={touched.cardholderName && errors.cardholderName}
                      name="cardholderName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Bob Lee Swagger"
                      required={true}
                      type="text"
                      value={values.cardholderName}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <label htmlFor="cardNumber" className="required">
                      Card Number
                    </label>
                    <CardNumberElement
                      id="cardNumber"
                      onChange={onStripeChange}
                      onReady={onStripeReady}
                      {...elementOptions(isSubmitting)}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={9}>
                    <label htmlFor="cardExpiry" className="required">
                      Expiration
                    </label>
                    <CardExpiryElement
                      id="cardExpiry"
                      onChange={onStripeChange}
                      onReady={onStripeReady}
                      {...elementOptions(isSubmitting)}
                    />
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <label htmlFor="cardCvc" className="required">
                      CVC
                    </label>
                    <CardCvcElement
                      id="cardCvc"
                      onChange={onStripeChange}
                      onReady={onStripeReady}
                      {...elementOptions(isSubmitting)}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row width={16}>
                  <Grid.Column>
                    <label htmlFor="cardPostal" className="required">
                      Postal / Zip
                    </label>
                    <InputText
                      disabled={isSubmitting}
                      error={touched.postalCode && errors.postalCode}
                      name="postalCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="90210"
                      required={true}
                      type="text"
                      value={values.postalCode}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="center" width={16}>
                    <Button
                      active
                      disabled={isSubmitting}
                      icon="dollar-sign"
                      labelPosition="left"
                      loading={isSubmitting}
                      positive={isValid && !status && isCardComplete}
                      size="large"
                      type="submit"
                    >
                      PAY
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Segment>
        );
      }}
    </Formik>
  );
};

const InjectedCheckoutForm = injectStripe(CheckoutForm);
