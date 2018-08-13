import React from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import { Redirect } from 'react-router'
import * as goalsJCR from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'
import Alert from './Alert';
import FieldGroup from './FieldGroup';
import NumericValidation from './NumericValidation';
import axios from 'axios';

var healthAreas = [];
var loseWeight = {};
var fitnessAreas = [];
var warningShown = false;

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { goals: { primaryGoal: 1 } }, validationState: {sunday: null, monday: null, tuesday: null, wednesday: null, thursday: null, friday: null, saturday: null}, showWarning: false, toHome: false };
    this.handlePrimaryGoalChange = this.handlePrimaryGoalChange.bind(this);
    this.handleSportsChange = this.handleSportsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.handleHoursPerDayChange = this.handleHoursPerDayChange.bind(this);
    this.handleDaysPerWeekChange = this.handleDaysPerWeekChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    //console.log(this.props.user);
  }

  showAlert() {
    this.setState({ showWarning: true });
    warningShown = true;
  }

  handlePrimaryGoalChange(event) {
    this.setState({ user: { goals: { primaryGoal: parseInt(event.target.value, 10) } } });
  }

  handleImproveHealthChange(event) {
    //console.log(event.target.value);
    var index = healthAreas.indexOf(event.target.value);
    if (index > -1) {
      // element is already in the array
      healthAreas.splice(index, 1);
    } else {
      healthAreas.push(event.target.value);
    }
    //console.log("The array contains: " + healthAreas);
  }

  handleWeightLossChange(event) {
    //console.log(event.target.value);
    //console.log(event.target.id);
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
    
    //console.log("The object contains: " + JSON.stringify(loseWeight));
  }

  handleFitnessChange(event) {
    //console.log(event.target.value);
    var index = fitnessAreas.indexOf(event.target.value);
    if (index > -1) {
      // element is already in the array
      fitnessAreas.splice(index, 1);
    } else {
      fitnessAreas.push(event.target.value);
    }
    //console.log("The array contains: " + fitnessAreas);
  }

  handleSportsChange(event) {
    this.setState({ user: { goals: { primaryGoal: 4, sport: parseInt(event.target.value, 10) } } });
  }

  handleDaysPerWeekChange(event) {
    var returnState = JSON.parse(JSON.stringify(this.state));
    if (returnState.user.logistics)
      returnState.user.logistics.daysPerWeek = event.target.value;
    else
      returnState.user.logistics = {daysPerWeek: event.target.value, hoursPerDay:[0, 0, 0, 0, 0, 0, 0]};
    this.setState(returnState);
  }

  handleHoursPerDayChange(event) {
    //console.log(event.target.value);
    var numHours = parseInt(event.target.value, 10);
    //console.log(numHours);
    var dayOfWeek = "";
    var numDay = 0;
    var returnObj = JSON.parse(JSON.stringify(this.state));
    if (!returnObj.user.logistics)
      returnObj.user.logistics = {daysPerWeek: 0, hoursPerDay:[0, 0, 0, 0, 0, 0, 0]};
    if (event.target.id.indexOf("Sunday") > -1) {
      dayOfWeek = "sunday";
      numDay = 0;
    }
    else if (event.target.id.indexOf("Monday") > -1) {
      dayOfWeek = "monday";
      numDay = 1;
    }
    else if (event.target.id.indexOf("Tuesday") > -1) {
      dayOfWeek = "tuesday";
      numDay = 2;
    }
    else if (event.target.id.indexOf("Wednesday") > -1) {
      dayOfWeek = "wednesday";
      numDay = 3;
    }
    else if (event.target.id.indexOf("Thursday") > -1) {
      dayOfWeek = "thursday";
      numDay = 4;
    }
    else if (event.target.id.indexOf("Friday") > -1) {
      dayOfWeek = "friday";
      numDay = 5;
    }
    else if (event.target.id.indexOf("Saturday") > -1) {
      dayOfWeek = "saturday";
      numDay = 6;
    }
    //console.log(dayOfWeek);
    if (numHours >= 0 && numHours <= 24) {
      returnObj['validationState'][dayOfWeek] = true;
      returnObj.user.logistics.hoursPerDay[numDay] = parseInt(event.target.value, 10);
    } else {
      returnObj['validationState'][dayOfWeek] = false;
    }

    this.setState(returnObj);
  }


  //validation for inputs not inside a form
  validateInput(){

    let errorsList = []

    //lose weight 
    if(this.state.user.goals.primaryGoal == 2){

      if(!document.getElementById("formControlsCurrentWeight").value){
        errorsList.push("Input for Current Weight Invalid");
      }

      if(!document.getElementById("formControlsGoalWeight").value){
        errorsList.push("Input for Goal Weight Invalid");
      }      
    }    

    if(!document.getElementById("daysPerWeek").value || document.getElementById("daysPerWeek").value < 0 ){
      errorsList.push("Input for daysPerWeek Invalid");
    }

    if(!document.getElementById("frmCntrlSunday").value || document.getElementById("frmCntrlSunday").value < 0 ){
      errorsList.push("Input for Sunday Invalid");
    }
    if(!document.getElementById("frmCntrlMonday").value || document.getElementById("frmCntrlMonday").value < 0 ){
      errorsList.push("Input for Monday Invalid");
    }
    if(!document.getElementById("frmCntrlTuesday").value || document.getElementById("frmCntrlTuesday").value < 0){
      errorsList.push("Input for Tuesday Invalid");
    }
    if(!document.getElementById("frmCntrlWednesday").value || document.getElementById("frmCntrlWednesday").value < 0){
      errorsList.push("Input for Thursday Invalid");
    }
    if(!document.getElementById("frmCntrlThursday").value || document.getElementById("frmCntrlThursday").value < 0){
      errorsList.push("Input for Friday Invalid");
    }
    if(!document.getElementById("frmCntrlFriday").value || document.getElementById("frmCntrlFriday").value < 0){
      errorsList.push("Input for Saturday Invalid");
    }
    if(!document.getElementById("frmCntrlSaturday").value || document.getElementById("frmCntrlSaturday").value < 0){
      errorsList.push("Input for Saturday Invalid");
    }

    var validationSummary = this.refs.validationSummary; 
    validationSummary.innerHTML = '';

    for(var i = 0; i < errorsList.length; i++){
      var message = document.createElement("div");
      message.className = "alert alert-danger";        
      var node = document.createTextNode(errorsList[i]);
      message.appendChild(node);
      validationSummary.appendChild(message);    
    }

    return (errorsList.length < 1);
  }


  handleSubmit(event) {

    if(this.validateInput()){

      var prevState = this.state;
      switch (this.state.user.goals.primaryGoal) {
        case 1:
          prevState.user.goals.primaryGoal = 1;
          prevState.user.goals.health = healthAreas;
          this.setState(prevState);
          break;
        case 2:
          prevState.user.goals.primaryGoal = 2;
          prevState.user.goals.loseWeight = { "currentWeight": loseWeight.currentWeight, "goalWeight": loseWeight.goalWeight, "time": loseWeight.timeframe, "autoSelectTime": loseWeight.autoSelect };
          this.setState(prevState);
          break;
        case 3:
          prevState.user.goals.primaryGoal = 3;
          prevState.user.goals.fitness = fitnessAreas;
          this.setState(prevState);
          break;
        case 4:
          if (typeof this.state.user.goals.sport === "undefined") {
            var newState = this.state;
            newState.user.goals = { primaryGoal: 4, sport: 1 };
            this.setState(newState);
          }
          break;
        case 5:
          if (!warningShown) {
            //console.log("The value of warningShow is: " + warningShown);
            this.showAlert();
            return;
          }
          break;
        default:
      }
      //POST to the DB
      axios.patch('/users/' + this.props.user, {
        goals: {
          primaryGoal: this.state.user.goals.primaryGoal,
          health: (typeof (this.state.user.goals.health) !== "undefined") ? this.state.user.goals.health : null,
          fitness: (typeof (this.state.user.goals.fitness) !== "undefined") ? this.state.user.goals.fitness : null,
          loseWeight: {
            currentWeight: (typeof (this.state.user.goals.loseWeight) !== "undefined") ? this.state.user.goals.loseWeight.currentWeight : null,
            goalWeight: (typeof (this.state.user.goals.loseWeight) !== "undefined") ? this.state.user.goals.loseWeight.goalWeight : null,
            time: (typeof (this.state.user.goals.loseWeight) !== "undefined") ? this.state.user.goals.loseWeight.time : null,
            autoSelectTime: (typeof (this.state.user.goals.loseWeight) !== "undefined") ? this.state.user.goals.loseWeight.autoSelectTime : null
          },
          sport: (typeof (this.state.user.goals.sport) !== "undefined") ? this.state.user.goals.sport : null
        },
        logistics: {
          daysPerWeek: this.state.user.logistics.daysPerWeek,
          hoursPerDay: this.state.user.logistics.hoursPerDay
        }
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
      // Navigate Home
      this.setState({ toHome: true });
      event.preventDefault();
    }
    else
    {
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (this.state.toHome === true) {
      return (<Redirect to='/calendar' />);
    }
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
        <div className="warning-container" ref="validationSummary"></div>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4">{title}</h1>
              <p className="lead">{goalsJCR.goals.question}</p>
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
                <p className="lead">{goalsJCR.improveHealth.question}</p>
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
                  <p className="lead">{goalsJCR.loseWeight.question}</p>
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
                  <p className="lead">{goalsJCR.loseWeight.followUp[0].question}</p>
                  <form>
                    <FormGroup onChange={this.handleWeightLossChange}>
                      <FieldGroup
                        id="formControlsGoalWeight"
                        type="number"
                        placeholder="lbs"
                        min="0"
                      />
                    </FormGroup>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 m-auto">
                  <p className="lead">{goalsJCR.loseWeight.followUp[1].question}</p>
                  <form>
                    <FormGroup onChange={this.handleWeightLossChange}>
                      <FieldGroup
                        id="formControlsTimeframe"
                        type="number"
                        label="Enter the number of weeks:"
                        placeholder="1"
                        min="1"
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
                <p className="lead">{goalsJCR.improveFitness.question}</p>
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
                <p className="lead">{goalsJCR.sportPerformance.question}</p>
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
                <p className="lead">{logistics.daysPerWeek.question}</p>
                <form>
                  <Input id="daysPerWeek" type="select" onChange={this.handleDaysPerWeekChange}>
                    {daysPerWeek}
                  </Input>
                </form>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-md-8 m-auto">
                <p className="lead">{logistics.hoursPerDay.question}</p>
                <Form>
                  <NumericValidation id="frmCntrlSunday" min="0" validationState={this.state.validationState.sunday} label="Sunday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlMonday" min="0" validationState={this.state.validationState.monday} label="Monday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlTuesday" min="0" validationState={this.state.validationState.tuesday} label="Tuesday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlWednesday" min="0" validationState={this.state.validationState.wednesday} label="Wednesday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlThursday" min="0" validationState={this.state.validationState.thursday} label="Thursday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlFriday" min="0" validationState={this.state.validationState.friday} label="Friday" onChange={this.handleHoursPerDayChange} help={helpText}/>
                  <NumericValidation id="frmCntrlSaturday" min="0" validationState={this.state.validationState.saturday} label="Saturday" onChange={this.handleHoursPerDayChange} help={helpText}/>
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