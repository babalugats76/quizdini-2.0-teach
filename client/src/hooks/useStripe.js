import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

/**
 * Custom Hook to facilitate interactions with Stripe via react-stripe-elements.
 *
 * Refer to: https://github.com/stripe/react-stripe-elements
 *
 * @returns {array}  Utility functions which facilitate react-stripe-elements interactions
 *
 * To debug:
 * ```
 *   useEffect(() => {
 *     console.log(JSON.stringify(state));
 *   }, [state]);
 * ```
 */

export default function useStripe() {
  const isCancelled = useRef(false); // for tracking dismounting

  const initialState = {
    cardNumber: { ref: undefined, complete: false },
    cardExpiry: { ref: undefined, complete: false },
    cardCvc: { ref: undefined, complete: false }
  };

  const [state, setState] = useReducer((state, action) => {
    switch (action.type) {
      case "STRIPE_READY":
        return { ...state, [action.name]: { ref: action.ref } };
      case "STRIPE_CHANGE":
        return {
          ...state,
          [action.name]: { ...state[action.name], complete: action.complete }
        };
      case "CLEAR_DATA":
        return initialState;
      default:
        return state;
    }
  }, initialState);

  /***
   * Wraps `setState` to avoid no-ops.
   *
   * Attempts to `setState` on dismounted components will be short-circuited.
   * Relies upon `isCancelled` ref and side effect that maintains its value.
   */
  const dispatch = useCallback(
    (...args) => {
      !isCancelled.current && setState(...args);
    },
    [isCancelled, setState]
  );

  /***
   * Marks provided element ready (for interactions).
   * Dispatches appropriate action to update state.
   *
   * @param {ref} StripeElement  ref from react-stripe-elements
   */
  const stripeReady = StripeElement => {
    dispatch({
      type: "STRIPE_READY",
      name: StripeElement._componentName,
      ref: StripeElement
    });
  };

  /***
   * Updates completion status of provided element.
   * Dispatches appropriate action to update state.
   *
   * @param {object} change  change object from react-stripe-elements
   */
  const stripeChange = change => {
    dispatch({
      type: "STRIPE_CHANGE",
      name: change.elementType,
      complete: change.complete
    });
  };

  /***
   * Memoized function that clears all react-stripe-elements fields
   */
  const clearFields = useCallback(() => {
    state.cardNumber.ref && state.cardNumber.ref.clear();
    state.cardExpiry.ref && state.cardExpiry.ref.clear();
    state.cardCvc.ref && state.cardCvc.ref.clear();
  }, [state.cardNumber.ref, state.cardExpiry.ref, state.cardCvc.ref]);

  /***
   * Memoized calculation to determine status of react-stripe-element fields.
   *
   * @returns {boolean}  Whether all react-stripe-elements' fields are complete (or not)
   */
  const isComplete = useMemo(() => {
    return state.cardNumber.complete && state.cardExpiry.complete && state.cardCvc.complete;
  }, [state.cardNumber.complete, state.cardExpiry.complete, state.cardCvc.complete]);

  /***
   * Side effect whose cancel function updates current value of `isCancelled` ref.
   * Used to prevent no-ops from `setState` calls made after the component dismounts.
   * Runs once (on mount only); cancel function called on dismount.
   */
  useEffect(() => {
    return () => (isCancelled.current = true);
  }, []);

  return [
    stripeReady, // function used to mark each field ready (to interact with)
    stripeChange, // function used to keep track of field values
    isComplete, // whether all fields have been completed
    clearFields // clears all fields
  ];
}
