import { combineReducers } from 'redux';
import account from './account';
import auth from './auth';
import countries from './countries';
import matchGame from './matchGame';
import matchList from './matchList';
import passwordChange from './passwordChange';
import states from './states';

export default combineReducers({
  account,
  auth,
  countries,
  matchGame, // To avoid confusion with react-router 'match' prop
  matchList, // To avoid confusion with react-router 'match' prop
  passwordChange, // Used in both 'update' and 'reset'
  states
});
