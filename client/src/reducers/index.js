import { combineReducers } from 'redux';
import account from './account';
import auth from './auth';
import creditPurchase from './creditPurchase';
import countryOptions from './countryOptions';
import login from './login';
import matchGame from './matchGame';
import matchList from './matchList';
import password from './password';
import paymentList from './paymentList';
import recovery from './recovery';
import registration from './registration';
import stateOptions from './stateOptions';
import token from './token';
import verify from './verify';

export default combineReducers({
  account,
  auth,
  creditPurchase,
  countryOptions,
  login,
  matchGame, // To avoid confusion with react-router 'match' prop
  matchList, // To avoid confusion with react-router 'match' prop
  password,
  paymentList,
  recovery,
  registration,
  stateOptions,
  token,
  verify
});
