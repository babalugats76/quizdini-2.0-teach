import * as TYPES from "../actions/types";

const initialState = {
  data: null, // payload from successful api call
  loaded: false, // whether reducer is initialized, successful or not
  loading: false, // whether api call is in progress
  error: null // payload from unsuccessful api call
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.STATES_BEGIN:
      return {
        ...state, // spread previous state
        loading: true, // api call in progress
        error: null // clear previous errors
      };
    case TYPES.STATES_SUCCESS:
      /**
       *  Remap object array keys
       *
       *  Needed because dropdowns want information in common, generic format
       *
       *  stateCode = key
       *  stateCode = value
       *  stateName = text
       **/
      const stateOptions =
        action.payload.data &&
        action.payload.data.reduce((acc, state) => {
          acc.push({
            key: state.stateCode,
            value: state.stateCode,
            text: state.stateName
          });
          return acc;
        }, []);

      return {
        ...state, // spread previous state
        loaded: true, // set initialized
        loading: false, // api call complete
        error: null, // no errors
        data: stateOptions // tranformed "State" data
      };
    case TYPES.STATES_FAILURE:
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
