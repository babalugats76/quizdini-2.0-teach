import { combineReducers } from 'redux';
import account from './account';
import auth from './auth';
import countries from './countries';
import matchGame from './matchGame';
import states from './states';

export default combineReducers({
  account,
  auth,
  countries,
  matchGame, // To avoid confusion with react-router 'match' prop
  states
});
