import React from 'react'
import { Button, FormControl } from 'react-bootstrap'
import * as goalsJCR from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'
import Alert from './Alert';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { goals: { primaryGoal: 1 } }, value: 1, showWarning: false };
    this.handlePrimaryGoalChange = this.handlePrimaryGoalChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  showAlert() {
    this.setState({ showWarning: true });
  }

  handlePrimaryGoalChange(event) {
    this.setState({ user: { goals: { primaryGoal: parseInt(event.target.value, 10) }}});
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
    const jsxResponses = goalsJCR.goals.responses.map((response) => <option value={response.value}>{response.text}</option>);
    const improveHealthResponses = goalsJCR.improveHealth.responses.map((response) => <option value={response.value}>{response.text}</option>);
    const title = "Exercise Goals";
    const btnText = "Submit";
    const warnText = "This will turn off all recommendations. Click " + btnText + " to continue";
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">{title}</h1>
              <p className="lead text-center">{goalsJCR.goals.question}</p>
              <form onSubmit={this.handleSubmit}>
                <FormControl componentClass="select" onChange={this.handlePrimaryGoalChange}>
                    {jsxResponses}
                </FormControl>
              </form>
              <br/>
              <Alert warn={this.state.showWarning} text={warnText} />
            </div>
          </div>
          {this.state.user.goals.primaryGoal === 1 &&
          <div className="row">
            <div className="col-md-8 m-auto">
              <p className="lead text-center">{goalsJCR.improveHealth.question}</p>
              <form>
                <FormControl componentClass="select" multiple onChange={this.handleImproveHealthChange}>
                  {improveHealthResponses}
                </FormControl>
              </form>
            </div>
          </div>
          }
          <br />
          <div className="row">
            <div className="col-md-8 m-auto text-center">
              <Button bsStyle="info" bsSize="large" onClick={this.handleSubmit}>{btnText}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Goals