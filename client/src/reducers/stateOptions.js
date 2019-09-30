import * as TYPES from '../actions/types';

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.STATES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
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
      const { states } = action.payload;
      const stateOptions = states.reduce((acc, state) => {
        acc.push({
          key: state.stateCode,
          value: state.stateCode,
          text: state.stateName
        });
        return acc;
      }, []);
      return {
        ...state,
        loading: false,
        error: null,
        data: stateOptions
      };
    case TYPES.STATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: null
      };
    default:
      return state;
  }
}
