let currentTurn = "x";
let gameIsFinished = false;

let gridItems = document.getElementsByClassName("square");

let boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

for (const item of gridItems) {
  item.addEventListener("click", function () {
    if (gameIsFinished) {
      return;
    }

    let value = this.getAttribute("value");
    let index = value - 1;

    if (boardArray[index] == "x" || boardArray[index] == "o") {
      return;
    }

    // add the (X - O) to the square content
    let squareContent = document.querySelector(
      `.square[value='${value}'] .square-content`
    );
    squareContent.innerHTML = currentTurn;
    squareContent.classList.add("animate__animated", "animate__bounceIn");

    // add the input to the representative logic
    boardArray[index] = currentTurn;

    console.log(
      "the current turn isss ",
      currentTurn,
      currentTurn == "x",
      currentTurn == "o"
    );

    // switch the turn
    if (currentTurn == "x") {
      currentTurn = "o";
      document.querySelector('.grid-container').style.background = 'rgb(137, 105, 240)';
      document.querySelector('#header').style.background = 'rgb(137, 105, 240)';
  
    } else {
      currentTurn = "x";
      document.querySelector('.grid-container').style.background = '#f0db4f';
      document.querySelector('#header').style.background = '#f0db4f';
    }
    
    // add the instructions about the current turn
    document.getElementById(
      "instruction"
    ).textContent = `Player ${currentTurn.toUpperCase()} turn`;

    evaluateBoard();
  });
}

function evaluateBoard() {
  console.log(
    boardArray[0],
    boardArray[1],
    boardArray[2],
    (boardArray[0] === boardArray[1]) === boardArray[2]
  );
  if (
    // rows
    (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]) ||
    (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]) ||
    (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]) ||
    // cols
    (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) ||
    (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) ||
    (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]) ||
    // Diagonal
    (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]) ||
    (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8])
  ) {
    var winner = currentTurn == "o" ? "X" : "O";
    // alertify.alert(`${winner} Won!`, "", function () {});
    // document.getElementById(
    //   "winerMsg"
    // ).textContent = `${winner} Won!`;

    document.getElementById(
      "instruction"
    ).textContent = `Player ${winner} is Won the Game!`;
    document.querySelector('#header').style.background = 'red';
    document.querySelector('#header').style.color = 'white';
    document.querySelector('.grid-container').style.background = 'red';
    document.querySelector('#eset-btn').style.background = 'red';
    document.querySelector('#eset-btn').style.color = 'white';



    gameIsFinished = true;
    return;
  }

  // check for draw..
  var isDraw = true;
  for (square of boardArray) {
    if (square != "x" && square != "o") {
      console.log("not draw cuz of " + square);
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    // alertify.alert(`Draw`, "", function () {});
    document.getElementById(
      "instruction"
    ).textContent = `The Game is Draw! Please reset the Game`;
    document.querySelector('#header').style.background = 'black';
     document.querySelector('#header').style.color = 'red';
     document.querySelector('.grid-container').style.background = 'black';
     document.querySelector('#eset-btn').style.background = 'black';
     document.querySelector('#eset-btn').style.color = 'red';


  }
}

document.getElementById("reset-btn").addEventListener("click", function () {
  reset();
});

function reset() {
  gameIsFinished = false;
  currentTurn = "x";
  document.getElementById("instruction").textContent = `Player ${currentTurn} turn`;

  let index = 0;
  for (item of gridItems) {
    let value = item.getAttribute("value");
    let squareContent = document.querySelector(
      `.square[value='${value}'] .square-content`
    );
    squareContent.classList.remove("animate__animated", "animate__bounceIn");
    squareContent.classList.add("animate__animated", "animate__bounceOut");

    squareContent.addEventListener("animationend", (animation) => {
      console.log("the animation isssss");
      console.log(animation.animationName);
      // do something
      if (animation.animationName == "bounceOut") {
        squareContent.classList.remove(
          "animate__animated",
          "animate__bounceOut"
        );
        squareContent.innerHTML = "";
      }
    });

    index++;

  }
  document.querySelector('.grid-container').style.background = 'rgb(137, 105, 240)';
  document.querySelector('#header').style.background = '#f0db4f';

  boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
}
