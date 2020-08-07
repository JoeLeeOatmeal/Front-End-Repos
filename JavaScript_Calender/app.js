// Initialization
var now = new Date();
var currentYear = now.getFullYear();
var currentMonth = now.getMonth();
var currentDate = 0;

updateCalender(currentYear, currentMonth);

//Event Listeners //
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
// 按下 modal 加入行事按鈕之後
document.querySelector('#exampleModal #add').addEventListener('click', function(e){
    let title = this.parentElement.parentElement.querySelector('.form-group #title').value;
    let detail = this.parentElement.parentElement.querySelector('.form-group #detail').value;
    let key = getLocalStorageKey(currentYear, currentMonth, currentDate);

    // store into local storage
    updateLocalStorage(key, title, detail);
    updateCalender(currentYear, currentMonth);
});


//Functions
function updateLocalStorage(key, title, detail){

    let item = [
        {
            Title : title,
            Detail : detail,
            Key : key,
        }
    ]

    if(localStorage.getItem(key) != null){ // 如果 local storage 存在這個 key 的話
        let originalArray = JSON.parse(localStorage.getItem(key));
        originalArray.push(item[0]);
        localStorage.setItem(key, JSON.stringify(originalArray));
    }
    else{
        localStorage.setItem(key, JSON.stringify(item));
    }
   
}


function getLocalStorageKey(year, month, date){
    let yearStr = year.toString();
    let monthStr = month.toString().padStart(2, '0');
    let dateStr = date.toString().padStart(2, '0');
    // console.log(yearStr, monthStr, dateStr);
    return yearStr + monthStr + dateStr;
}

function updateCalender(year, month){
    // console.log(year);
    // console.log(month);

    var startWeekNumber = new Date(year, month, 1).getDay(); // 抓出當年當月的1號是禮拜幾
    var DaysInThisMonth = new Date(year, month + 1, 0).getDate(); //抓出該月有幾天

    // 清空 tbody
    document.querySelector('tbody').innerHTML = "";

    let date = 1;
    // 建立日曆

    for(let i = 0; i < 6; i++){ // 一個月最多六周

    let tr = document.createElement('tr');
    for(let j = 0 ; j < 7; j++){
        if(date > DaysInThisMonth) break;
        let td = document.createElement('td');

        if(j < startWeekNumber && date == 1){
            td.innerText = '';
        }
        else{
            let p = document.createElement('p');
            p.innerText = date;
            td.appendChild(p);
            date++;
        }
        // set td toggle to modal
        td.setAttribute('data-toggle', 'modal');
        td.setAttribute('data-target', '#exampleModal');
        let key = getLocalStorageKey(currentYear, currentMonth, date - 1)
        td.setAttribute('id', key);

        // 把 Local Storage 裡面 id 相符的資料全部拉出來顯示在 td 裡面
        let eventArray = JSON.parse(localStorage.getItem(key));

        // console.log(eventArray);
        if(eventArray){
            eventArray.forEach(event => {
                let div = document.createElement('div');
                let span = document.createElement('span');
                span.classList.add('title');
                

                let modifyBtn = document.createElement('button');
                modifyBtn.classList.add('modify');

                let cancelBtn = document.createElement('button');
                cancelBtn.classList.add('cnacel');

                span.innerText = event.Title;
                modifyBtn.innerHTML = '<i class="fas fa-pen"></i>';
                cancelBtn.innerHTML = '<i class="fas fa-trash"></i>';

                cancelBtn.addEventListener('click', function(e){
                    let a = confirm("Cancel This Event ? ");
                    // 剩下一個東西的時候刪不掉
                    if(a){
                        
                        let index = eventArray.indexOf(event);
                        if(eventArray.length == 1) localStorage.removeItem(key);

                        else{
                            eventArray.splice(index, 1);
                            localStorage.setItem(key, JSON.stringify(eventArray));
                        }
                        updateCalender(currentYear, currentMonth);
                    }
                    e.stopPropagation();
                });


                div.appendChild(span);
                div.appendChild(modifyBtn);
                div.appendChild(cancelBtn);

                td.appendChild(div);
            });
        }
        

        td.addEventListener('click', () => {
            currentDate = td.querySelector('p').innerText;
            //console.log(currentDate);
        });
        tr.appendChild(td);
    }
        document.querySelector('tbody').appendChild(tr);
    }
    document.getElementById('year').innerText = year;
    document.getElementById('month').innerText = month + 1;
}