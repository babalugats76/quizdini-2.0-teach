import * as TYPES from '../actions/types';

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.COUNTRIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TYPES.COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data
      };
    case TYPES.COUNTRIES_FAILURE:
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
