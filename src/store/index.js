import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './models/rootReducer';
import rootSaga from './models/rootSaga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export {store, persistor};
