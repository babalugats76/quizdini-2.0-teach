import * as TYPES from '../actions/types';

const initialState = {
  message: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.PASSWORD_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TYPES.PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message
      };
    case TYPES.PASSWORD_FAILURE:
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
