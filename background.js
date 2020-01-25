var canvas = document.querySelector("#canvas")
var turnO = document.querySelector("#turnO")
var turnX = document.querySelector("#turnX")
var winner = document.querySelector("#winner")
var puntuationBox = document.querySelector("#punctuation")

var win = false
var gamechance = 0


var buttonStart = document.querySelector("#start")
var buttonReset = document.querySelector("#restart")

var tableArray = []
var XorO = `<i class="fas fa-times"></i>`

var punctuation = JSON.parse(localStorage.getItem("punctuation")) || [0,0]



function start(){
    gamechance = 0
    renderPunctuation();
    generateTableArray();
    renderGame()
}

function generateTableArray(){
    for(var count = 0; count < 9; count++){
        tableArray[count] = null;
    }
}

function renderGame(){
    var canvasString = ""
    var count = 0;
    for(var row = 0; row < 3; row++){
        canvasString += "<tr>"
        for(var column = 0; column < 3; column++){
            canvasString += `<td onclick="setXorO(${count})">`
            if(tableArray[count] == null){
                canvasString += ""
            }else{
                canvasString += `${tableArray[count]}`
            }
            canvasString += "</td>"
            count++
        }
        canvasString += "</tr>"
    }
    canvas.innerHTML = canvasString
}

function setXorO(pos){
    gamechance++
    if(tableArray[pos] == null){
        tableArray[pos] = XorO

        renderGame()
        checkWinner()

        XorO == `<i class="fas fa-times"></i>` ? XorO = `<i class="far fa-circle"></i>` : XorO = `<i class="fas fa-times"></i>`

        if(XorO == `<i class="fas fa-times"></i>`){
            turnX.setAttribute("style", "background: #c9c9c9;")
            turnO.setAttribute("style", "background: none;")
        }else{
            turnO.setAttribute("style", "background: #c9c9c9;")
            turnX.setAttribute("style", "background: none;")
        }
    }
}

function checkWinner(){
    for(var count = 0; count < 3; count++){
        if(
        //check inline
            tableArray[count*3+0] == tableArray[count*3+1] &&
            tableArray[count*3+1] == tableArray[count*3+2] &&
            tableArray[count*3+0] != null
            ||
        //check in column
            tableArray[count] == tableArray[count + 3] &&
            tableArray[count+3] == tableArray[count+6] &&
            tableArray[count] != null
        ){
            win = true
        }
    }
    if(
        //check principal diagonal
        tableArray[0] == tableArray[4] &&
        tableArray[4] == tableArray[8] &&
        tableArray[0] != null
        ||
        //check second diagonal
        tableArray[2] == tableArray[4] &&
        tableArray[4] == tableArray[6] &&
        tableArray[2] != null
        )
    {
        win = true
    }

    if(win){
        if(XorO == `<i class="far fa-circle"></i>`){
            punctuation[0] ++
            alert(`"O" win the game!!!`)
        }else{
            punctuation[1] ++
            alert(`"X" win the game!!!`)
        }
        saveToStorage();
        start();
        win = false
        renderPunctuation();
    }
    if(gamechance == 9 && win == false){
        alert("No winner")
        start();
        gamechance = 0;
        renderPunctuation();
        return
    }
}

function renderPunctuation(){
    puntuationBox.innerHTML = `${punctuation[0]} X ${punctuation[1]}`
}



function resetPunctuation(){
    punctuation[0] = 0
    punctuation[1] = 0
    renderPunctuation();
    saveToStorage();
    console.log(punctuation)
}

function saveToStorage(){
    localStorage.setItem("punctuation", JSON.stringify(punctuation))    
}

buttonReset.onclick = resetPunctuation
buttonStart.onclick = start
start()