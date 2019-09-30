import * as TYPES from '../actions/types';

const initialState = {
  message: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.RECOVERY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TYPES.RECOVERY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message
      };
    case TYPES.RECOVERY_FAILURE:
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
