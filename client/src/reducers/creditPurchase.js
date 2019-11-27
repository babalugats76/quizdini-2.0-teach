import * as TYPES from '../actions/types';

const initialState = {
  data: null,
  error: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.BUY_CREDITS_BEGIN:
      return {
        ...state,
        data: null,
        error: null,
        loading: true
      };
    case TYPES.BUY_CREDITS_SUCCESS:
      console.log("buy credits success");
      return {
        ...state,
        data: action.payload.data,
        error: null,
        loading: false
      };
    case TYPES.BUY_CREDITS_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload.error,
        loading: false
      };
    case TYPES.BUY_CREDITS_RESET:
      console.log('reset called...');
      return initialState;
    default:
      return state;
  }
}
