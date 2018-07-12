import React, {Component} from 'react'
import bootstrap from 'bootstrap'
import {Link} from 'react-router-dom'
import Settings from './Settings'
import About from './About'
import LogOff from './LogOff'
import PairDevice from './PairDevice'

class NavBar extends Component {
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
                        <Link className="dropdown-item" to="/LogOff">Log Off</Link>
                    </div>

                </div>
                <Link className="btn btn-secondary home-btn" to="/">Home</Link>
                
            </nav>
        )
    }
}

export default NavBar