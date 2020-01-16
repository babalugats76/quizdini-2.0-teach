import * as TYPES from "../actions/types";

const initialState = {
  data: null, // payload from successful api call
  loaded: false, // whether reducer is initialized, successful or not
  loading: false, // whether api call is in progress
  error: null // payload from unsuccessful api call
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.ACCOUNT_BEGIN:
      return {
        ...state, // spread previous state
        loading: true, // api call in progress
        error: null // clear previous errors
      };
    case TYPES.ACCOUNT_SUCCESS:
      return {
        ...state, // spread previous state
        loaded: true, // set initialized
        loading: false, // api call complete
        error: null, // no errors
        data: action.payload.data // success data
      };
    case TYPES.ACCOUNT_FAILURE:
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
