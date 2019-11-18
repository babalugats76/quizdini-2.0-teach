import { combineReducers } from 'redux';
import account from './account';
import auth from './auth';
import creditPurchase from './creditPurchase';
import countryOptions from './countryOptions';
import login from './login';
import matchGame from './matchGame';
import matchList from './matchList';
import passwordChange from './passwordChange';
import paymentList from './paymentList';
import recovery from './recovery';
import registration from './registration';
import stateOptions from './stateOptions';
import tokenVerify from './tokenVerify';
import verify from './verify';

export default combineReducers({
  account,
  auth,
  creditPurchase,
  countryOptions,
  login,
  matchGame, // To avoid confusion with react-router 'match' prop
  matchList, // To avoid confusion with react-router 'match' prop
  passwordChange, // Used in both 'update' and 'reset'
  paymentList,
  recovery,
  registration,
  stateOptions,
  tokenVerify,
  verify
});
