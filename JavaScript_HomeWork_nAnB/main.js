// 抓取 DOM
let startbtn = document.querySelector('#start');
let quitbtn = document.querySelector('#quit');
let showAnswerbtn = document.querySelector('#showAnswer');
let guessbtn = document.querySelector('#guess');
let body = document.querySelector('body');

let randomNumbers;

body.addEventListener('keydown', e => {
    switch(e.keyCode){
        case 13 : 
            guessbtn.click();
            break;
        case 83 : 
            startbtn.click();
            break;
        case 82 :
            quitbtn.click();
            break;
        case 65 :
            showAnswerbtn.click();
            break;
        
    }
})

// 按下開始(id:start)鈕，會產生四位亂數
startbtn.addEventListener('click', e => {
    enableButton();  // enable the buttons
    startbtn.disabled = true;  // disable startbtn
    
    randomNumbers = createRandomNumbers(); // create random numbers
    console.log(randomNumbers);
});

// 按下猜(id: guess)鈕，會在 record 新增一個紀錄，並且判斷作答狀況
guessbtn.addEventListener('click', e => {
    let userInputs = document.querySelector('#input').value;
    let inputArr = [];


    if(isNaN(+userInputs) || userInputs.length < 4){
        alert("Please fill the correct value !");
        // 清空 input 區域
        document.querySelector('#input').value = "";
    }
    else{
        inputArr = userInputs.split('');
        console.log(inputArr);
          // 判斷幾A幾B
        let result = getGuessResult(inputArr, randomNumbers);

        // 顯示猜的結果在 console 裡面
        // console.log(`Answer : ${randomNumbers}`);
        // console.log(result);

        let victory = result[0] == '4' ? true: false;

        // 在 HTML 裡面加入 result 和使用者輸入的數字
        addRecord(result, userInputs, victory);
        // 清空 input 區域
        document.querySelector('#input').value = "";

        if(victory) alert('You Win !');
    }

  
});

quitbtn.addEventListener('click', e => {
    //顯示現在猜不到的答案
    confirm(`ANSWER : ${randomNumbers}`);
    //產生新亂數
    randomNumbers = createRandomNumbers();
    //清空紀錄 
    let records = document.querySelectorAll('#records >div');
    records.forEach(record => record.remove());      
});

showAnswerbtn.addEventListener('click', e => {
    confirm(`ANSWER : ${randomNumbers}`);    
});

function addRecord(ABresult, text, victory){

    let records = document.querySelector('#records');
    let record = document.createElement('div');

    let ab = document.createElement('span');
    ab.innerHTML = ABresult;
    ab.style.background = victory == true ? 'green' : 'red';
    record.appendChild(ab);

    let txt = document.createElement('span');
    txt.innerHTML = text;
    record.appendChild(txt);

    records.appendChild(record);
}

function getGuessResult(guess, answer){
    let A = 0;
    let B = 0;

    for(let i = 0; i < 4; i++){
        if(answer.indexOf(+guess[i]) !== -1){
            if(answer.indexOf(+guess[i]) == i){
                A++;
            }
            else{
                B++;
            }
        }
    }
    // need to return a string
    return `${A}A ${B}B`;
}

function enableButton(){
    quitbtn.disabled = false;
    showAnswerbtn.disabled = false;
    guessbtn.disabled = false;
}

//產生四個不重複的 0 ~ 9 整數，並以陣列回傳
function createRandomNumbers(){
    let tempNums = [];
    let tempNum;

    for(let i = 0; i < 4; i++){
        do{
            tempNum = Math.floor(Math.random() * 10);

        }while(tempNums.indexOf(tempNum) !== -1)

        tempNums.push(tempNum);
    }
    return tempNums;
}