import {combineReducers} from 'redux';
import user from './user/reducers';
import auth from './auth/reducer';
import register from './register/reducer';

export default combineReducers({
  user,
  auth,
  register,
});
