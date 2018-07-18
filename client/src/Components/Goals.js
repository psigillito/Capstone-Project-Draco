import React from 'react'
import { Button, FormControl } from 'react-bootstrap'
import * as goals from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'
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
    this.setState({ showWarning: true });
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
    const title = "Exercise Goals";
    const btnText = "Submit";
    const warnText = "This will turn off all recommendations. Click " + btnText + " to continue";
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">{title}</h1>
              <p className="lead text-center">{goals.goals.question}</p>
              <form onSubmit={this.handleSubmit}>
                <FormControl componentClass="select" onChange={this.handleChange}>
                    {jsxResponses}
                </FormControl>
              </form>
              <br/>
              <Alert warn={this.state.showWarning} text={warnText} />
            </div>
          </div>
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