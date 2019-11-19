import axios from 'axios';
import * as TYPES from './types';

/**
 * ACCOUNT SECTION
 * Actions used to obtain and perform CRUD operations on current user's account info, etc.
 */
export const accountBegin = () => async dispatch => {
  dispatch({ type: TYPES.ACCOUNT_BEGIN });
};

export const accountSuccess = user => async dispatch => {
  dispatch({ type: TYPES.ACCOUNT_SUCCESS, payload: { user } });
};

export const accountFailure = error => async dispatch => {
  dispatch({ type: TYPES.ACCOUNT_FAILURE, payload: { error } });
};

export const fetchAccount = () => async dispatch => {
  try {
    dispatch(accountBegin());
    const res = await axios.get('/api/account');
    dispatch(accountSuccess(res.data));
  } catch (e) {
    dispatch(accountFailure(e.response.data));
  }
};

export const updateAccount = data => async dispatch => {
  try {
    const res = await axios.put('/api/account', data);
    dispatch(accountSuccess(res.data));
  } catch (e) {
    dispatch(accountFailure(e.response.data));
  }
};

/**
 * ACCOUNT VERIFY SECTION
 * Actions used to verify newly-registered users
 */

export const accountVerifyBegin = () => async dispatch => {
  dispatch({ type: TYPES.ACCOUNT_VERIFY_BEGIN });
};

export const accountVerifySuccess = data => async dispatch => {
  dispatch({ type: TYPES.ACCOUNT_VERIFY_SUCCESS, payload: { data } });
};

export const accountVerifyFailure = error => async dispatch => {
  dispatch({ type: TYPES.ACCOUNT_VERIFY_FAILURE, payload: { error } });
};

export const verifyAccount = secret => async dispatch => {
  try {
    dispatch(accountVerifyBegin());
    const res = await axios.put(`/api/account/verify`, { secret });
    dispatch(accountVerifySuccess(res.data));
  } catch (e) {
    dispatch(accountVerifyFailure(e.response.data));
  }
};

/**
 * AUTH SECTION
 * Actions used to determine the current user
 */

export const authBegin = () => async dispatch => {
  dispatch({ type: TYPES.AUTH_BEGIN });
};

export const authSuccess = ({
  accountType,
  credits,
  googlePicture,
  loggedIn,
  username
}) => async dispatch => {
  dispatch({
    type: TYPES.AUTH_SUCCESS,
    payload: { accountType, credits, googlePicture, loggedIn, username }
  });
};

export const authFailure = error => async dispatch => {
  dispatch({ type: TYPES.AUTH_FAILURE, payload: { error } });
};

export const fetchAuth = () => async dispatch => {
  dispatch(authBegin());
  try {
    const res = await axios.get('/api/current_user');
    const loggedIn = !!res.data;
    const { credits, googleId, googlePicture, username } = res.data || {};
    const accountType = googleId ? 'google' : 'local';
    dispatch(
      authSuccess({ accountType, credits, googlePicture, loggedIn, username })
    );
  } catch (e) {
    dispatch(authFailure(e.response.data));
  }
};

/**
 * BUY CREDITS SECTION
 * Actions used to manage user checkout/cart
 */

export const buyCreditsBegin = () => async dispatch => {
  dispatch({ type: TYPES.BUY_CREDITS_BEGIN });
};

export const buyCreditsSuccess = data => async dispatch => {
  dispatch({ type: TYPES.BUY_CREDITS_SUCCESS, payload: { data } });
};

export const buyCreditsFailure = error => async dispatch => {
  dispatch({ type: TYPES.BUY_CREDITS_FAILURE, payload: { error } });
};

export const buyCredits = data => async dispatch => {
  try {
    dispatch(buyCreditsBegin());
    const res = await axios.post('/api/payment', data);
    return dispatch(buyCreditsSuccess(res.data));
  } catch (e) {
    dispatch(buyCreditsFailure(e.response.data));
  }
};

/**
 * COUNTRIES SECTION
 * Actions used to obtain country info
 */

export const countriesBegin = () => async dispatch => {
  dispatch({ type: TYPES.COUNTRIES_BEGIN });
};

export const countriesSuccess = countries => async dispatch => {
  dispatch({ type: TYPES.COUNTRIES_SUCCESS, payload: { countries } });
};

