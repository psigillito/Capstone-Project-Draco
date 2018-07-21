import React from 'react'
import { Button, FormControl, FormGroup, Checkbox, ControlLabel, HelpBlock } from 'react-bootstrap'
import * as goalsJCR from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'
import Alert from './Alert';
import FieldGroup from './FieldGroup';
import { parse } from 'path';

var healthAreas = [];
var loseWeight = {};
var fitnessAreas = [];
var warningShown = false;

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { goals: { primaryGoal: 1 } }, value: 1, showWarning: false };
    this.handlePrimaryGoalChange = this.handlePrimaryGoalChange.bind(this);
    this.handleSportsChange = this.handleSportsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  showAlert() {
    this.setState({ showWarning: true });
  }

  handlePrimaryGoalChange(event) {
    this.setState({ user: { goals: { primaryGoal: parseInt(event.target.value, 10) } } });
  }

  handleImproveHealthChange(event) {
    console.log(event.target.value);
    var index = healthAreas.indexOf(event.target.value);
    if (index > -1) {
      // element is already in the array
      healthAreas.splice(index, 1);
    } else {
      healthAreas.push(event.target.value);
    }
    console.log("The array contains: " + healthAreas);
  }

  handleWeightLossChange(event) {
    console.log(event.target.value);
    console.log(event.target.id);
    switch (event.target.id) {
      case "formControlsCurrentWeight":
        loseWeight['currentWeight'] = parseInt(event.target.value);
        break;
      case "formControlsGoalWeight":
        loseWeight['goalWeight'] = parseInt(event.target.value);
        break;
      case "formControlsTimeframe":
        loseWeight['timeframe'] = parseInt(event.target.value);
        break;
      case "autoSelectCheckbox": 
        loseWeight['autoSelect'] = event.target.checked;
    }
    
    console.log("The object contains: " + JSON.stringify(loseWeight));
  }

  handleFitnessChange(event) {
    console.log(event.target.value);
    var index = fitnessAreas.indexOf(event.target.value);
    if (index > -1) {
      // element is already in the array
      fitnessAreas.splice(index, 1);
    } else {
      fitnessAreas.push(event.target.value);
    }
    console.log("The array contains: " + fitnessAreas);
  }

  handleSportsChange(event) {
    this.setState({ user: { goals: { primaryGoal: 4, sport: parseInt(event.target.value, 10) } } });
  }

  handleSubmit(event) {
    switch (this.state.user.goals.primaryGoal) {
      case 1:
        this.setState({ user: { goals: { primaryGoal: 1, health: healthAreas }}});
        console.log("Improving Health");
        break;
      case 2:
        console.log("Lose Weight");
        this.setState({ user: { goals: { primaryGoal: 2, loseWeight: { "currentWeight": loseWeight.currentWeight, "goalWeight": loseWeight.goalWeight, "time": loseWeight.timeframe, "autoSelectTime": loseWeight.autoSelect } } } });
        break;
      case 3:
        console.log("Improve fitness");
        this.setState({ user: { goals: { primaryGoal: 3, fitness: fitnessAreas }}});
        break;
      case 4:
        console.log("Sports performance");
        if (!this.state.user.goals.sport) {
          this.setState({ user: { goals: { primaryGoal: 4, sport: 1 }}});
        }
        break;
      case 5:
        if (!warningShown) {
          this.showAlert();
        }
        break;
      default:
        console.log("This shouldn't get executed!");
    }
    //POST to the DB
    event.preventDefault();
    //Navigate Home
  }

  render() {
    const jsxResponses = goalsJCR.goals.responses.map((response) => <option value={response.value}>{response.text}</option>);
    const improveHealthResponses = goalsJCR.improveHealth.responses.map((response) => <Checkbox value={response.value}>{response.text}</Checkbox>);
    const improveFitnessResponses = goalsJCR.improveFitness.responses.map((response) => <Checkbox value={response.value}>{response.text}</Checkbox>);
    const improveSportsResponses = goalsJCR.sportPerformance.responses.map((response) => <option value={response.value}>{response.text}</option>);
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
              <br />
              <Alert warn={this.state.showWarning} text={warnText} />
            </div>
          </div>
          {this.state.user.goals.primaryGoal === 1 &&
            <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead text-center">{goalsJCR.improveHealth.question}</p>
                <form>
                  <FormGroup onChange={this.handleImproveHealthChange}>
                    {improveHealthResponses}
                  </FormGroup>
                </form>
              </div>
            </div>
          }
          {this.state.user.goals.primaryGoal === 2 &&
          <div>
            <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead text-center">{goalsJCR.loseWeight.question}</p>
                <form>
                  <FormGroup onChange={this.handleWeightLossChange}>
                    <FieldGroup
                      id="formControlsCurrentWeight"
                      type="number"
                      placeholder="lbs"
                    />
                  </FormGroup>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead text-center">{goalsJCR.loseWeight.followUp[0].question}</p>
                <form>
                  <FormGroup onChange={this.handleWeightLossChange}>
                    <FieldGroup
                      id="formControlsGoalWeight"
                      type="number"
                      placeholder="lbs"
                    />
                  </FormGroup>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead text-center">{goalsJCR.loseWeight.followUp[1].question}</p>
                <form>
                  <FormGroup onChange={this.handleWeightLossChange}>
                    <FieldGroup
                      id="formControlsTimeframe"
                      type="number"
                      label="Enter the number of weeks:"
                      placeholder="1"
                    />
                  </FormGroup>
                  <Checkbox id="autoSelectCheckbox" onChange={this.handleWeightLossChange} value={goalsJCR.loseWeight.followUp[1].responses[0].value}>{goalsJCR.loseWeight.followUp[1].responses[0].text}</Checkbox>
                </form>
              </div>
            </div>
          </div>
          }
          {this.state.user.goals.primaryGoal === 3 &&
            <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead text-center">{goalsJCR.improveFitness.question}</p>
                <form>
                  <FormGroup onChange={this.handleFitnessChange}>
                    {improveFitnessResponses}
                  </FormGroup>
                </form>
              </div>
            </div>
          }
          {this.state.user.goals.primaryGoal === 4 &&
            <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead text-center">{goalsJCR.sportPerformance.question}</p>
                <form>
                  <FormControl componentClass="select" onChange={this.handleSportsChange}>
                    {improveSportsResponses}
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