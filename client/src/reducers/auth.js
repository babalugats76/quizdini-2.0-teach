import * as TYPES from '../actions/types';

const initialState = {
  accountType: null,
  credits: null,
  googlePicture: null,
  loggedIn: null,
  username: null,
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
        accountType: action.payload.accountType,
        credits: action.payload.credits,
        googlePicture: action.payload.googlePicture,
        loggedIn: action.payload.loggedIn,
        username: action.payload.username
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
