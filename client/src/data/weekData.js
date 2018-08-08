function getMonthWeeks( month, year){

    var d = new Date();
    
    var newDate = new Date(year, month, 1);
    var startWeekDay = newDate.getDay(); 

    var numberOfDays = new Date(year, (month+1)%13, 0).getDate();

    var weekArray = []
    
    //date counter 
    var counter = 1;
    //for each week
    for(let i = 0; i < 6; i++){
       
        var aWeek = [];
    
        //for eachday
        for(let x = 0; x < 7; x++){
          
            //if day in previous month
            if(i == 0 && x < startWeekDay){
                aWeek[x] = 'X';
            //if day later than current
            }else if(counter > numberOfDays){
                aWeek[x] = 'X';
            }else{
                aWeek[x] = counter;
                counter++;
            }
        }
        weekArray.push(aWeek)
    }

    return weekArray;
} 

function getWorkoutsForMonth(month, year){


  return ['a'];

}

function getWorkoutsForMonth(month, year, trainingPlans, workouts){

  var workoutsByWeek = [];
  var monthWeeks = getMonthWeeks(month, year)

  //for each week of month
  for(var i = 0; i < monthWeeks.length; i++){

    var thisWeeksWorkouts = [];

    //iterate over each day of the week
    for(var t = 0; t < monthWeeks[i].length; t++){
      
      if(monthWeeks[i][t] !=='X'){
        var currentDay = monthWeeks[i][t];
        var WorkoutDay =  new Date(year, month, currentDay);
        var associatedTrainingPlans = trainingPlans.data.filter( (plan) => (Date.parse(plan.startDate) <= WorkoutDay && Date.parse(plan.endDate) >= WorkoutDay));
        var DayOfWeek = parseInt(WorkoutDay.getDay());
        var buttonWorkouts = new Array();
        for(var j = 0; j < associatedTrainingPlans.length; j++){
            buttonWorkouts = buttonWorkouts.concat(associatedTrainingPlans[j].workouts)
            var tempsToFilter = workouts.data.filter( (exercise) => exercise.daysOfWeek.includes(DayOfWeek));
            thisWeeksWorkouts.push(tempsToFilter);       
        }
      }
    }
    workoutsByWeek.push(thisWeeksWorkouts); 
  }

  return calculateTotals(workoutsByWeek);
}

function calculateTotals(allWorkoutsThisMonth){
  var distanceTotal = 0;
  var totalSets = 0;
  var totalReps = 0;
  var weightTotal = 0;

  var runCount = 0;
  var runsList=[];



  for(var i = 0; i < allWorkoutsThisMonth.length; i++){
    for( var j = 0; j < allWorkoutsThisMonth[i].length; j++){
      var temp = allWorkoutsThisMonth[i][j];
      for(var k = 0; k < temp.length; k++){
        var tempWorkout = temp[k];
        if(tempWorkout.mode == 'Running'){
          for(var l = 0; l < tempWorkout.exercises.length; l++){
            var tempRun =tempWorkout.exercises[l];
            runCount++;
            runsList.push(parseFloat(tempRun.distance));
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

  var shortestRun = Math.min(...runsList);
  var longestRun = Math.max(...runsList);

  var averageRun = distanceTotal / runCount;


  return {'distanceTotal' : distanceTotal,
          'totalSets' : totalSets, 
          'totalReps' : totalReps, 
          'weightTotal' : weightTotal, 
          'averageRun' : averageRun, 
          'shortestRun' : shortestRun, 
          'longestRun' : longestRun,
          'runCount' : runCount 
        }
}





























var dt = new Date();
const selectedYear = dt.getFullYear();
const selectedMonth = dt.getMonth();
const currentDay = dt.getDate();
const weekData = getMonthWeeks(selectedYear, selectedMonth);
const selectedDayVisible = true;
const userName = '';
const getMonthDays = ( year, month) => {
    getMonthWeeks( year, month)
}


const currentWorkouts = { data: []};
const currentTrainingPlans = { data: []};



//export default weekData
module.exports =    {
    weekData,
    selectedYear,
    selectedMonth,
    getMonthWeeks,
    selectedDayVisible,
    userName,
    currentTrainingPlans,
    currentDay,
    currentWorkouts,
    getWorkoutsForMonth,
    getMonthWeeks
}