import * as TYPES from '../actions/types';

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.ACCOUNT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TYPES.ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data
      };
    case TYPES.ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
        //data: null (leave alone to allow for update errors, etc.)
      };
    default:
      return state;
  }
}
