import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/styling.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './redux/reducer'
import {Provider} from 'react-redux'
import App from './Components/App'
import thunk from 'redux-thunk';
import store from './store';

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
// 	rootReducer, 
// 	initialState, 
// 	compose(applyMiddleware(...middleware),
// 	// this is for the chrome redux dev tools extension 
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));