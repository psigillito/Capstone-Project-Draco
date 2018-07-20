import React, {Component} from 'react'
import bootstrap from 'bootstrap'
import {Link} from 'react-router-dom'
import Settings from './Settings'
import About from './About'
import LogOff from './LogOff'
import PairDevice from './PairDevice'
import { logout } from '../redux/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NavBar extends Component {
    logoutClick(e) {
        e.preventDefault();
        this.props.logout();
    }

    render(){
        return(
            <nav className="nav navbar navbar-dark navbar-expand-md bg-dark">
                <a className="navbar-brand" href="#">Draco Project</a>
                <div className="dropdown">
                    <button className="btn btn-secondary" type="button" id="dropdownMenuButton" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" to="/PairDevice">Pair Device</Link>
                        <Link className="dropdown-item" to="/Settings">Settings</Link>
                        <Link className="dropdown-item" to="/About">About</Link>
                        <a href="#" onClick={this.logoutClick.bind(this)} className="dropdown-item">Log Off</a>
                    </div>
                </div>
                <Link className="btn btn-secondary home-btn" to="/">Home</Link>
                
            </nav>
        )
    }
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(NavBar);