import React, {Component} from 'react';
import axios from 'axios';

class UpdateTrainingPlan extends Component {
    constructor(props){
        super(props);

        this.state = {
          name: '',
          startDate: '',
          endDate: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    submitTrainingPlan() {
        const newPlan = {
            name: this.state.name,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            id: this.props.id
        }

        if(this.props.title === 'Create New Training Plan') {
          axios.post('/trainingPlans', newPlan)
            .then(res => console.log(res))
            .catch(err => console.log(err));
          } else if(this.props.title === 'Edit Training Plan') {
            axios.patch('/trainingPlans', newPlan)
              .then(res => console.log(res))
              .catch(err => console.log(err));
          } 
          
        window.location.reload();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
      if(this.props.title === 'Delete') {
        return(
          <div>
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="alert alert-danger" role="alert">
                You are about to delete {this.props.name} training plan!
              </div>
              <button type="button" onClick={() => this.submitTrainingPlan(this.state.title)} class="danger btn btn-primary">
                Continue
              </button>
            </div>
        )
      } else {
      return(

        <div>
           <div class="modal-header">
           <h5>{this.props.title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            <div class="modal-body">
              <label for="name">
                <b>Name:</b>
              </label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Training Plan Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>

              <label for="startDate">
                <b>Start Date:</b>
              </label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Start Date"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.onChange}
                />
              </div>

              <label for="endDate">
                <b>End Date:</b>
              </label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="End Date"
                  name="endDate"
                  value={this.state.endDate}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" onClick={() => this.submitTrainingPlan(this.state.title)} class="btn btn-primary">
                Save changes
              </button>
            </div>
            </div>
    )}
    }
}

export default UpdateTrainingPlan;