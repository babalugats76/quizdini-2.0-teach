import * as TYPES from '../actions/types';

const initialState = {
  message: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message
      };
    case TYPES.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        message: null
      };
    default:
      return state;
  }
}
