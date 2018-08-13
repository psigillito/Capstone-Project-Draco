import React, {Component} from 'react'
import Day from './Day'
import Week from './Week'
import DayDetail from './DayDetail'
import axios from 'axios';
import store from '../store';
import { connect } from 'react-redux';
import WorkOutDetail from './WorkOutDetail';
import {updateStatistics, setTodaysWorkouts, getCurrentTrainingPlans, getCurrentWorkouts, updateStravaToken, setAthleteId, setAthleteRoutes, setSelectedRoute, setCurrentRoute} from '../redux/actions';


const Days = ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

class Calendar extends Component{
    constructor(props){
        super(props);

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        //get all training plans 
        axios.get('/trainingPlans/', {
            params: {
                user: this.props.auth.user.id  
              }
        }).then(res => {    
            this.props.getCurrentTrainingPlans(res);
        })

        //get all workouts 
        axios.get('/workouts/', {
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
            if(res.data && res.data.stravaToken){
                this.props.updateStravaToken(res.data.stravaToken);
            }
        }).then( res =>{

          fetch('https://www.strava.com/api/v3/athlete?access_token='+this.props.stravaToken).then((results) => results.json())
          .then( (results) => {
            
            //set athleteId in store
            this.props.setAthleteId(results.id);
            
            fetch('https://www.strava.com/api/v3/athletes/'+results.id+'/routes?access_token='+this.props.stravaToken)
            .then((results) => results.json())
            .then( (results) => {
    
              //save route names and ids into store
              var athleteRoutes =[];
              for( var i=0; i < results.length; i++){
                var tempRoute = { name: results[i].name, id: results[i].id}
                athleteRoutes.push(tempRoute)
              }
              this.props.setAthleteRoutes(athleteRoutes)
            })
          })
        }).then( res => {
          this.props.setTodaysWorkouts();
        }).then(res => {
          this.props.updateStatistics(8, 2018 )
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
    return { auth: state.auth, workouts:state.workouts, 
             stravaToken: state.stravaToken, 
             errors: state.errors,
           }
  }

export default connect(mapStateToProps, {updateStatistics, setTodaysWorkouts, getCurrentTrainingPlans, getCurrentWorkouts, updateStravaToken, setAthleteId, setAthleteRoutes} )(Calendar);
