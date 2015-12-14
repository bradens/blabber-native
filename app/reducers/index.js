import { combineReducers } from 'redux';
import user from './user.js';
import message from './message';
import currentUser from './current_user';

const rootReducer = combineReducers({
  user,
  message,
  currentUser
});

export default rootReducer;
