import React from 'react';
import {
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
  injectStripe
} from 'react-stripe-elements';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Divider, Form, Grid, Header, Segment } from 'semantic-ui-react';
import Icon from '../UI/Icon';
import RadioGroup from '../UI/RadioGroup';
import InputText from '../UI/InputText';
import Button from '../UI/Button';
import Message from '../UI/Message';

/*import DisplayFormikState from '../UI/FormikHelper';*/

const elementOptions = disabled => {
  return {
    disabled,
    style: {
      base: {
        color: 'rgba(34, 34, 34, 0.87)',
        fontFamily: "'Lexend Deca', sans-serif",
        fontSmoothing: 'antialiased',
        fontSize: '17px',
        '::placeholder': {
          fontFamily: "'Lexend Deca', sans-serif",
          fontWeight: 'normal',
          color: '#e1e1e1'
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
 
  const handleAmountChange = e => {
    const { setFieldValue } = props;
    const { value } = e.target;
    setFieldValue('amount', value);
    setFieldValue('credits', amountToCredits(value));
  };

  const handleDismiss = (e, setStatus) => {
    e.preventDefault();
    setStatus(null);
  };

  const renderMessage = ({ header, content, color, setStatus }) => {
    return (
      <Message
        color={color}
        content={content}
        header={header}
        hidden={!content}
        onDismiss={(e, data) => handleDismiss(e, setStatus)}
      />
    );
  };

  const renderForm = ({
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isCardComplete,
    isSubmitting,
    isValid,
    onStripeChange,
    onStripeReady,
    touched,
    values
  }) => {
    return (
      <Form id="checkout-form" onSubmit={handleSubmit}>
        <Divider horizontal section>
          <Header as="h4">
            <Icon icon="thumbs-up" />
            Buy More, Get More!
          </Header>
        </Divider>
        <Form.Group id="credit-options" grouped={true}>
          <RadioGroup
            disabled={isSubmitting}
            name="amount"
            onBlur={handleBlur}
            onChange={handleAmountChange}
            options={getPaymentOptions(['5', '10', '15', '20'])}
            value={values.amount}
          />
        </Form.Group>
        <Divider horizontal section>
          <Header as="h4">
            <Icon icon="credit-card" />
            Payment Information
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
                positive={isValid && !status && isCardComplete()}
                size="large"
                type="submit"
              >
                PAY
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  };

  const { status, setStatus } = props;
  const form = renderForm(props);

  return (
    <Segment padded>
      {status && renderMessage({ ...status, setStatus })}
      {form}
    </Segment>
  );
};

const FormikCheckoutForm = withFormik({
  enableReinitialize: false,
  validateOnBlur: false,
  validateOnChange: true,
  mapPropsToValues: () => ({
    amount: '10',
    cardholderName: '',
    credits: amountToCredits('10'),
    postalCode: ''
  }),
  mapPropsToStatus: () => {
    return null;
  },
  validationSchema: validateCheckout,
  handleSubmit: async (values, { setSubmitting, setStatus, props }) => {
    const { stripe, onPayment, clearStripeFields } = props; // Obtain reference to stripe object
    const { credits, amount, cardholderName } = values;
    setStatus(null); // Clear form status

    const res = await stripe.createToken({
      name: values.cardholderName || '',
      address_zip: values.postalCode || ''
    }); // Validate card; obtain token

    if (!res.token || res.error) {
      // Clear form (hide sensitive info)
      clearStripeFields();

      // Handle validation errors
      setStatus({
        color: 'red',
        content: res.error.message,
        header: 'Validation Error'
      });
      setSubmitting(false);
      return;
    }

    console.log(res.token);

    // Call prop function to create charge passing values and actions
    await onPayment(
      { tokenId: res.token.id, amount, credits, cardholderName },
      { setSubmitting, setStatus, clearStripeFields }
    );
  },
  displayName: 'CheckoutForm'
})(CheckoutForm);

export default injectStripe(FormikCheckoutForm);
