import React, {Component} from 'react';
import axios from 'axios';

class UpdateTrainingPlan extends Component {
    constructor(props){
        super(props);

        this.state = {
          name: this.props.name,
          startDate: this.props.startDate,
          endDate: this.props.endDate
        }

        this.onChange = this.onChange.bind(this);
    }

    submitTrainingPlan() {
        const newPlan = {
            name: this.state.name,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        }

        if(this.props.title === 'Create New Training Plan') {
          axios.post('/trainingPlans', newPlan)
            .then(res => console.log(res))
            .catch(err => console.log(err));
          } else if(this.props.title === 'Edit Training Plan') {
            axios.patch('/trainingPlans/' + this.props.id, newPlan)
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
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="alert alert-danger" role="alert">
                You are about to delete {this.props.name} training plan!
              </div>
              <button type="button" onClick={() => this.submitTrainingPlan(this.state.title)} className="danger btn btn-primary">
                Continue
              </button>
            </div>
        )
      } else {
      return(
        <div>
           <div className="modal-header">
           <h5>{this.props.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            <div className="modal-body">
              <label htmlFor="name">
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

              <label htmlFor="startDate">
                <b>Start Date:</b>
              </label>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  placeholder="Start Date"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.onChange}
                />
              </div>

              <label htmlFor="endDate">
                <b>End Date:</b>
              </label>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  placeholder="End Date"
                  name="endDate"
                  value={this.state.endDate}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">
                Cancel
              </button>
              <button type="button" onClick={() => this.submitTrainingPlan(this.state.title)} className="btn btn-success btn-sm">
                Save changes
              </button>
            </div>
            </div>
    )}
    }
}

export default UpdateTrainingPlan;