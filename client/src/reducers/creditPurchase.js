import * as TYPES from "../actions/types";

const initialState = {
  data: null,
  error: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.BUY_CREDITS_BEGIN:
      console.log(action.type);
      return {
        ...state,
        data: null,
        error: null,
        loading: true
      };
    case TYPES.BUY_CREDITS_SUCCESS:
      console.log(action.payload.data);
      return {
        ...state,
        data: action.payload.data,
        error: null,
        loading: false,
      };
    case TYPES.BUY_CREDITS_FAILURE:
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