import * as TYPES from "../actions/types";

// data for unauthorized user
const UNAUTHORIZED = {
  accountType: null, // no account type
  credits: null, // unknown credits
  googlePicture: null, // unknown Google attributes
  error: null, // no errors
  loggedIn: false, // not logged in
  username: null // unknown username
};

const initialState = {
  data: UNAUTHORIZED, // default auth object (initially unauthorized)
  loaded: false, // whether reducer is initialized, successful or not
  loading: false, // whether api call is in progress
  error: null // payload from unsuccessful api call
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.AUTH_BEGIN:
      return {
        ...state, // spread previous state
        loading: true, // api call in progress
        error: null // clear previous errors
      };
    case TYPES.AUTH_SUCCESS:
      /***
       * Destructure values needed to derive authorized, account type, etc.
       *
       * CAUTION: empty string is returned if not authorized
       */

      const { googleId, id = null } = action.payload.data || {};

      /***
       * Determine "auth" object
       * Presence of `id` signifies that user is logged; otherwise, unauthorized
       * Presence of `googleId` signifies Google OAuth account; otherwise, local
       */
      const auth = id
        ? {
            ...action.payload.data,
            accountType: googleId ? "google" : "local",
            loggedIn: true
          }
        : UNAUTHORIZED;

      return {
        ...state, // spread previous state
        loaded: true, // set initialized
        loading: false, // api call complete
        error: null, // no errors
        data: auth // derived "auth" data
      };
    case TYPES.AUTH_FAILURE:
      return {
        ...state, // spread previous state
        loaded: true, // set initialized
        loading: false, // api call complete
        error: action.payload.error // error data
      };
    default:
      return state; // initialState or if non-matching action
  }
}
