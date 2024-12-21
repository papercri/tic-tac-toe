
const game = {
    xTurn: true,
    xState: [],
    oState: [],
    xWins: 0,
    oWins: 0,
    gameIsOver : false,
    currentPlayer : "X",
    otherPlayer : "0",
    winningStates: [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}

const gameOver = document.getElementById("gameOver");
const gameState = document.getElementById("gameState");
const resultX = document.getElementById("resultX");
const resultO = document.getElementById("resultO");
const winnerIs = document.getElementById("winnerIs");
const boxes = document.querySelectorAll(".box");

boxes.forEach((box, index) => {
    box.addEventListener("click", playGame);
});

const restartButtons = document.querySelectorAll(".restartButton");
restartButtons.forEach((restartButton) => {
    restartButton.addEventListener("click", restartGame);
});

function restartGame(event){ 
    document.querySelector(".winnerIs").classList.remove("hidden");
    document.querySelector(".noWinner").classList.add("hidden");
   
    game.xTurn = true;
    game.xState = [];
    game.oState = [];
    boxes.forEach((box) => {
        box.classList.remove("x", "o", "clicked");
        box.addEventListener("click", playGame);
    });
    if (game.gameIsOver) {
        gameOver.classList.remove("flex");
        gameOver.classList.add("hidden");
    } 
}
function stopGame(){
    boxes.forEach((box) => {
        box.classList.add("clicked");
    });
    gameOver.classList.remove("hidden");
    gameOver.classList.add("flex");
    
}

function playGame(event){ 
    let box = event.target;
    let boxId = box.id;
    
    if (game.xTurn===true) {
        game.xState.push(boxId);
        game.currentPlayer = "O";
        game.otherPlayer = "X";
        box.classList.add("x", "clicked");
        game.xTurn = false;
        checkStatus();
    } else {
        game.oState.push(boxId);
        game.currentPlayer = "X";
        game.otherPlayer = "O";
        box.classList.add("o", "clicked");
        game.xTurn = true;
        checkStatus();
    }  
}

function checkStatus(){
    let xWinner = false
    let oWinner = false

    for (let i of game.winningStates){
        let xArr = game.xState.join("");
        let oArr = game.oState.join("");
        let iMapped = i.join("");
        let iMapped1 = iMapped.charAt(0);
        let iMapped2 = iMapped.charAt(1);
        let iMapped3 = iMapped.charAt(2);

        if (xArr.length >= 3){
            if(xArr.includes(iMapped1) && xArr.includes(iMapped2) && xArr.includes(iMapped3)) {
                xWinner = true;
                game.gameIsOver = true;
                game.xWins = game.xWins+1;
                resultX.innerHTML = game.xWins;
                game.currentPlayer = "X";
                stopGame();
            } else if (oArr.includes(iMapped1) && oArr.includes(iMapped2) && oArr.includes(iMapped3)){
                oWinner = true;
                game.gameIsOver = true;
                game.oWins = game.oWins+1;
                resultO.innerHTML = game.oWins;
                stopGame();
            }
            
        }
        gameState.innerHTML = game.currentPlayer;
        winnerIs.innerHTML = game.otherPlayer;
        
    }
    if ((xWinner === false) && (oWinner === false) && (document.querySelectorAll(".clicked").length==9)){
        game.gameIsOver = true;
        stopGame();
        document.querySelector(".winnerIs").classList.add("hidden");
        document.querySelector(".noWinner").classList.remove("hidden");
    }
}


