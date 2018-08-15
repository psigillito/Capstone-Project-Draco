import React, {Component} from 'react'
import { connect } from 'react-redux';
import WorkOutDetail from './WorkOutDetail';
import AddNewExercise from './AddNewExercise';
import EditExercise from './EditExercise';
import axios from 'axios';
import GoogleMap from './GoogleMap';

let allExercises = [];
let createdExercise = {};
let exerciseDays = [];

class DayDetail extends Component {
    constructor(props){
      super(props)
      this.state = {
        visible: this.props.dayVisible,
        currentPolyLine: -1
      }

      this.onChange = this.onChange.bind(this);
      this.handleRouteChange = this.handleRouteChange.bind(this);
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
    }

    handleRouteChange(e){

      var id = e.nativeEvent.target.value;
      if(id == -1){
         this.setState({
            currentPolyLine: -1,
          })
      }else{
        //set selectedId in state 
        //get route details
        fetch('https://www.strava.com/api/v3/routes/'+id +'?access_token='+this.props.stravaToken)
        .then((results) => results.json())
        .then( (results) => {
          this.setState({
            currentPolyLine: results.map.polyline,
          })
        })
      }
    }

    render(){

      var workoutsCount = false;
      if(this.props.workouts){
        workoutsCount = this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek !== null 
                        && exercise.daysOfWeek.includes(this.props.weekDay) && this.props.selectedWorkoutList !== null 
                        && this.props.selectedWorkoutList.includes(exercise._id)).length;
      }

      if(workoutsCount){

        var tempsToFilter = this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) 
        && this.props.selectedWorkoutList.includes(exercise._id)
        && exercise.mode =='Running')
  
        //get routes to display 
        var routesToDisplay = [];
        for(var i = 0; i < tempsToFilter.length; i++){
          for(var x =0; x < tempsToFilter[i].exercises.length; x++){
            if(tempsToFilter[i].exercises[x].stravaRoute && tempsToFilter[i].exercises[x].stravaRoute > 0){
              var tempRoute = {name: tempsToFilter[i].exercises[x].name, stravaRoute: tempsToFilter[i].exercises[x].stravaRoute}
              routesToDisplay.push(tempRoute)
            }
          }
        }


        return(
          <div>
            {
              <div className="modal fade" id="dayModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title font-header-weight"> {this.props.month+1}/{this.props.day}/{this.props.year}</h4>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                      <h4  className="font-header-weight" >Weight Training Workouts:</h4>
                      {
                        this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) 
                          && this.props.selectedWorkoutList.includes(exercise._id) 
                          && exercise.mode =='Weight Training').map( (workout, index) =>
                            <div key={index}>
                              <h5 className="font-header-weight">{workout.name}</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Sets</th>
                                            <th>Reps</th>
                                            <th>Weight</th>
                                            <th>Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      <WorkOutDetail type="Weight Training" workout={workout}/>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <br/>
                        <h4 className="font-header-weight">Cardio Workouts:</h4>
                        {
                        this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(this.props.weekDay) 
                          && this.props.selectedWorkoutList.includes(exercise._id)
                          && (exercise.mode =='Running' || exercise.mode == 'Swimming' || exercise.mode == 'Cycling')).map( (workout, index) =>
                            <div key={index}>
                              <h5 className="font-header-weight">{workout.name}</h5>
                                <table className="table">
                                  <thead>
                                      <tr>
                                          <th>Name</th>
                                          <th>Distance</th>
                                          <th>Unit</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <WorkOutDetail type="Running" workout={workout}/>
                                  </tbody>
                                </table>
                            </div>
                        )}
                        {/*GOOGLE MAP SECTION*/}
                        {routesToDisplay.length > 0 &&
                          <div>
                            <hr/>
                            <p>Some runs you have are associated with a strava route. Select a route below to display it on the map.</p>
                            <select id="inputRoute" className="custom-select" onChange={this.handleRouteChange} >
                              <option value={-1}>Select a Strava Route to Display</option>
                              { 
                                routesToDisplay.map( (route, index) =>
                                <option key={index} value={route.stravaRoute}>{route.name}</option>
                              )}
                            </select>
                            <div className="centered-section">
                              <GoogleMap selectedPolyLine={this.state.currentPolyLine}/>
                            </div>
                          </div>

                        }
                    </div>
                    <div className="modal-footer">
                      <button type="button" data-toggle="modal" data-target="#editExercise" className="btn btn-secondary btn-sm">Edit Exercise</button>
                      <button type="button" data-toggle="modal" data-target="#addExercise" className="btn btn-success btn-sm">Add Exercise</button>
                    </div>
                  </div>
                </div>
                {/* add exercise */}
                <div className="modal" id="addExercise" tabIndex="-1" role="dialog">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <AddNewExercise />
                    </div>
                  </div>
                </div>
                {/* edit exercise */}
                <div className="modal" id="editExercise" tabIndex="-1" role="dialog">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <EditExercise />
                    </div>
                  </div>
                </div>  
              </div>
            }
          </div>
          )
        }else{
          return(
            <div>
              {
                <div className="modal fade" id="dayModal" tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title"> {this.props.day}/{this.props.month+1}/{this.props.year}</h4>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div className="modal-body">No Exercises Today</div>
                      <div className="modal-footer"></div>
                    </div>
                  </div>
                </div>
              }
            </div>
          )
        }
    }
}

const mapStateToProps = function(state) {
    return { day: state.day,
             weekDay: state.weekDay, 
             month:state.month, 
             year:state.year, 
             workouts:state.workouts,
             trainingPlans:state.trainingPlans,
             selectedWorkoutList:state.selectedWorkoutList,
             athleteId: state.athleteId,
             stravaToken: state.stravaToken
            }
}

export default connect(mapStateToProps)(DayDetail);
