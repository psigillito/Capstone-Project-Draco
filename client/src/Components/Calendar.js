import React, {Component} from 'react'
import Day from './Day'
import Week from './Week'
import DayDetail from './DayDetail'
import axios from 'axios';
import store from '../store';
import { connect } from 'react-redux';
import WorkOutDetail from './WorkOutDetail';
import {getCurrentTrainingPlans} from '../redux/actions'
import {getCurrentWorkouts} from '../redux/actions'
import {updateStravaToken} from '../redux/actions'


const Days = ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];



class Calendar extends Component{
    constructor(props){
        super(props);

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        //get all training plans 
        axios.get('/trainingPlans/currentUserPlans/', {
            params: {
                user: this.props.auth.user.id  
              }
        }).then(res => {    
            this.props.getCurrentTrainingPlans(res);
        })

        //get all workouts 
        axios.get('/workouts/currentWorkouts', {
            params: {
                user: this.props.auth.user.id
            }
        }).then(res => {
            this.props.getCurrentWorkouts(res);
        })
        axios.get('/users/getUser', {
            params:{
                _id: this.props.auth.user.id
            }
        }).then(res => {
            if(res.data.stravaToken){
                this.props.updateStravaToken(res.data.stravaToken);
            }
        })
    }

    render(){
        return (
            <div className="calendar-component">
                <table>
                    <thead>
                        <tr>{Days.map( (day, index) => <th key={index} className ="calendar-header">{day}</th> )}</tr>
                    </thead>
                    <tbody>
                        {this.props.weekArray.map( (daysOfWeek, index) => <Week key={index} updateDayVisible ={this.props.updateDayVisible} days={daysOfWeek}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return { auth: state.auth, workouts:state.workouts, errors: state.errors }
  }

export default connect(mapStateToProps, { getCurrentTrainingPlans, getCurrentWorkouts, updateStravaToken} )(Calendar);
