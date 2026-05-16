const player=document.getElementById("player");
let gameArea=null;

const displayScore=document.getElementById("displayScore");
const displayLives=document.getElementById("displayLives");
const displayTimeLeft=document.getElementById("displayTimeLeft");
const displayDodged=document.getElementById("displayDodged");
const displayBonuses=document.getElementById("displayBonuses");

const startBtn=document.getElementById("startBtn");
const pauseBtn=document.getElementById("pauseBtn");
const resetBtn=document.getElementById("resetBtn");

document.addEventListener("DOMContentLoaded", ()=>{
    gameArea=document.getElementById("gameArea");


const settings=JSON.parse(localStorage.getItem("savedSettings")) ||{};

if(settings.theme==="space"){
    gameArea.style.background="black";
}

if(settings.theme==="runner"){
    gameArea.style.background="green";
}

if(settings.theme==="car"){
    gameArea.style.background==="gray";
}

let playerX=210;
let score=0;
let lives=3;
let dodged=0;
let bonuses=0;


let gameRunning=false;
let gamePaused=false;

let timeLeft=30;

let obstacles=[];

let spawnInterval=null;
let timerInterval=null;
let gameInterval=null;

document.addEventListener("keydown", (e)=>{
    if(!gameRunning||gamePaused) return;

    if(e.key==="ArrowLeft") playerX-=15;
    if(e.key==="ArrowRight") playerX+=15;

    playerX=Math.max(0, Math.min(playerX, gameArea.offsetWidth-5));
    player.style.left=playerX + "px";
});

startBtn.addEventListener("click", startGame);

function startGame(){
    gameRunning=true;
    gamePaused=false;

    score=0;
    lives=3;
    dodged=0;
    bonuses=0;
    timeLeft=30;

    playerX=210;
    player.style.left=playerX + "px";

    updateUI();

    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    clearInterval(gameInterval);

    spawnInterval=setInterval(spawnObstacle, 1000);
    timerInterval=setInterval(updateTimer, 1000);
    gameInterval=setInterval(()=>{
        moveObstacles();
        checkCollision();
    }, 20);
}

function gameLoop(){

    if(!gameRunning||gamePaused) return;

    moveObstacles();
    checkCollisions();
}

function spawnObstacle(){
    if(!gameRunning||gamePaused) return;

    const obstacle=document.createElement("div");
    obstacle.className="entity obstacle";

 obstacle.style.position="absolute";
 obstacle.style.width="50px";
 obstacle.style.height="50px";


   obstacle.style.left=Math.random()*(gameArea.offsetWidth - 50) + "px";

   obstacle.style.top="0px";

    gameArea.appendChild(obstacle);

    obstacles.push({
        el:obstacle,
        y:0
    });
}

function moveObstacles(){
for(let i=0; i<obstacles.length; i++){
    obstacles[i].y+=4;
    obstacles[i].el.style.top=obstacles[i].y + "px";

    if(obstacles[i].y>gameArea.offsetHeight){
        obstacles[i].el.remove();

        obstacles.splice(i, 1);

        dodged++;
        score+=5;

        updateUI();
    }
}
}

function checkCollision(){
    const playerRect=player.getBoundingClientRect();

    obstacles.forEach((obj, index)=>{
        const rect=obj.el.getBoundingClientRect();

        const hit=
        rect.left<playerRect.right &&
        rect.right>playerRect.left &&
        rect.top<playerRect.bottom &&
        rect.bottom>playerRect.top;

        if(hit){
            obj.el.remove();
            obstacles.splice(index, 1);

            lives--;

            updateUI();

            if(lives<=0){
                endGame();
            }
        }
    });
}

function updateTimer(){
    if(!gameRunning||gamePaused) return;

    timeLeft--;
    displayTimeLeft.textContent=timeLeft + "s";

    if(timeLeft<=0){
        endGame();
    }
}

function updateUI(){
    displayScore.textContent=score;
    displayLives.textContent=lives;
    displayDodged.textContent=dodged;
    displayBonuses.textContent=bonuses;
    displayTimeLeft.textContent=timeLeft + "s";
}

pauseBtn.addEventListener("click", ()=>{
    gamePaused=!gamePaused;
});

resetBtn.addEventListener("click", resetGame);

function resetGame(){
    gameRunning=false;
    gamePaused=false;

    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    clearInterval(gameInterval);

    obstacles.forEach(o=> o.el.remove());
    obstacles=[];

    score=0;
    lives=3;
    dodged=0;
    bonuses=0;
    timeLeft=30;

    playerX=210;
    player.style.left=playerX + "px";

    updateUI();
}

function endGame(){
    gameRunning=false;

    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    clearInterval(gameInterval);

    alert("Game Over! Score: " + score);
}
});