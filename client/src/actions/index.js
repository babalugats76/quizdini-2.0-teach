import axios from "axios";
import * as TYPES from "./types";

/**
 * ACCOUNT SECTION
 * Actions used to obtain and perform CRUD operations on current user's account info, etc.
 */
export const accountBegin = () => async dispatch => {
  dispatch({ type: TYPES.ACCOUNT_BEGIN });
};

export const accountSuccess = data => async dispatch => {
  dispatch({ type: TYPES.ACCOUNT_SUCCESS, payload: { data } });
};

export const accountFailure = error => async dispatch => {
  dispatch({ type: TYPES.ACCOUNT_FAILURE, payload: { error } });
};

export const fetchAccount = () => async dispatch => {
  try {
    dispatch(accountBegin());
    const res = await axios.get("/api/account");
    dispatch(accountSuccess(res.data));
    return { data: res.data };
  } catch (err) {
    const { data: error } = err.response;
    dispatch(accountFailure(error));
    return { error };
  }
};

export const updateAccount = data => async dispatch => {
  try {
    const res = await axios.put("/api/account", data);
    dispatch(accountSuccess(res.data));
    return { data: res.data };
  } catch (err) {
    const { data: error } = err.response;
    dispatch(accountFailure(error));
    return { error };
  }
};

/**
 * AUTH SECTION
 * Actions used to determine the current user
 */

export const authBegin = () => async dispatch => {
  dispatch({ type: TYPES.AUTH_BEGIN });
};

export const authSuccess = data => async dispatch => {
  dispatch({
    type: TYPES.AUTH_SUCCESS,
    payload: { data }
  });
};

export const authFailure = error => async dispatch => {
  dispatch({ type: TYPES.AUTH_FAILURE, payload: { error } });
};

export const fetchAuth = () => async dispatch => {
  try {
    console.log("fetching auth");
    dispatch(authBegin());
    const res = await axios.get("/api/current_user");
    dispatch(authSuccess(res.data));
    return { data: res.data };
  } catch (err) {
    const { data: error } = err.response;
    dispatch(authFailure(error));
    return { error };
  }
};

/**
 * COUNTRIES SECTION
 * Actions used to obtain country info
 */

export const countriesBegin = () => async dispatch => {
  dispatch({ type: TYPES.COUNTRIES_BEGIN });
};

export const countriesSuccess = data => async dispatch => {
  dispatch({ type: TYPES.COUNTRIES_SUCCESS, payload: { data } });
};

export const countriesFailure = error => async dispatch => {
  dispatch({ type: TYPES.COUNTRIES_FAILURE, payload: { error } });
};

export const fetchCountries = () => async dispatch => {
  try {
    dispatch(countriesBegin());
    const res = await axios.get("/api/countries");
    dispatch(countriesSuccess(res.data));
    return { data: res.data };
  } catch (err) {
    const { data: error } = err.response;
    dispatch(countriesFailure(error));
    return { error };
  }
};

export const statesBegin = () => async dispatch => {
  dispatch({ type: TYPES.STATES_BEGIN });
};

export const statesSuccess = data => async dispatch => {
  dispatch({ type: TYPES.STATES_SUCCESS, payload: { data } });
};

export const statesFailure = error => async dispatch => {
  dispatch({ type: TYPES.STATES_FAILURE, payload: { error } });
};

export const fetchStates = () => async dispatch => {
  try {
    dispatch(statesBegin());
    const res = await axios.get("/api/states");
    dispatch(statesSuccess(res.data));
    return { data: res.data };
  } catch (err) {
    const { data: error } = err.response;
    dispatch(statesFailure(error));
    return { error };
  }
};
