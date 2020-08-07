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

    if(localStorage.getItem(key) != null){ 
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

    return yearStr + monthStr + dateStr;
}

function updateCalender(year, month){

    var startWeekNumber = new Date(year, month, 1).getDay(); 
    var DaysInThisMonth = new Date(year, month + 1, 0).getDate();

    document.querySelector('tbody').innerHTML = "";

    let date = 1;
 

    for(let i = 0; i < 6; i++){ 

    let tr = document.createElement('tr');
    for(let j = 0 ; j < 7; j++){
        if(date > DaysInThisMonth) break;
        let td = document.createElement('td');

        if(j < startWeekNumber && date == 1){
            let p = document.createElement('p');
            p,innerText = '';
            td.appendChild(p);
        }
        else{
            let p = document.createElement('p');
            p.innerText = date;
            td.appendChild(p);
            date++;
        }

        td.setAttribute('data-toggle', 'modal');
        td.setAttribute('data-target', '#exampleModal');
        

        let key = getLocalStorageKey(currentYear, currentMonth, date - 1)
        td.setAttribute('id', key);

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
                modifyBtn.setAttribute('data-toggle', 'modal');
                modifyBtn.setAttribute('data-target', '#exampleModal2');
                // delete button function
                cancelBtn.addEventListener('click', function(e){
                    let confirmToDelete = confirm("Cancel This Event ? ");
                    if(confirmToDelete){
                        
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

                modifyBtn.addEventListener('click', function(e){
                    currentDate = this.parentElement.parentElement.querySelector('p').innerText;
                    console.log(currentDate);
                    let newTitle = prompt('Please Enter New Title');
                    let newDetail = prompt('Please Enter New Detail');
                    let index = eventArray.indexOf(event);
                    eventArray[index] = {Title:newTitle, Detail:newDetail, Key:key,};
                    console.log(eventArray);
                    localStorage.setItem(key, JSON.stringify(eventArray));
                    updateCalender(currentYear, currentMonth); 
                    
                    e.stopPropagation();
                });

                div.appendChild(span);
                div.appendChild(modifyBtn);
                div.appendChild(cancelBtn);

                td.appendChild(div);
            });
        }

        td.addEventListener('click', (e) => {
            if(td.querySelector('p').innerText){
                currentDate = td.querySelector('p').innerText;
            }
            else{
                currentDate = null;
            }
            //console.log(currentDate);

        });
        tr.appendChild(td);
    }
        document.querySelector('tbody').appendChild(tr);
    }
    document.getElementById('year').innerText = year;
    document.getElementById('month').innerText = month + 1;
}