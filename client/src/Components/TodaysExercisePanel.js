import React, {Component} from 'react'
import WorkOutDetail from './WorkOutDetail';
import { connect } from 'react-redux';

class TodaysExercisePanel extends Component {

  render(){

    if(this.props.todaysWorkouts && this.props.todaysWorkouts.length > 0){

      return(
        <div>
          <h2 className="display-4 mb-4">Today's Workouts</h2>    
          { this.props.todaysWorkouts.filter( (exercise) => exercise.mode =='Weight Training' && exercise.exercises.length > 0).map( (workout, index) =>
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
          { this.props.todaysWorkouts.filter( (exercise) => exercise.mode =='Running').map( (workout, index) =>
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
          </div>
      )}
      else{
        return (
          <div>
            <h2 className="display-4 mb-4">Today's Workouts</h2>   
            <div>No Exercises Today</div>
          </div>
        )
      }
    }
}

const mapStateToProps = function(state) {
  return { 
           todaysWorkouts: state.todaysWorkouts 
         }
}

export default connect(mapStateToProps)(TodaysExercisePanel);