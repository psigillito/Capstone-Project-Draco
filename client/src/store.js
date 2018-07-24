import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './redux/reducer'
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const STATUS = process.env.IS_PROD;

const store = createStore(
	rootReducer, 
	initialState, 
	compose(applyMiddleware(...middleware),
	// this is for the chrome redux dev tools extension - comment out for production 
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;