export const countriesFailure = error => async dispatch => {
  dispatch({ type: TYPES.COUNTRIES_FAILURE, payload: { error } });
};

export const fetchCountries = () => async dispatch => {
  try {
    dispatch(countriesBegin());
    const res = await axios.get('/api/countries');
    dispatch(countriesSuccess(res.data));
  } catch (e) {
    dispatch(countriesFailure(e.response.data));
  }
};

/**
 * LOGIN SECTION
 * Actions used to authenticate user (local method only)
 */

export const loginBegin = () => async dispatch => {
  dispatch({ type: TYPES.LOGIN_BEGIN });
};

export const loginSuccess = data => async dispatch => {
  dispatch({ type: TYPES.LOGIN_SUCCESS, payload: { data } });
};

export const loginFailure = error => async dispatch => {
  dispatch({ type: TYPES.LOGIN_FAILURE, payload: { error } });
};

export const loginUser = data => async dispatch => {
  try {
    dispatch(loginBegin());
    const res = await axios.post('/auth/local', data);
    return dispatch(loginSuccess(res.data));
  } catch (e) {
    dispatch(loginFailure(e.response.data));
  }
};

/**
 * MATCHES SECTION
 * Actions used to obtain match game info
 */

export const matchesBegin = () => async dispatch => {
  dispatch({ type: TYPES.MATCHES_BEGIN });
};

export const matchesSuccess = matches => async dispatch => {
  dispatch({ type: TYPES.MATCHES_SUCCESS, payload: { matches } });
};

export const matchesFailure = error => async dispatch => {
  dispatch({ type: TYPES.MATCHES_FAILURE, payload: { error } });
};

export const fetchMatches = () => async dispatch => {
  try {
    dispatch(matchesBegin());
    const res = await axios.get('/api/matches');
    dispatch(matchesSuccess(res.data));
  } catch (e) {
    dispatch(matchesFailure(e.response.data));
  }
};

/**
 * MATCH SECTION
 * Actions used to perform get match info and perform CRUD operations
 */

export const matchBegin = () => async dispatch => {
  dispatch({ type: TYPES.MATCH_BEGIN });
};

export const matchSuccess = match => async dispatch => {
  dispatch({ type: TYPES.MATCH_SUCCESS, payload: { match } });
};

export const matchFailure = error => async dispatch => {
  dispatch({ type: TYPES.MATCH_FAILURE, payload: { error } });
};

export const fetchMatch = matchId => async dispatch => {
  try {
    dispatch(matchBegin());
    const res = matchId
      ? await axios.get(`/api/match/${matchId}`)
      : { data: {} };
    dispatch(matchSuccess(res.data));
  } catch (e) {
    dispatch(matchFailure(e.response.data));
  }
};

export const removeMatch = matchId => async dispatch => {
  try {
    dispatch(matchBegin());
    const res = await axios.delete(`/api/match/${matchId}`);
    matchSuccess(res.data);
  } catch (e) {
    dispatch(matchFailure(e.response.data));
  }
};

export const upsertMatch = (matchId, match) => async dispatch => {
  try {
    const res = matchId
      ? await axios.put(`/api/match/${matchId}`, match)
      : await axios.post('/api/match', match);
    await dispatch(matchSuccess(res.data));
  } catch (e) {
    dispatch(matchFailure(e.response.data));
  }
};

/**
 * PASSWORD CHANGE SECTION
 * Actions used to both "update" and "reset" users' passwords
 */

export const passwordChangeBegin = () => async dispatch => {
  dispatch({ type: TYPES.PASSWORD_CHANGE_BEGIN });
};

export const passwordChangeSuccess = data => async dispatch => {
  dispatch({ type: TYPES.PASSWORD_CHANGE_SUCCESS, payload: { data } });
};

export const passwordChangeFailure = error => async dispatch => {
  dispatch({ type: TYPES.PASSWORD_CHANGE_FAILURE, payload: { error } });
};

export const resetPassword = data => async dispatch => {
  try {
    dispatch(passwordChangeBegin());
    const res = await axios.put('/api/account/password-reset', data);
    dispatch(passwordChangeSuccess(res.data));
  } catch (e) {
    dispatch(passwordChangeFailure(e.response.data));
  }
};

