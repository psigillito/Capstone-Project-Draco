import React, {Component} from 'react'
import * as goals from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'

class Goals extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      // POST the data to Mongo
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
                    <option value="{goals.goals.responses[0].value}">{goals.goals.responses[0].text}</option>
                    <option value="{goals.goals.responses[1].value}">{goals.goals.responses[1].text}</option>
                    <option value="{goals.goals.responses[2].value}">{goals.goals.responses[2].text}</option>
                    <option value="{goals.goals.responses[3].value}">{goals.goals.responses[3].text}</option>
                    <option value="{goals.goals.responses[4].value}">{goals.goals.responses[4].text}</option>
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