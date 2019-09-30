import * as TYPES from '../actions/types';

const initialState = {
  token: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.TOKEN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TYPES.TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token
      };
    case TYPES.TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        token: null
      };
    default:
      return state;
  }
}
