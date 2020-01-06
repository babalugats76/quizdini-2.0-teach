import { combineReducers } from 'redux';
import account from './account';
import auth from './auth';
import countries from './countries';
import states from './states';

export default combineReducers({
  account,
  auth,
  countries,
  states
});
