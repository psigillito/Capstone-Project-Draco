const Days = ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const Months = ['January', 'February', 'March', 'April', 'May',
                'June', 'July', 'August', 'September',
                'October', 'November', 'December'
                ];

function getMonthWeeks( year, month){

    var d = new Date();
    
    var newDate = new Date(year, month, 1);
    var startWeekDay = newDate.getDay(); 

    var numberOfDays = new Date(year, (month+2)%13, 0).getDate();
    var numberOfDaysThisMonth = new Date(year, month, 0).getDate();

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
            }else if(counter > numberOfDaysThisMonth){
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

const selectedYear = 2018;
const selectedMonth = 0;
const weekData = getMonthWeeks(selectedYear, selectedMonth);
const selectedDayVisible = true;

const getMonthDays = ( year, month) => {
    getMonthWeeks( year, month)}

//export default weekData
module.exports =    {
    weekData,
    selectedYear,
    selectedMonth,
    getMonthWeeks,
    selectedDayVisible
}

