import * as TYPES from '../actions/types';

const initialState = {
  user: null,
  message: null,
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.REGISTER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
        message: action.payload.message
      };
    case TYPES.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: null,
        message: null
      };
    default:
      return state;
  }
}
