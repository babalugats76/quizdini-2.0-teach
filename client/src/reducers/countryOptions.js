import * as TYPES from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.COUNTRIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case TYPES.COUNTRIES_SUCCESS:
      /**
       *  Remap object array keys
       *
       *  Needed because dropdowns want information in common, generic format
       *
       *  countryId = key
       *  countryCode = value
       *  countryName = text
       **/
      const { countries } = action.payload;
      const countryOptions = countries.reduce((acc, country) => {
        acc.push({
          key: country.countryId,
          value: country.countryCode,
          text: country.countryName
        });
        return acc;
      }, []);

      return {
        ...state,
        loading: false,
        error: null,
        data: countryOptions
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
