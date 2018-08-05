import React, {Component} from 'react'

class MonthStatisticsPanel extends Component {

    constructor(props){
        super(props);
        this.state = { workouts: this.props.workouts, month: this.props.month, year: this.props.year };
    }

    calculateCalories(){
        // TODO
    }
    
    calculateMileage(){
        //TODO
    }

    calculateVolumeLoad(){
        //TODO
    }

    calculateDuration(){
        //TODO
    }

    render(){

            return(
                <div>
                    <h2 className="display-4 mb-4"  >This Month's Stats:</h2>
                    <div>Insert Statistics Here</div>
                </div>
            )
    }
}

export default MonthStatisticsPanel;