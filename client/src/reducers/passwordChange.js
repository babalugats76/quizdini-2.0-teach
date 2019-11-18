import * as TYPES from '../actions/types';

const initialState = {
  data: null,
  error: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.PASSWORD_CHANGE_BEGIN:
      return {
        ...state,
        data: null,
        error: null,
        loading: true
      };
    case TYPES.PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: null,
        loading: false
      };
    case TYPES.PASSWORD_CHANGE_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
}
