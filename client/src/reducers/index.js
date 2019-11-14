import { combineReducers } from 'redux';
import account from './account';
import auth from './auth';
import creditPayment from './creditPurchase';
import countryOptions from './countryOptions';
import login from './login';
import matchGame from './matchGame';
import matchList from './matchList';
import password from './password';
import paymentList from './paymentList';
import recovery from './recovery';
import register from './register';
import stateOptions from './stateOptions';
import token from './token';
import verify from './verify';

export default combineReducers({
  account,
  auth,
  creditPayment,
  countryOptions,
  login,
  matchGame, // To avoid confusion with react-router 'match' prop
  matchList, // To avoid confusion with react-router 'match' prop
  password,
  paymentList,
  recovery,
  register,
  stateOptions,
  token,
  verify
});
