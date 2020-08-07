// initialization
var now = new Date();
var currentYear = now.getFullYear();
var currentMonth = now.getMonth();
updateCalender(currentYear, currentMonth);

//event listeners //
document.querySelectorAll('.info button')[0].addEventListener('click', () =>{
    
    if(currentMonth == 0) {
        currentMonth = 11;
        currentYear -= 1;
    }
    else currentMonth -= 1;

    updateCalender(currentYear, currentMonth);
});

document.querySelectorAll('.info button')[1].addEventListener('click', () =>{
    
    if(currentMonth == 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    else currentMonth += 1;

    updateCalender(currentYear, currentMonth);
});


//functions
function updateCalender(year, month){
    // console.log(year);
    // console.log(month);

    var startWeekNumber = new Date(year, month, 1).getDay(); // 抓出當年當月的1號是禮拜幾
    var DaysInThisMonth = new Date(year, month + 1, 0).getDate(); //抓出該月有幾天

    // 清空 tbody
    document.querySelector('tbody').innerHTML = "";

    let date = 1;
    // 建立一開始的日曆
    for(let i = 0; i < 6; i++){ // 一個月最多六周

    let tr = document.createElement('tr');
    for(let j = 0 ; j < 7; j++){
        if(date > DaysInThisMonth) break;
        let td = document.createElement('td');

        if(j < startWeekNumber && date == 1){
            td.innerText = '';
        }
        else{
            td.innerText = date;
            date++;
        }
        tr.appendChild(td);
    }
        document.querySelector('tbody').appendChild(tr);
    }
    document.getElementById('year').innerText = year;
    document.getElementById('month').innerText = month + 1;
}