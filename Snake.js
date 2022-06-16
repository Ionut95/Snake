let gameEnd = false;
let snakeBody = [134];
let invalidMoves = [-1, 17, 35, 53, 71, 89, 107, 125, 143, 161, 179, 197, 215, 233, 251, 269];
let snakeHead = 134;
let intervalId;
let pressedKey = 36;
let food = 32;
let points = 0;
displayScore();
document.getElementById("status").innerHTML = "Press an arrow from your keyboard to begin!";
document.getElementById(food).style.backgroundColor = "#FF3131";
document.getElementById(snakeBody[0]).style.backgroundColor = "#888888";

document.onkeydown = function(e) {
  document.getElementById("status").innerHTML = "Let's get as many points as posible!";
  if (e.keyCode == "37" && pressedKey != 39 && pressedKey != e.keyCode && gameEnd == false) {
    clearInterval(intervalId);
    intervalId = setInterval(moveLeft, 500);
  } else if (e.keyCode == "38" && pressedKey != 40 && pressedKey != e.keyCode && gameEnd == false) {
    clearInterval(intervalId);
    intervalId = setInterval(moveUp, 500);
  } else if (e.keyCode == "39" && pressedKey != 37 && pressedKey != e.keyCode && gameEnd == false) {
    clearInterval(intervalId);
    intervalId = setInterval(moveRight, 500);
  } else if (e.keyCode == "40" && pressedKey != 38 && pressedKey != e.keyCode && gameEnd == false) {
    clearInterval(intervalId);
    intervalId = setInterval(moveDown, 500);
  }
};

function moveLeft() {
  pressedKey = 37;
  --snakeHead;
  if (checkMove() == 1) {
    moveSnake();
  } else {
    end();
  }
}

function moveRight() {
  pressedKey = 39;
  ++snakeHead;
  if (checkMove() == 1) {
    moveSnake();
  } else {
    end();
  }
}

function moveUp() {
  pressedKey = 38;
  snakeHead -= 18;
  if (checkMove() == 1) {
    moveSnake();
  } else {
    end();
  }
}

function moveDown() {
  pressedKey = 40;
  snakeHead += 18;
  if (checkMove() == 1) {
    moveSnake();
  } else {
    end();
  }
}

function end() {
  gameEnd = true;
  clearInterval(intervalId);
  document.getElementById("status").innerHTML = "Game over!";
  document.getElementById("status").style.color = "#daf7a6";
  restartGame();
} 

function feedSnake() {
  food = Math.floor(Math.random() * 268);
  while (snakeBody.includes(food) == true || invalidMoves.includes(food) == true) {
    food = Math.floor(Math.random() * 268);
  }
  document.getElementById(food).style.backgroundColor = "#FF3131";
}

function moveSnake() {
  snakeBody.unshift(snakeHead);
  document.getElementById(snakeHead).style.backgroundColor = "#888888";
  if (snakeHead == food) {
    ++points;
    displayScore();
    feedSnake();
  } else {
    removeQueue();
  }
}


function removeQueue() {
  document.getElementById(snakeBody[snakeBody.length - 1]).style.backgroundColor = "#A7C7E7";
  snakeBody.pop();
}

function checkMove() {
  if (snakeBody.includes(snakeHead) == true || invalidMoves.includes(snakeHead) == true || snakeHead < 0 || snakeHead > 268) {
    return 0;
  }
  return 1;
}

function displayScore() {
  document.getElementById("score").innerHTML = "Points: " + points + "!";
}

function restartGame() {
  let button = document.createElement("button");
  button.innerText = "Restart";
  button.addEventListener("click", function() {
    location.reload();
  });
  document.body-restart.appendChild(button);
}