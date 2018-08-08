import React, {Component} from 'react'
import { connect } from 'react-redux';

const Months = ['Jan', ' Feb', ' Mar', ' Apr', ' May', ' Jun', ' Jul', ' Aug', ' Sept',' Oct', ' Nov', ' Dec'];

class MonthStatisticsPanel extends Component {

    render(){
            return(
                <div>
                  <h2 className="display-4 mb-4">Stats for {Months[this.props.month] + " " + this.props.year}</h2>      
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <h5>Cardio: </h5>
                      <ul>
                        <li><b>Total Miles:</b>       {this.props.monthStatistics.distanceTotal}</li>
                        <li><b>Longest Distance:</b>  {this.props.monthStatistics.longestRun}</li>
                        <li><b>Shortest Distance:</b> {this.props.monthStatistics.shortestRun}</li>
                        <li><b>Average Distance:</b>  {this.props.monthStatistics.averageRun}</li>
                        <li><b>Number of Runs:</b>    {this.props.monthStatistics.runCount}</li>
                      </ul>
                    </li>
                    <li class="list-group-item">
                      <h5>Strength: </h5>
                      <ul>
                        <li><b>Total Reps:</b> </li>
                        <li><b>Total Sets:</b> </li>
                        <li><b>Total Weight:</b></li>

                        <br/>                        
                        <li><b>Most Frequent Exercises:</b></li>
                        <li><b>Exercise 1:</b> Name count</li>
                        <li><b>Exercise 2:</b> Name count</li>
                        <li><b>Exercise 3:</b> Name count</li>
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
           monthStatistics: state.monthStatistics,
          }
}

export default connect(mapStateToProps)(MonthStatisticsPanel);