import React, { Component } from 'react'
import * as goals from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'
import Alert from './Alert';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showAlert(el) {
    document.getElementById(el).className = "show";
  }

  handleChange(event) {
    this.setState({ value: parseInt(event.target.value, 10) });
  }

  handleSubmit(event) {
    switch (this.state.value) {
      case 1:
        console.log("Improving Health");
        break;
      case 2:
        console.log("Lose Weight");
        // launch follow up
        break;
      case 3:
        console.log("Improve fitness");
        // launch follow up
        break;
      case 4:
        console.log("Sports performance");
        // launch follow up
        break;
      case 5:
        this.showAlert();
        //alert("This will turn off all recommendations");
        console.log("Made it past the Alert creation");
        break;
      default:
        console.log("This shouldn't get executed!");
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Launch demo modal</button>
    
        <div class="modal fade" id="myModal" tabIndex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Exercise Goals</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class="modal-body" id="myModal">
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <label>
                      {goals.goals.question}
                      <select class="form-control" value={this.state.value} onChange={this.handleChange}>
                        <option value={goals.goals.responses[0].value}>{goals.goals.responses[0].text}</option>
                        <option value={goals.goals.responses[1].value}>{goals.goals.responses[1].text}</option>
                        <option value={goals.goals.responses[2].value}>{goals.goals.responses[2].text}</option>
                        <option value={goals.goals.responses[3].value}>{goals.goals.responses[3].text}</option>
                        <option value={goals.goals.responses[4].value}>{goals.goals.responses[4].text}</option>
                      </select>
                    </label>
                  </div>
                </form>
                <Alert text="This will turn off all recommendations" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Goals