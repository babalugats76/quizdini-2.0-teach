import * as TYPES from '../actions/types';

const initialState = {
  loggedIn: null,
  credits: null,
  loaded: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.AUTH_BEGIN:
      return {
        ...state,
        error: null
      };
    case TYPES.AUTH_SUCCESS:
      return {
        ...state,
        loaded: true,
        error: null,
        loggedIn: action.payload.loggedIn,
        credits: action.payload.credits,
        accountType: action.payload.accountType
      };
    case TYPES.AUTH_FAILURE:
      return {
        ...state,
        loaded: true,
        loggedIn: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
