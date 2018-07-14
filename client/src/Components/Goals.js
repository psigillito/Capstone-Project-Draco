import React, {Component} from 'react'
import * as goals from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'

class Goals extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 1};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: parseInt(event.target.value, 10)});
    }
  
    handleSubmit(event) {
      switch(this.state.value) {
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
          alert("This will turn off all recommendations");
          break;
        default:
          console.log("This shouldn't get executed!");
      }
      event.preventDefault();
    }
  
    render() {
      return (
        <div class="container-fluid">
        <div class="row">
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
            <input class="btn btn-primary" type="submit" value="Submit" />
        </form>
        </div>
      </div>
        
      );
    }
  }

  export default Goals