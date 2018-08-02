import React, {Component} from 'react'
import Day from './Day'
import Calendar from './Calendar'
import NavBar from './NavBar'
import BootStrap from 'bootstrap'
import {Route, Switch} from 'react-router-dom'

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
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import * as goalsJCR from '../copy/goals.json'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utility/authToken';
import { setCurrentUser } from '../redux/actions';
import store from '../store';
import { connect } from 'react-redux';
import reducer from '../redux/reducer';
import axios from 'axios';
import ActiveWorkoutsPanel from './ActiveWorkoutsPanel';
import Recommendation from './Recommendation';
import TodaysExercisePanel from './TodaysExercisePanel';
import MonthStatisticsPanel from './MonthStatisticsPanel';
import { logout } from '../redux/actions';


const Months = ['January', ' February', ' March', ' April', ' May',
                ' June', ' July', ' August', ' September',
                ' October', ' November', ' December'
                ];

// check for the user's authorization token
if(localStorage.jwtToken) {
    // set the token header
    setAuthToken(localStorage.jwtToken);
    // decode the token and get user info
    const userData = jwt_decode(localStorage.jwtToken);
    // set the current user
    store.dispatch(setCurrentUser(userData));

    // check for expired token
    const currentTime = Date.now() / 1000;
    if(userData.exp < currentTime) {
        // token has expired. log user out
        store.dispatch(logout());
        //redirect to login page
        window.location.href = '/login';
    }

}


class Main extends Component{
    constructor(props) {
        super(props);
    }    
    
    render(){

        let loadingMainMenu = this.props.trainingPlans.data;
        return (
            <div>
                <NavBar onNavigate = {this.navigate}/>
                <Route exact path= "/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={UserProfile} />
                <Route exact path="/edit-profile" component={EditProfile} />
                <Route exact path = "/calendar" render={()=>(
                    
                    <section className="main-container">
                    <h1 className="display-3 mb-4" >Welcome Back {this.props.auth.user.name}</h1>
                        <br/>
                        <DayDetail dayVisible={this.props.dayVisible} updateDayVisible ={this.props.updateDayVisible}/>
                        
                        
                        <div className="container">
                            <div className="row">
                                <div className = "col-sm">
                                    <ActiveWorkoutsPanel trainingPlans={this.props.trainingPlans} workouts={this.props.workouts}/>
                                </div>
                                <div className = "col-sm"> 
                                    <h2>{Months[this.props.month] + ","+this.props.year}</h2>                   
                                    <Calendar trainingPlans={this.props.trainingPlans} user = {this.props.auth.user.name} weekArray={this.props.days} selectedYear={this.props.year} selectedMonth={this.props.month} updateDayVisible ={this.props.updateDayVisible} /> 
                                </div>
                                <div className = "col-sm"> 
                                <CalendarController updateMonth={this.props.updateMonth} updateDays={this.props.updateDays} 
                                    updateCurrentYear={this.props.updateCurrentYear}  year={this.props.year} month={this.props.month} className="calendar-controller"/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <TodaysExercisePanel className = "col-sm"/>
                                <span className = "col-sm"/>
                                <MonthStatisticsPanel className = "col-sm"/>

                            </div>
                        </div>
                        
                    </section>
                )}/>
                <Switch>
                    <Route path="/About" exact component={About}/>
                    <Route path="/Settings" exact component={Settings}/>
                    <Route path="/PairDevice" exact component={PairDevice}/>
                    <Route path = "/goals" render={(props) => <Goals {...props} user={this.props.auth.user.id} responses={goalsJCR.goals.responses}/>}/>
                    <Route path="/recommend" render={(props) => <Recommendation {...props} title="Recommendation" text="You should exercise at least 150 minutes this week!" />}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return { trainingPlans: state.trainingPlans, workouts:state.workouts, errors: state.errors }
  }

export default connect(mapStateToProps)(Main);
