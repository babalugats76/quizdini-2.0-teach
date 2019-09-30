import * as TYPES from '../actions/types';

const initialState = {
  user: null,
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
        user: action.payload.user
      };
    case TYPES.ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
        //user: null (don't set to null to allow for update errors)
      };
    default:
      return state;
  }
}
