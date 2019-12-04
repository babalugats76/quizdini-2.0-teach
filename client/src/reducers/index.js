import { combineReducers } from 'redux';
import account from './account';
import accountVerify from './accountVerify';
import auth from './auth';
import countryOptions from './countryOptions';
import matchGame from './matchGame';
import matchList from './matchList';
import passwordChange from './passwordChange';
import paymentList from './paymentList';
import recovery from './recovery';
import registration from './registration';
import stateOptions from './stateOptions';
import tokenVerify from './tokenVerify';

export default combineReducers({
  account,
  accountVerify,
  auth,
  countryOptions,
  matchGame, // To avoid confusion with react-router 'match' prop
  matchList, // To avoid confusion with react-router 'match' prop
  passwordChange, // Used in both 'update' and 'reset'
  paymentList,
  recovery,
  registration,
  stateOptions,
  tokenVerify
});
