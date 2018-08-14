import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class DeleteWorkout extends Component {
    constructor(props){
        super(props);

        this.state = {
          workoutId:'',
          trainingPlanId:'',
          errors: []
        }

        this.onChange = this.onChange.bind(this);
    }

    clearState() {
      this.setState({
        workoutId:'',
        trainingPlanId:''
      })
    }

    deleteWorkout() {
      let errorsList = [];

      if(this.state.trainingPlanId === '') {
        errorsList.push('You must select a training plan');
      }
      if(this.state.workoutId === '') {
        errorsList.push('You must select a workout to delete');
      }

      if(errorsList.length) {
        this.setState({ errors: errorsList });
      }

      if(errorsList.length === 0) {
        axios.delete('/workouts/' + this.state.workoutId)
            .then(() => { window.location.reload(); })
            .catch(err => console.log(err));
      }
    }

     onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {

      return(
        <div>
          
          <div className="modal-header">
            <h5 className="modal-title">Delete Workout</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body">
            {this.state.errors.map( (error, index) => 
              <div key={index} className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <label htmlFor="trainingPlan"><b>Training Plan to delete workout from:</b></label>
            <select id="inputState" 
              name="trainingPlanId" 
              className="form-control" 
              value={this.state.trainingPlanId ? this.state.trainingPlanId : ''} 
              onChange={this.onChange}
            >
            <option value={''}>...</option>
             {this.props.trainingPlans.data.filter( (plan)=>plan.active ==true).map( (plan, index) =>
                <option key={index} value={plan._id}>{plan.name}</option>
                )
              }
            </select>
            <br/>

            {this.state.trainingPlanId !== '' &&
            <div>
              <label htmlFor='name'><b>Select workout to delete:</b></label>
              <select id="inputState" 
                name="workoutId" 
                className="form-control" 
                value={this.state.workoutId ? this.state.workoutId : ''} 
                onChange={this.onChange}
              >
                <option value={''}>...</option>
                { this.props.workouts.data.filter( (workout) => workout.trainingPlan === this.state.trainingPlanId)
                  .map( (workout, index) => 
                  <option key={index} value={workout._id}>{workout.name}</option>
                  )
                }
              </select>
            </div> 
            }
          </div>
        
          <div className="modal-footer">
            <button type="button" onClick={() => this.clearState() } className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button"  onClick={() => this.deleteWorkout() } className="btn btn-danger">Delete Workout</button>
          </div>

        </div>         
      )
    }
}

const mapStateToProps = function(state) {
    return { workouts: state.workouts, trainingPlans: state.trainingPlans }
  }

export default connect(mapStateToProps)(DeleteWorkout);