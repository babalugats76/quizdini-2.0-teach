import * as TYPES from "../actions/types";

const initialState = {
  payment: null,
  message: null,
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.CHECKOUT_RESET_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        payment: null,
        message: null
      };
    case TYPES.CHECKOUT_RESET_END:
      return {
        ...state,
        loading: false
      };
    case TYPES.CHARGE_BEGIN:
      return {
        ...state,
        error: null,
        payment: null,
        message: null
      };
    case TYPES.CHARGE_SUCCESS:
      return {
        ...state,
        error: null,
        payment: action.payload.payment,
        message: action.payload.message
      };
    case TYPES.CHARGE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        payment: null,
        message: null
      };
    default:
      return state;
  }
}
