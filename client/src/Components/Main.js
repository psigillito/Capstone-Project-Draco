import React, {Component} from 'react'
import Day from './Day'
import Calendar from './Calendar'
import NavBar from './NavBar'
import BootStrap from 'bootstrap'
import {Route} from 'react-router-dom'
import LogOff from './LogOff'
import About from './About'
import Settings from './Settings'
import PairDevice from './PairDevice'


class Main extends Component{
    constructor(props) {
        super(props);

    }

    render(){
        return (

            <div>
                <NavBar onNavigate = {this.navigate}/>
                <Route exact path = "/" render={()=>(
                    <section className="main-container">
                        <Calendar/>
                    </section>
                )}/>
                
                <Route path="/About" component={About}/>
                <Route path="/LogOff" component={LogOff}/>
                <Route path="/Settings" component={Settings}/>
                <Route path="/PairDevice" component={PairDevice}/>
            </div>
        )
    }

}

export default Main
