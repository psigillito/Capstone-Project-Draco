import React, {Component} from 'react'
import Day from './Day'
import Calendar from './Calendar'
import NavBar from './NavBar'
import BootStrap from 'bootstrap'


class Main extends Component{

    render(){
        return (
            <div className="main-container">
                <NavBar/>
                <Calendar/>
            </div>
        )
    }
}

export default Main
