function getMonthWeeks( year, month){

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


var dt = new Date();
const selectedYear = dt.getFullYear();
const selectedMonth = dt.getMonth();
const currentDay = dt.getDate();
const weekData = getMonthWeeks(selectedYear, selectedMonth);
const selectedDayVisible = true;
const userName = '';
const getMonthDays = ( year, month) => {
    getMonthWeeks( year, month)}

const currentTrainingPlans = { data: []};
const currentWorkouts = { data: []};



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
    currentWorkouts
}