import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';

const useStripe = ({ debug = false }) => {
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

  const clearFields = useCallback(() => {
    state.cardNumber.ref && state.cardNumber.ref.clear();
    state.cardExpiry.ref && state.cardExpiry.ref.clear();
    state.cardCvc.ref && state.cardCvc.ref.clear();
  }, [state.cardNumber.ref, state.cardExpiry.ref, state.cardCvc.ref]);

  const isComplete = useMemo(() => {
    return (
      state.cardNumber.complete &&
      state.cardExpiry.complete &&
      state.cardCvc.complete
    );
  }, [
    state.cardNumber.complete,
    state.cardExpiry.complete,
    state.cardCvc.complete
  ]);

  useEffect(() => {
    return () => {
      debug && console.log('useStripe cleanup...');
      isCancelled.current = true;
    };
  }, [debug]);

  useEffect(() => {
    debug && console.log(state);
  }, [state, debug]);

  return [stripeReady, stripeChange, isComplete, clearFields];
}

export default useStripe;