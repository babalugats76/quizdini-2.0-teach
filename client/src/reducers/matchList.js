import * as TYPES from '../actions/types';

const initialState = {
  games: null,
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.MATCHES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TYPES.MATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        games: action.payload.matches // Rename due to confusion with react-router's ominpresent 'match' prop
      };
    case TYPES.MATCHES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        games: null
      };
    default:
      return state;
  }
}
