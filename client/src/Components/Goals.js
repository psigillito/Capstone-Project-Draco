import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import * as goalsJCR from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'
import Alert from './Alert';
import FieldGroup from './FieldGroup';
import NumericValidation from './NumericValidation';

var healthAreas = [];
var loseWeight = {};
var fitnessAreas = [];
var warningShown = false;

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { goals: { primaryGoal: 1 } }, validationState: {sunday: null, monday: null, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null}, showWarning: false };
    this.handlePrimaryGoalChange = this.handlePrimaryGoalChange.bind(this);
    this.handleSportsChange = this.handleSportsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.handleHoursPerDayChange = this.handleHoursPerDayChange.bind(this);
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
        loseWeight['currentWeight'] = parseInt(event.target.value, 10);
        break;
      case "formControlsGoalWeight":
        loseWeight['goalWeight'] = parseInt(event.target.value, 10);
        break;
      case "formControlsTimeframe":
        loseWeight['timeframe'] = parseInt(event.target.value, 10);
        break;
      case "autoSelectCheckbox": 
        loseWeight['autoSelect'] = event.target.checked;
        break;
      default:
        // to get rid of the console warning :)
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

  handleHoursPerDayChange(event) {
    //console.log(event.target.value);
    var numHours = parseInt(event.target.value, 10);
    //console.log(numHours);
    var dayOfWeek = "";
    var returnObj = JSON.parse(JSON.stringify(this.state));
    if (event.target.id.indexOf("Sunday") > -1) {
      dayOfWeek = "sunday";
    }
    else if (event.target.id.indexOf("Monday") > -1) {
      dayOfWeek = "monday";
    }
    else if (event.target.id.indexOf("Tuesday") > -1) {
      dayOfWeek = "tuesday";
    }
    else if (event.target.id.indexOf("Wednesday") > -1) {
      dayOfWeek = "wednesday";
    }
    else if (event.target.id.indexOf("Thursday") > -1) {
      dayOfWeek = "thursday";
    }
    else if (event.target.id.indexOf("Friday") > -1) {
      dayOfWeek = "friday";
    }
    else if (event.target.id.indexOf("Saturday") > -1) {
      dayOfWeek = "saturday";
    }
    //console.log(dayOfWeek);
    if (numHours > 0 && numHours <= 24) {
      returnObj['validationState'][dayOfWeek] = true;
    } else {
      returnObj['validationState'][dayOfWeek] = false;
    }

    this.setState(returnObj);
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
    const daysPerWeek = [1, 2, 3, 4, 5, 6, 7].map((day) => <option value={day}>{day}</option>);
    const jsxResponses = goalsJCR.goals.responses.map((response) => <option value={response.value}>{response.text}</option>);
  const improveHealthResponses = goalsJCR.improveHealth.responses.map((response) => <FormGroup check><Input type="checkbox" value={response.value} />{' '}{response.text}</FormGroup>);
    const improveFitnessResponses = goalsJCR.improveFitness.responses.map((response) => <FormGroup check><Input type="checkbox" value={response.value} />{' '}{response.text}</FormGroup>);
    const improveSportsResponses = goalsJCR.sportPerformance.responses.map((response) => <option value={response.value}>{response.text}</option>);
    const title = "Exercise Goals";
    const btnText = "Submit";
    const warnText = "This will turn off all recommendations. Click " + btnText + " to continue";
    const helpText = "Please enter a number between 0 and 24";
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">{title}</h1>
              <p className="lead text-center">{goalsJCR.goals.question}</p>
              <form onSubmit={this.handleSubmit}>
                <Input type="select" onChange={this.handlePrimaryGoalChange}>
                  {jsxResponses}
                </Input>
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
                    <FormGroup>
                      <Input type="checkbox" id="autoSelectCheckbox" onChange={this.handleWeightLossChange} value={goalsJCR.loseWeight.followUp[1].responses[0].value} />{' '}{goalsJCR.loseWeight.followUp[1].responses[0].text}
                    </FormGroup>
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
                  <Input type="select" onChange={this.handleSportsChange}>
                    {improveSportsResponses}
                  </Input>
                </form>
              </div>
            </div>
          }
          <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead text-center">{logistics.daysPerWeek.question}</p>
                <form>
                  <Input type="select" onChange={this.handleDaysPerWeekChange}>
                    {daysPerWeek}
                  </Input>
                </form>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead text-center">{logistics.hoursPerDay.question}</p>
                <Form>
                  <NumericValidation id="frmCntrlSunday" validationState={this.state.validationState.sunday} label="Sunday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlMonday" validationState={this.state.validationState.monday} label="Monday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlTuesday" validationState={this.state.validationState.tuesday} label="Tuesday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlWednesday" validationState={this.state.validationState.wednesday} label="Wednesday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlThursday" validationState={this.state.validationState.thursday} label="Thursday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlFriday" validationState={this.state.validationState.friday} label="Friday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlSaturday" validationState={this.state.validationState.saturday} label="Saturday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                </Form>
              </div>
            </div>
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