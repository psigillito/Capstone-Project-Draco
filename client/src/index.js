import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/styling.css'
import Main from './Components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'
ReactDOM.render(<BrowserRouter><Main/></BrowserRouter>, document.getElementById('root'));

