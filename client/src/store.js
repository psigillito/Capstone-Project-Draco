import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './redux/reducer'
import thunk from 'redux-thunk';

/*NEW */
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
 };

 const pReducer = persistReducer(persistConfig, rootReducer);
////////////



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