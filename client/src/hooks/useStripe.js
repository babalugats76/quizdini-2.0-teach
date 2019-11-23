import { useEffect, useRef, useReducer } from 'react';

const useStripe = () => {
  const isCancelled = useRef(false);

  const initialState = {
    cardNumber: { ref: undefined, complete: false },
    cardExpiry: { ref: undefined, complete: false },
    cardCvc: { ref: undefined, complete: false }
  };

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

  const stripeReady = StripeElement => {
    safeDispatch({
      type: 'STRIPE_READY',
      name: StripeElement._componentName,
      ref: StripeElement
    });
  };

  const stripeChange = change => {
    safeDispatch({
      type: 'STRIPE_CHANGE',
      name: change.elementType,
      complete: change.complete
    });
  };

  const clearFields = () => {
    const {
      cardNumber: { ref: cardRef = undefined },
      cardExpiry: { ref: expiryRef = undefined },
      cardCvc: { ref: cvcRef = undefined }
    } = state;

    cardRef && cardRef.clear();
    expiryRef && expiryRef.clear();
    cvcRef && cvcRef.clear();
  };

  const isComplete = () => {
    const {
      cardNumber: { complete: cardComplete = false },
      cardExpiry: { complete: expiryComplete = false },
      cardCvc: { complete: cvcComplete = false }
    } = state;
    return cardComplete && expiryComplete && cvcComplete;
  };

  useEffect(() => {
    return () => {
      console.log('tearing down');
      isCancelled.current = true;
    };
  }, []);

  return [
    state,
    safeDispatch,
    stripeReady,
    clearFields,
    stripeChange,
    isComplete
  ];
};

export default useStripe;
