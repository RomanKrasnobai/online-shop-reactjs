import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root.reducer";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares: any[] = [
  process.env.NODE_ENV !== 'production' && logger, sagaMiddleware
].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' &&
    // @ts-ignore
    window && window.__REDUX_DEVTOOLS_EXTENSIOM_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
