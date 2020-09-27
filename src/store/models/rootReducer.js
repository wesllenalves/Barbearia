import {combineReducers} from 'redux';
import user from './user/reducers';
import auth from './auth/reducer';

export default combineReducers({
  user,
  auth,
});
