import React, {Component} from 'react'
import { connect } from 'react-redux';

class MonthStatisticsPanel extends Component {

    constructor(props){
        super(props);
        this.state = { 
          workouts: this.props.workouts, 
          presentMonth : new Date().getMonth(),
          presentYear : new Date().getFullYear(),
          allWorkoutsThisMonth: [],
          statisticDistaceTotal : 0,
          statisticSetTotal : 0,
          statisticRepsTotal : 0,
          statisticWeightTotal : 0,
        };

        this.calculateTotals = this.calculateTotals.bind(this);
    }

    calculateCalories(){
        // TODO
    }
    
    calculateTotals(){
        var distanceTotal = 0;
        var totalSets = 0;
        var totalReps = 0;
        var weightTotal = 0;

        for(var i = 0; i < this.state.allWorkoutsThisMonth.length; i++){
          for( var j = 0; j < this.state.allWorkoutsThisMonth[i].length; j++){
            var temp = this.state.allWorkoutsThisMonth[i][j];
            for(var k = 0; k < temp.length; k++){
              var tempWorkout = temp[k];
              if(tempWorkout.mode == 'Running'){
                for(var l = 0; l < tempWorkout.exercises.length; l++){
                  var tempRun =tempWorkout.exercises[l];
                  distanceTotal += parseFloat(tempRun.distance);
                }
              }else if(tempWorkout.mode == 'Weight Training'){
                for(var m = 0; m < tempWorkout.exercises.length; m++){
                  var tempLift =tempWorkout.exercises[m];
                  if(tempLift.sets){
                    totalSets += parseFloat(tempLift.sets);
                  }
                  if(tempLift.reps){
                    totalReps += parseFloat(tempLift.reps);
                  }

                  if(tempLift.intensity && tempLift.intensity.weight)
                  {
                    weightTotal += tempLift.intensity.weight;
                  }
                }
              }
            }
          }
        }

        this.setState({

          statisticDistaceTotal: distanceTotal,
          statisticSetTotal: totalSets,
          statisticRepsTotal: totalReps,
          statisticWeightTotal: weightTotal
        })
    }
    

    calculateVolumeLoad(){
        //TODO
    }

    calculateDuration(){
        //TODO
    }

    //get everyworkout for the month by week 
    componentDidMount(){

      console.log(this.props.weekArray);
      fetch(this.props.trainingPlans).then(res => {

        console.log(this.props.trainingPlans);


        var workoutsByWeek = [];
        //for each week
        for(var i = 0; i < this.props.weekArray.length; i++){

          var thisWeeksWorkouts = [];

          //for each day of week
          for(var t = 0; t < this.props.weekArray[i].length; t++){

            if(this.props.weekArray[i][t] !=='X'){
              var currentDay = this.props.weekArray[i][t];
              var WorkoutDay =  new Date(this.props.year,this.props.month,currentDay);
              var associatedTrainingPlans = this.props.trainingPlans.data.filter( (plan) => (Date.parse(plan.startDate) <= WorkoutDay && Date.parse(plan.endDate) >= WorkoutDay))
              var DayOfWeek = parseInt(WorkoutDay.getDay());
              var buttonWorkouts = new Array();
              for(var j = 0; j < associatedTrainingPlans.length; j++){
                  buttonWorkouts = buttonWorkouts.concat(associatedTrainingPlans[j].workouts)
                  var tempsToFilter = this.props.workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(DayOfWeek));
                  thisWeeksWorkouts.push(tempsToFilter);       
              }
            }
          }
          workoutsByWeek.push(thisWeeksWorkouts); 
        }
        this.setState({

          allWorkoutsThisMonth: workoutsByWeek
        })

      }).then( res => {
        console.log(this.state.allWorkoutsThisMonth)
        this.calculateTotals();
      })

    }

    render(){
            return(
                <div>
                  <h2 className="display-4 mb-4"  >This Month's Stats:</h2>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <h5>Cardio: </h5>
                      <ul>
                        <li><b>Total Miles:</b> {this.state.statisticDistaceTotal}</li>
                        <li><b>Longest Distance:</b> xxx</li>
                        <li><b>Shortest Distance:</b> xxx</li>
                        <li><b>Average Distance:</b> xxx</li>
                        <li><b>Number of Runs:</b> xxx</li>
                      </ul>
                    </li>
                    <li class="list-group-item">
                      <h5>Strength: </h5>
                      <ul>
                        <li><b>Total Reps:</b> {this.state.statisticRepsTotal}</li>
                        <li><b>Total Sets:</b> {this.state.statisticSetTotal}</li>
                        <li><b>Total Weight:</b> {this.state.statisticWeightTotal}</li>

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
  return { days: state.days,
           weekDay: state.weekDay, 
           month:state.month, 
           year:state.year, 
           workouts:state.workouts
          }
}

export default connect(mapStateToProps)(MonthStatisticsPanel);