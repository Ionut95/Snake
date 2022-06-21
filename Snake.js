let boxWeight = 340;
let boxHeight = 300;
let marginUp = 125;
let marginLeft = 50;
let sizeCell = 20;
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let gameEnd = false;
let pressedKey = 36;
let intervalId;
let points = 0;
let snakeHead = [210.5, 265.5];
let bodyHorizontal = [210.5];
let bodyVertical = [265.5];
let food = [110.5, 365.5];
let validKeys = [37, 38, 39, 40];
let button = document.getElementById("canvas");
let btnWidth = 75;
let btnHeight = 22;
let btnLeft = button.offsetLeft;
let btnTop = button.offsetTop;
let btnMarginup = 95;
let btnMarginLeft = 190;
let texts = ["Press an arrow to start the game!", "Let's get as many points as posible!", "Game over!"];

title();
drawBoard();
colorCell();
placeFood();
displayPoints();
drawMessage(0);

function title() {
  context.font ="25px Comic Sans MS";
  context.fillStyle = "red";
  context.textAlign = "center";
  context.fillText("Snake game!", 222, 45);
}

function drawMessage(indexTexts) {
  removeElements(100, 67, 250, 20);
  context.font = "15px Comic Sans MS";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText(texts[indexTexts], 225, 80);
}

function drawBoard() {
  for (let x = 0; x <= boxWeight; x += 20) {
    context.moveTo(0.5 + x + marginLeft, marginUp);
    context.lineTo(0.5 + x + marginLeft, boxHeight + marginUp);
  }

  for (let x = 0; x <= boxHeight; x += 20) {
    context.moveTo(marginLeft, 0.5 + x + marginUp);
    context.lineTo(boxWeight + marginLeft, 0.5 + x + marginUp);
  }
  context.strokeStyle = "black";
  context.stroke();
}

function drawButton() {
  context.rect(btnMarginLeft, btnMarginup, btnWidth, btnHeight);
  context.stroke();
  context.font = "17px Comic Sans MS";
  context.fillStyle = "blue";
  context.textAlign = "center";
  context.fillText("Restart!", 228, 112);
  button.addEventListener("click", function(event) {
    callEvent(event);
  });
}

function callEvent(e) {
  let x = e.pageX - btnLeft;
  let y = e.pageY - btnTop;
  if (x > btnMarginLeft && x < btnMarginLeft + btnWidth && y >= btnMarginup && y < btnMarginup + btnHeight) {
    location.reload();
  }
}

function colorCell() {
  context.fillStyle = "red";
  context.fillRect(snakeHead[0] + 0.5, snakeHead[1] + 0.5, sizeCell - 1, sizeCell - 1);
}

function removeElements(x, y, width, height) {
  context.clearRect(x, y, width, height);
}

document.onkeydown = function(e) {
  if (gameEnd == false && pressedKey != e.keyCode && validKeys.includes(e.keyCode) == true && checkOpposite(e.keyCode) != pressedKey) {
    clearInterval(intervalId);
    pressKey(e);
  }
}

function checkOpposite(key) {
  if (key == 37 || key == 38) {
    return key + 2;
  }
  return key - 2;
}

function pressKey(e) {
  drawMessage(1);
  if (e.keyCode == "37") {
    intervalId = setInterval(left, 500);
  } else if (e.keyCode == "38") {
    intervalId = setInterval(up, 500);
  } else if (e.keyCode == "39") {
    intervalId = setInterval(right, 500);
  } else if (e.keyCode = "40") {
    intervalId = setInterval(down, 500);
  }
}

function up() {
  pressedKey = 38;
  snakeHead[1] -= sizeCell;
  checkMove();
}

function down() {
  pressedKey = 40;
  snakeHead[1] += sizeCell;
  checkMove();
}

function right() {
  pressedKey = 39;
  snakeHead[0] += sizeCell;
  checkMove();

}

function left() {
  pressedKey = 37;
  snakeHead[0] -= sizeCell;
  checkMove();
}

function generateFood() {
  do {
    food[0] = 50.5 + Math.floor(Math.random() * 16) * 20;
    food[1] = 125.5 + Math.floor(Math.random() * 14) * 20;
  } while (bodyHorizontal.includes(food[0]) == true && bodyVertical.includes(food[1]) == true);
  placeFood();
}

function placeFood() {
  context.fillStyle = "yellow";
  context.fillRect(food[0] + 0.5, food[1] + 0.5, sizeCell - 1, sizeCell - 1);
}

function checkMove() {
  if (snakeHead[0] < marginLeft || snakeHead[0] > marginLeft + boxWeight || snakeHead[1] < marginUp 
    || snakeHead[1] > marginUp + boxHeight || checkBody() == 0) {
    end();
  } else {
    moveSnake();
  }
}

function checkBody() {
  for (let index = 0; index < bodyHorizontal.length; ++index) {
    if (bodyHorizontal[index] == snakeHead[0] && bodyVertical[index] == snakeHead[1]) {
      return 0;
    }
  }
  return 1;
}

function moveSnake() {
  bodyHorizontal.unshift(snakeHead[0]);
  bodyVertical.unshift(snakeHead[1]);
  colorCell();
  if (snakeHead[0] == food[0] && snakeHead[1] == food[1]) {
    ++points;
    displayPoints()
    generateFood();
  } else {
    removeQueue();
  }
}

function removeQueue() {
  removeElements(bodyHorizontal[bodyHorizontal.length - 1] + 0.5, bodyVertical[bodyVertical.length - 1] + 0.5, sizeCell - 1, sizeCell - 1);
  bodyVertical.pop();
  bodyHorizontal.pop();
}

function end() {
  drawMessage(2);
  gameEnd = true;
  clearInterval(intervalId);
  drawButton();
}

function displayPoints() {
  removeElements(150, 440, 120, 20);
  context.font = "17px Comic Sans MS";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("Points: " + points + "!", 220, 455);
}
