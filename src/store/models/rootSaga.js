import {all} from 'redux-saga/effects';

import userSaga from './user/sagas';
import auth from './auth/sagas';

export default function* rootSaga() {
  return yield all([userSaga, auth]);
}
