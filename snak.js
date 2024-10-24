var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// Goblin afbeelding 
var goblinImage = new Image();
goblinImage.src = "g.png";  

// Voedsel afbeelding 
var foodImage = new Image();
foodImage.src = "R.png";  

// Goblin positie
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var snakeBody = [];

// Beweging van de goblin
var velocityX = 0;
var velocityY = 0;

// Voedsel positie
var foodX = blockSize * 10;
var foodY = blockSize * 10;

var GAMEOVER = false;
var score = 0; // Initialiseer score
var speed = 300; // Initiële snelheid
var gameInterval;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    gameInterval = setInterval(update, speed); // Gebruik de snelheid
    document.addEventListener("keyup", changeDirection);
};

function update() {
    if (GAMEOVER === true) {
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.drawImage(foodImage, foodX, foodY, blockSize, blockSize);

    // Controleer of de goblin het voedsel kan opeten
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score += 10; // Verhoog score
        placeFood();

        // Verhoog snelheid als score 100 bereikt
        if (score >= 100) {
            speed = 200; // Versnel
            clearInterval(gameInterval);
            gameInterval = setInterval(update, speed);
        }
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Goblin positie bijwerken
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.drawImage(goblinImage, snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.drawImage(goblinImage, snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Game over als de goblin buiten het speelveld komt
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        GAMEOVER = true;
        alert("GAME OVER");
    }

    drawScore(); // Teken de score
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.code === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
}

function drawScore() {
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20);
}