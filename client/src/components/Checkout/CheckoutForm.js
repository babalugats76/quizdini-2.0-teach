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

import logo from '../../logo.svg';

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
          color: 'rgba(34, 34, 34, 0.3)'
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
  cardholderName: Yup.string().required('Cardholder Name is required.')
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
    onCardChange,
    touched,
    values
  }) => {
    return (
      <Form id="checkout" onSubmit={handleSubmit} size="large">
        <Segment basic>
          <Divider horizontal section>
            <Header as="h4">
              <Icon icon="thumbs-up" />
              Buy More, Get More!
            </Header>
          </Divider>
          <Form.Group grouped={true}>
            <RadioGroup
              disabled={isSubmitting}
              name="amount"
              onBlur={handleBlur}
              onChange={handleAmountChange}
              options={getPaymentOptions(['5', '10', '15', '20'])}
              value={values.amount}
            />
          </Form.Group>
        </Segment>
        <Segment basic>
          <Divider horizontal section>
            <Header as="h4">
              <Icon icon="credit-card" />
              Payment Information
            </Header>
          </Divider>
          <Grid>
            <Grid.Row>
              <Grid.Column>
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
                  width={16}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <label htmlFor="cardNumber" className="required">
                  Card Number
                </label>
                <CardNumberElement
                  id="cardNumber"
                  name="cardNumber"
                  onChange={onCardChange}
                  {...elementOptions(isSubmitting)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <label htmlFor="cardExpiry" className="required">
                  Expiration
                </label>
                <CardExpiryElement
                  id="cardExpiry"
                  name="cardExpiry"
                  onChange={onCardChange}
                  {...elementOptions(isSubmitting)}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <label htmlFor="cardCvc" className="required">
                  CVC
                </label>
                <CardCvcElement
                  id="cardCvc"
                  name="cardCvc"
                  onChange={onCardChange}
                  {...elementOptions(isSubmitting)}
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
        </Segment>
      </Form>
    );
  };

  const { status, setStatus } = props;
  const form = renderForm(props);

  return (
    <Grid centered columns={1} id="checkout-container">
      <Grid.Column>
        <Header
          className="logo"
          content="Purchase Credits"
          image={logo}
          size="large"
          textAlign="center"
        />
        <Segment>
          {status && renderMessage({ ...status, setStatus })}
          {form}
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const FormikCheckoutForm = withFormik({
  enableReinitialize: false,
  validateOnBlur: false,
  validateOnChange: true,
  mapPropsToValues: () => ({
    cardholderName: '',
    amount: '10',
    credits: amountToCredits('10')
  }),
  mapPropsToStatus: () => {
    return null;
  },
  validationSchema: validateCheckout,
  handleSubmit: async (values, { setSubmitting, setStatus, props }) => {
    const { stripe, onPayment } = props; // Obtain reference to stripe object
    const { credits, amount, cardholderName } = values;
    setStatus(null); // Clear form status

    const res = await stripe.createToken({
      name: values.cardholderName || ''
    }); // Validate card; obtain token

    if (!res.token || res.error) {
      // Handle validation errors
      setStatus({
        color: 'red',
        content: res.error.message,
        header: 'Validation Error'
      });
      setSubmitting(false);
      return;
    }

    // Call prop function to create charge passing values and actions
    await onPayment(
      { tokenId: res.token.id, amount, credits, cardholderName },
      { setSubmitting, setStatus }
    );
  },
  displayName: 'CheckoutForm'
})(CheckoutForm);

export default injectStripe(FormikCheckoutForm);
