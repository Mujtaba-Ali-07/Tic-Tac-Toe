let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-game-btn");
let resetGameBtn = document.querySelector("#reset-game-btn");
let topMsgContainer = document.querySelector(".top-msg-container");
let msg = document.querySelector("#msg");
let turnCount = document.querySelector(".turn-count");
let body = document.querySelector("body");

let heading = document.querySelector("#heading");
let gameBoardContainer = document.querySelector(".container");

//Create winning Patterns
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//first turn should be player 1
let player1 = true;

//display Player 1 on screen at start
turnCount.innerText = "Player 1";

//count click
let countClick = 0;

//Here the box become clickable
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (player1) {
      //player 1 turn
      box.classList.remove("red"); //remove previous color
      turnCount.innerText = "Player 2";
      box.innerText = " O ";
      box.classList.add("black"); //changing color of player 1
      player1 = false;
    } else {
      //player 2 turn
      box.classList.remove("black"); //remove previous color
      turnCount.innerText = "Player 1";
      box.innerText = " X ";
      box.classList.add("red"); //chaning the color of player 2
      player1 = true;
    }

    box.disabled = true;
    countClick++;

    let isWinner = chechWinner(); //check winner

    if (countClick === 9 && !isWinner) {
      //if the checkWinner function not called
      noWinner();
    }
  });
});

//Create Function to find Who is the Winner
const chechWinner = () => {
  for (let pattern of winPatterns) {
    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;

    //condition to declear winner
    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 === posVal2 && posVal2 === posVal3) {
        showWinner(); //show Winner
      }
    }
  }
};

//Display Winner on Screen
const showWinner = () => {
  msg.innerText = `Congratulation, The Winner is ${getWinner()}`;
  topMsgContainer.classList.remove("hide");
  turnCount.classList.add("hide");
  heading.classList.add("hide");
  gameBoardContainer.classList.add("hide");
  resetGameBtn.classList.add("hide");

  disabledBtn(); //when winner is declear all button will disable
};

//when their is no winner than display this on screen
const noWinner = () => {
  msg.innerText = "Game is Draw";
  topMsgContainer.classList.remove("hide");
  turnCount.classList.add("hide");
  heading.classList.add("hide");
  gameBoardContainer.classList.add("hide");
  resetGameBtn.classList.add("hide");
};

//This function is for Display Winner name on screen
const getWinner = (winnerIs) => {
  if (turnCount.innerText === "Player 1") {
    winnerIs = "Player 2";
    turnCount.innerText = "Player 2";
  } else {
    winnerIs = "Player 1";
    turnCount.innerText = "Player 1";
  }
  return winnerIs;
};

//to restart the game from begining
const resetGame = () => {
  player1 = true;
  countClick = 0;
  turnCount.innerText = "Player 1";
  topMsgContainer.classList.add("hide");
  turnCount.classList.remove("hide");
  heading.classList.remove("hide");
  gameBoardContainer.classList.remove("hide");
  resetGameBtn.classList.remove("hide");

  enableBtn(); //to enable all button when game start again
};

//to disable all buttons
const disabledBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// To enable all button
const enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

//New Game Button
newGameBtn.addEventListener("click", resetGame);

//Reset Game Button
resetGameBtn.addEventListener("click", resetGame);
