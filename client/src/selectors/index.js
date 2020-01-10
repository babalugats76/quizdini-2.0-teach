import { createSelector } from "reselect";
/**
 *  Remap object array keys
 *
 *  Needed because dropdowns want information in common, generic format
 *
 *  stateCode = key
 *  stateCode = value
 *  stateName = text
 **/
export const stateSelector = createSelector(
  state => state.states,
  states => {
    const stateOptions =
      states.data &&
      states.data.reduce((acc, state) => {
        acc.push({
          key: state.stateCode,
          value: state.stateCode,
          text: state.stateName
        });
        return acc;
      }, []);
    return { ...states, data: stateOptions };
  }
);

/**
 *  Remap object array keys
 *
 *  Needed because dropdowns want information in common, generic format
 *
 *  countryId = key
 *  countryCode = value
 *  countryName = text
 **/
export const countrySelector = createSelector(
  state => state.countries,
  countries => {
    const countryOptions =
      countries.data &&
      countries.data.reduce((acc, country) => {
        acc.push({
          key: country.countryId,
          value: country.countryCode,
          text: country.countryName
        });
        return acc;
      }, []);
    return { ...countries, data: countryOptions };
  }
);

export const accountSelector = createSelector(
  state => state.account,
  account => account
);

export const authSelector = createSelector(
  state => state.auth,
  auth => {
    const { googleId, id = null } = auth.data || {};
    return id
      ? {
          ...auth.data,
          accountType: googleId ? "google" : "local",
          loggedIn: true
        }
      : {
          accountType: null,
          credits: null,
          googlePicture: null,
          error: null,
          loggedIn: false,
          username: null
        };
  }
);
