import React, {Component} from 'react'
import Day from './Day'
import Calendar from './Calendar'
import NavBar from './NavBar'
import BootStrap from 'bootstrap'
import {Route, Switch} from 'react-router-dom'
import LogOff from './LogOff'
import About from './About'
import Settings from './Settings'
import PairDevice from './PairDevice'
import CalendarController from './CalendarController'
import {updateCurrentYear} from '../redux/actions'
import {updateMonth} from '../redux/actions'
import {dayVisible} from '../redux/actions'
import weekData from '../data/weekData'
import Goals from './Goals'
import DayDetail from './DayDetail'
import Landing from './Landing'
import Register from './auth/Register'
import Login from './auth/Login'
import * as goalsJCR from '../copy/goals.json'

const Months = ['January', ' February', ' March', ' April', ' May',
                ' June', ' July', ' August', ' September',
                ' October', ' November', ' December'
                ];

class Main extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        console.log(this.props)
        
        return (
            <div>
                <NavBar onNavigate = {this.navigate}/>
                <Route exact path= "/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path = "/calendar" render={()=>(
                    <section className="main-container">
                        <h2>{Months[this.props.month] + ","+this.props.year}</h2>
                        <DayDetail dayVisible={this.props.dayVisible} updateDayVisible ={this.props.updateDayVisible}/>
                        <Calendar weekArray={this.props.days} selectedYear={this.props.year} selectedMonth={this.props.month} updateDayVisible ={this.props.updateDayVisible} /> 
                        <CalendarController updateMonth={this.props.updateMonth} updateDays={this.props.updateDays} 
                        updateCurrentYear={this.props.updateCurrentYear}  year={this.props.year} month={this.props.month} className="calendar-controller"/>
                    </section>
                )}/>
                <Switch>
                    <Route path="/About" exact component={About}/>
                    <Route path="/LogOff" exact component={LogOff}/>
                    <Route path="/Settings" exact component={Settings}/>
                    <Route path="/PairDevice" exact component={PairDevice}/>
                    <Route path = "/goals" render={(props) => <Goals {...props} responses={goalsJCR.goals.responses}/>}/>
                </Switch>
            </div>
        )
    }
}

export default Main
