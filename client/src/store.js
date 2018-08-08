import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './redux/reducer'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

//persist config, saves state on page refreshes
const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['stravaToken'],
  stateReconciler: autoMergeLevel2 // allows persist to grab newly added parts of state since last load
 };

 const pReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};
const middleware = [thunk];
const STATUS = process.env.IS_PROD;

export const store = createStore(
  pReducer, 
	initialState, 
	compose(applyMiddleware(...middleware),
	// this is for the chrome redux dev tools extension - comment out for production 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export const persistor = persistStore(store);