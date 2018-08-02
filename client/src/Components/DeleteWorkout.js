import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class DeleteWorkout extends Component {
    constructor(props){
        super(props);

        this.state = {
          workout:''
        }

        this.onChange = this.onChange.bind(this);
    }

    clearState() {
      this.setState({
        workout:''
      })
    }

    deleteWorkout() {
      axios.delete('/workouts', {
        params: {
          id: this.state.workout
        }
      })
          .then(res => {window.location.reload();})
          .catch(err => console.log(err));
    }



     onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {

      return(
        <div>
          <div class="modal-body">
            <label for='name'><b>Select workout to delete:</b></label>
            <select id="inputState" name="workout" class="form-control" onChange={this.onChange}>
              <option selected>Choose...</option>
              { this.props.workouts.data.map( (workout, index) =>
                            <option key={index} value={workout._id}>{workout.name}</option>
                              )
                     }
            </select>
            <br/>
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
    return { workouts:state.workouts }
  }

export default connect(mapStateToProps)(DeleteWorkout);