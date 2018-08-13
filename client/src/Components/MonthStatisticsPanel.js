import React, {Component} from 'react'
import { connect } from 'react-redux';

const Months = ['Jan', ' Feb', ' Mar', ' Apr', ' May', ' Jun', ' Jul', ' Aug', ' Sept',' Oct', ' Nov', ' Dec'];

class MonthStatisticsPanel extends Component {

    render(){      
      var myArray = [];
      
      for(var key in this.props.monthStatistics.strengthDictionary)
      {
        myArray.push( [ key, this.props.monthStatistics.strengthDictionary[key]])
      }

      return(
        <div>
          <h2 className="display-4 mb-4">Stats for {Months[this.props.month] + " " + this.props.year}</h2>      
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h5>Cardio: </h5>
              <h6>Running: </h6>
              <ul>
                <li><b>Total Miles:</b> {this.props.monthStatistics.runDistanceTotal}</li>
                <li><b>Longest Distance:</b> {this.props.monthStatistics.longestRun}</li>
                <li><b>Shortest Distance:</b> {this.props.monthStatistics.shortestRun}</li>
                <li><b>Average Distance:</b> {this.props.monthStatistics.averageRun}</li>
                <li><b>Number of Runs:</b> {this.props.monthStatistics.runCount}</li>
                <li><b>Calories:</b> {this.props.monthStatistics.runCalories}</li>
              </ul>
              <h6>Swimming: </h6>
              <ul>
                <li><b>Total Miles:</b> {this.props.monthStatistics.swimDistanceTotal}</li>
                <li><b>Longest Distance:</b> {this.props.monthStatistics.longestSwim}</li>
                <li><b>Shortest Distance:</b> {this.props.monthStatistics.shortestSwim}</li>
                <li><b>Average Distance:</b> {this.props.monthStatistics.averageSwim}</li>
                <li><b>Number of Swims:</b> {this.props.monthStatistics.swimCount}</li>
                <li><b>Calories:</b> {this.props.monthStatistics.swimCalories}</li>
              </ul>
              <h6>Cycling: </h6>
              <ul>
                <li><b>Total Miles:</b> {this.props.monthStatistics.rideDistanceTotal}</li>
                <li><b>Longest Distance:</b> {this.props.monthStatistics.longestRide}</li>
                <li><b>Shortest Distance:</b> {this.props.monthStatistics.shortestRide}</li>
                <li><b>Average Distance:</b> {this.props.monthStatistics.averageRide}</li>
                <li><b>Number of Rides:</b> {this.props.monthStatistics.cycleCount}</li>
                <li><b>Calories:</b> {this.props.monthStatistics.rideCalories}</li>
              </ul>
            </li>
            <li className="list-group-item">
              <h5>Strength: </h5>
              <ul>
                <li><b>Total Reps:</b> {this.props.monthStatistics.totalReps} </li>
                <li><b>Total Sets:</b> {this.props.monthStatistics.totalSets} </li>
                <li><b>Total Weight:</b> {this.props.monthStatistics.totalWeight}</li>
                <li><b>Calories:</b> {this.props.monthStatistics.strengthCalories}</li>
                <br/>                        
                <li><b>Exercise Frequency:</b></li>
                { myArray.map( (exercise, index)=> <li key={index}><b>{exercise[0]}: </b>{exercise[1]} </li>) }
              </ul>
            </li>
          </ul>
          <br/>
          <br/>
        </div>
      )
    }
}

const mapStateToProps = function(state) {
  return { month:state.month, 
           year:state.year, 
           monthStatistics: state.monthStatistics
          }
}

export default connect(mapStateToProps)(MonthStatisticsPanel);