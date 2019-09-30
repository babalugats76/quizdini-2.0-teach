import * as TYPES from "../actions/types";

const initialState = {
  game: null,
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.MATCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TYPES.MATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        game: action.payload.match // Rename due to confusion with react-router's ominpresent 'match' prop
      };
    case TYPES.MATCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        game: null
      };
    default:
      return state;
  }
}
