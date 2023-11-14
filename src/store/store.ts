import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./root.reducer";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from "redux-thunk";

const middleWares: any[] = [
    process.env.NODE_ENV !== 'production' && logger, thunk
].filter(Boolean);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = (process.env.NODE_ENV !== 'production' &&
    // @ts-ignore
    window && window.__REDUX_DEVTOOLS_EXTENSIOM_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);
