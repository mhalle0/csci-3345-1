"use strict";

const canvas = document.getElementById("pong");
const context = canvas.getContext('2d');

let ctrlW = false
let ctrlS = false;
let ctrlI = false;
let ctrlK = false;

let ballX = 300;
let ballY = 200;
let velX = 0;
let velY = 0;

let p1X = 30;
let p1Y = 200;
let p2X = 570;
let p2Y = 200;

document.addEventListener('keydown', inputDown => {
    if(inputDown.code == "KeyW") {
        ctrlW = true;
    }
    else if(inputDown.code == "KeyS") {
        ctrlS = true;
    }
    else if(inputDown.code == "KeyI") {
        ctrlI = true;
    }
    else if(inputDown.code == "KeyK") {
        ctrlK = true;
    }
});

document.addEventListener('keyup', inputUp => {
    if(inputUp.code == "KeyW") {
        ctrlW = false;
    }
    if(inputUp.code == "KeyS") {
        ctrlS = false;
    }
    if(inputUp.code == "KeyI") {
        ctrlI = false;    
    }
    if(inputUp.code == "KeyK") {
        ctrlK = false;     
    }
});

function reset() {
    drawBoard();

    ctrlW = false;
    ctrlS = false;
    ctrlI = false;
    ctrlK = false;

    p1X = 30;
    p1Y = 200;
    p2X = 570;
    p2Y = 200;

    ballX = 300;
    ballY = 200;
    velX = 0;
    velY = 0;
}

function start() {
    reset();
    velX = -2;
    play();
}

function play() {
    drawGame();
    moveGame();
    if(checkWin()) {
        reset();
    };
    requestAnimationFrame(play);
}

function moveGame() {
    if(ctrlW && (p1Y > 20)) {
        p1Y -= 3;
    }
    if(ctrlS && (p1Y < 380)) {
        p1Y += 3;
    }
    if(ctrlI && (p2Y > 20)) {
        p2Y -= 3;
    }
    if(ctrlK && (p2Y < 380)) {
        p2Y += 3;
    }

    ballX += velX;
    ballY += velY;

    if((ballX <= 40) && (ballY >= p1Y - 24) && (ballY <= p1Y + 24)) {
        velX = -velX;
        if(ctrlS) {
            velY = 0.4;
        }
        if(ctrlW) {
            velY = -0.4;
        }
    }

    if((ballX >= 560) && (ballY >= p2Y - 24) && (ballY <= p2Y + 24)) {
        velX = -velX;
        if(ctrlK) {
            velY = 0.4;
        }
        if(ctrlI) {
            velY = -0.4;
        }
    }

    if(ballY <= 12 || ballY >= 388) {
        velY = -velY;
    }
}

function drawBoard() {
    context.clearRect(0, 0, 600, 400);

    //game outline, divider
    context.strokeStyle = 'white';
    context.lineWidth = 10;
    context.strokeRect(0, 0, 600, 400);
    context.lineWidth = 4;
    context.strokeRect(297, 20, 0, 360);
}

function drawGame() {
    drawBoard();

    //ball
    context.fillStyle = 'white';
    context.fillRect((ballX - 8), (ballY - 6), 12, 12);

    //paddles
    context.fillRect((p1X - 6), (p1Y - 20), 12, 40);
    context.fillRect((p2X - 6), (p2Y - 20), 12, 40);
}   

function checkWin() {
    if((ballX <= 10) || (ballX >= 590)) {
        return true;
    }
    else {
        return false;
    }
}