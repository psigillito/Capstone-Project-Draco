import React, { Component } from 'react'
import {Modal} from 'react-bootstrap'
import * as goals from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'
import Overlay from './Modal';
import Alert from './Alert';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, value: 1, showWarning: false };
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
    const jsxResponses = this.responses.map((response) => <option value={response.value}>{response.text}</option>);
    const modalTitle = "Exercise Goals";
    const modalId = "exerciseGoalModal";
    return (
        <Overlay title={modalTitle} handleSubmit={this.handleSubmit}>
        <div className="modal-body" id={modalId}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              {goals.goals.question}
              <select className="form-control" onChange={this.handleChange}>
                {jsxResponses}
              </select>
            </label>
          </div>
        </form>
        <Alert warn={this.state.showWarning} text="This will turn off all recommendations" />
      </div>
        </ Overlay>
    );
  }
}

export default Goals