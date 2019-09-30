import * as TYPES from '../actions/types';
  
  const initialState = {
    payments: null,
    loading: false,
    error: null
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case TYPES.PAYMENTS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
      case TYPES.PAYMENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          payments: action.payload.payments
        };
      case TYPES.PAYMENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          payments: null
        };
      default:
        return state;
    }
  }
  