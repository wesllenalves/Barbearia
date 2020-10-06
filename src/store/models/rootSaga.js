import {all} from 'redux-saga/effects';

import userSaga from './user/sagas';
import auth from './auth/sagas';
import register from './register/sagas';

export default function* rootSaga() {
  return yield all([
    userSaga, 
    auth,
    register,
  ]);
}