export const updatePassword = data => async dispatch => {
  try {
    dispatch(passwordChangeBegin());
    const res = await axios.put('/api/account/password', data);
    dispatch(passwordChangeSuccess(res.data));
  } catch (e) {
    dispatch(passwordChangeFailure(e.response.data));
  }
};

/**
 * PAYMENTS SECTION
 * Actions used to get info on payments
 */

export const paymentsBegin = () => async dispatch => {
  dispatch({ type: TYPES.PAYMENTS_BEGIN });
};

export const paymentsSuccess = payments => async dispatch => {
  dispatch({ type: TYPES.PAYMENTS_SUCCESS, payload: { payments } });
};

export const paymentsFailure = error => async dispatch => {
  dispatch({ type: TYPES.PAYMENTS_FAILURE, payload: { error } });
};

export const fetchPayments = () => async dispatch => {
  try {
    dispatch(paymentsBegin());
    const res = await axios.get('/api/payments');
    dispatch(paymentsSuccess(res.data));
  } catch (e) {
    dispatch(paymentsFailure(e.response.data));
  }
};

/**
 * RECOVERY SECTION
 * Actions used to obtain help recoverying "lost" credentials
 */

export const recoveryBegin = () => async dispatch => {
  dispatch({ type: TYPES.RECOVERY_BEGIN });
};

export const recoverySuccess = data => async dispatch => {
  dispatch({ type: TYPES.RECOVERY_SUCCESS, payload: { data } });
};

export const recoveryFailure = error => async dispatch => {
  dispatch({ type: TYPES.RECOVERY_FAILURE, payload: { error } });
};

export const sendRecoveryEmail = data => async dispatch => {
  try {
    dispatch(recoveryBegin());
    const res = await axios.post('/api/account/lost', data, {
      headers: {
        // Application-specific header for presenting user with time relative to their local timezone
        'quizdini-timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    });
    dispatch(recoverySuccess(res.data));
  } catch (e) {
    dispatch(recoveryFailure(e.response.data));
  }
};

/**
 * REGISTER SECTION
 * Actions used to register new users
 */

export const registerBegin = () => async dispatch => {
  dispatch({ type: TYPES.REGISTER_BEGIN });
};

export const registerSuccess = data => async dispatch => {
  dispatch({ type: TYPES.REGISTER_SUCCESS, payload: { data } });
};

export const registerFailure = error => async dispatch => {
  dispatch({ type: TYPES.REGISTER_FAILURE, payload: { error } });
};

export const registerUser = data => async dispatch => {
  try {
    dispatch(registerBegin());
    const res = await axios.post('/api/account', data);
    return dispatch(registerSuccess(res.data));
  } catch (e) {
    dispatch(registerFailure(e.response.data));
  }
};

/**
 * REGISTER SECTION
 * Actions used to obtain state info
 */

export const statesBegin = () => async dispatch => {
  dispatch({ type: TYPES.STATES_BEGIN });
};

export const statesSuccess = states => async dispatch => {
  dispatch({ type: TYPES.STATES_SUCCESS, payload: { states } });
};

export const statesFailure = error => async dispatch => {
  dispatch({ type: TYPES.STATES_FAILURE, payload: { error } });
};

export const fetchStates = () => async dispatch => {
  try {
    dispatch(statesBegin());
    const res = await axios.get('/api/states');
    dispatch(statesSuccess(res.data));
  } catch (e) {
    dispatch(statesFailure(e.response.data));
  }
};

/**
 * TOKEN VERIFY SECTION
 * Actions used to obtain token info (verification)
 */

export const tokenVerifyBegin = () => async dispatch => {
  dispatch({ type: TYPES.TOKEN_VERIFY_BEGIN });
};

export const tokenVerifySuccess = data => async dispatch => {
  dispatch({ type: TYPES.TOKEN_VERIFY_SUCCESS, payload: { data } });
};

export const tokenVerifyFailure = error => async dispatch => {
  dispatch({ type: TYPES.TOKEN_VERIFY_FAILURE, payload: { error } });
};

export const verifyToken = secret => async dispatch => {
  try {
    dispatch(tokenVerifyBegin());
    const res = await axios.get(`/api/token/${secret}`);
    dispatch(tokenVerifySuccess(res.data));
  } catch (e) {
    dispatch(tokenVerifyFailure(e.response.data));
  }
};
