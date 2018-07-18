import React, { Component } from 'react'
import * as goals from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'
import Modal from './Modal';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1, showWarning: false };
    this.responses = props.responses; 

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  showAlert() {
    this.setState({showWarning: true});
  }

  handleChange(event) {
    this.setState({ value: parseInt(event.target.value, 10) });
  }

  generateForm() {
    const jsxResponses = this.responses.map((response) => <option value={response.value}>{response.text}</option>);
    return (
      <div class="modal-body" id="myModal">
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label>
              {goals.goals.question}
              <select class="form-control" onChange={this.handleChange}>
                {jsxResponses}
              </select>
            </label>
          </div>
        </form>
      </div>
    );
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
        break;
      default:
        console.log("This shouldn't get executed!");
    }
    event.preventDefault();
  }

  render() {
    //< SelectForm responses={this.responses} value={this.state.value} labelText={goals.goals.question} handleSubmit={this.handleSubmit} />} handleSubmit={this.handleSubmit} />
    return (
      <div>
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Launch demo modal</button>
        <Modal title="Exercise Goals" payload={this.generateForm()} warn={this.state.showWarning} warnText="This will turn off all recommendations" handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default Goals