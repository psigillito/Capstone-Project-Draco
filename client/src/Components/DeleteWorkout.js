import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class DeleteWorkout extends Component {
    constructor(props){
        super(props);

        this.state = {
          workoutId:'',
          trainingPlanId:''
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
      axios.delete('/workouts', {
        params: {
          wid: this.state.workoutId,
          tpid: this.state.trainingPlanId
        }
      })
          .then(() => { window.location.reload(); })
          .catch(err => console.log(err));
    }



     onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {

      return(
        <div>
          <div class="modal-body">
            <label for="trainingPlan"><b>Training Plan to delete workout from:</b></label>
            <select id="inputState" 
              name="trainingPlanId" 
              class="form-control" 
              value={this.state.trainingPlanId ? this.state.trainingPlanId : ''} 
              onChange={this.onChange}
            >
            <option selected>Choose...</option>
             {this.props.trainingPlans.data.filter( (plan)=>plan.active ==true).map( (plan, index) =>
                <option key={index} value={plan._id}>{plan.name}</option>
                )
              }
            </select>
            <br/>

            {this.state.trainingPlanId !== '' &&
            <div>
              <label for='name'><b>Select workout to delete:</b></label>
              <select id="inputState" 
                name="workoutId" 
                class="form-control" 
                value={this.state.workoutId ? this.state.workoutId : ''} 
                onChange={this.onChange}
              >
                <option selected>Choose...</option>
                { this.props.workouts.data.map( (workout, index) =>
                  <option key={index} value={workout._id}>{workout.name}</option>
                  )
                }
              </select>
            </div> 
            }
          </div>
        
            <div class="modal-footer">
              <button type="button" onClick={() => this.clearState() } class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button"  onClick={() => this.deleteWorkout() } class="btn btn-danger">Delete</button>
            </div>

        </div>         
      )
    }
}

const mapStateToProps = function(state) {
    return { workouts: state.workouts, trainingPlans: state.trainingPlans }
  }

export default connect(mapStateToProps)(DeleteWorkout);