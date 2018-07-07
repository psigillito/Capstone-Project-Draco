import React, {Component} from 'react'
import bootstrap from 'bootstrap'

class NavBar extends Component {
    render(){
        return(
            <nav className="navbar navbar-dark navbar-expand-md bg-dark">
                <a className="navbar-brand" href="#">Draco Project</a>
                <div className="dropdown">
                    <button className="btn btn-secondary" type="button" id="dropdownMenuButton" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar