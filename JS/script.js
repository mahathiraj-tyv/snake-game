// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

// snake body
var snakeBody = [];

// food
var foodX;
var foodY;

// score
var score = 0;

// game over
var gameOver = false;
var gameInterval;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    score = 0;
    document.getElementById("score").innerText = score;

    placeFood();
    document.addEventListener("keyup", changeDirection);
    gameInterval = setInterval(update, 100);
};

function update() {
    if (gameOver) return;

    // background
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // food (glow)
    context.shadowBlur = 10;
    context.shadowColor = "red";
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // eat food
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        score++;
        document.getElementById("score").innerText = score;
        placeFood();
    }

    // move snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // move head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // wall collision
    if (
        snakeX < 0 || snakeX >= cols * blockSize ||
        snakeY < 0 || snakeY >= rows * blockSize
    ) {
        endGame();
        return;
    }

    // self collision
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            endGame();
            return;
        }
    }

    // draw snake (glow)
    context.shadowBlur = 15;
    context.shadowColor = "lime";
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(
            snakeBody[i][0],
            snakeBody[i][1],
            blockSize,
            blockSize
        );
    }

    // reset glow
    context.shadowBlur = 0;
}

function endGame() {
    gameOver = true;
    clearInterval(gameInterval);

    document.getElementById("finalScore").innerText = score;
    document.getElementById("gameOverBox").style.display = "block";
}

function restartGame() {
    location.reload();
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
