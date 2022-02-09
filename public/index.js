const canvas = document.getElementById("myCanvas");
canvas.style.cursor = "none";
canvas.style.background = "black";
const ctx = canvas.getContext("2d");
canvas.c = {x:canvas.width/2, y:canvas.height/2}; 
canvas.buffer = {x:50, y:50};
ctx.save();




//listeners and user inputs

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//canvas.addEventListener("mousemove", mouseMoveHandler, false);
//canvas.addEventListener('mouseup', mouseUp);
//canvas.addEventListener('mousedown', mouseDown);

function keyDownHandler(e) {
  keys[e.key] = true;
}
function keyUpHandler(e) {
  keys[e.key] = false;
}
/*
function mouseMoveHandler(e) {
  mouse.pos.x = e.offsetX;
  mouse.pos.y = e.offsetY;
}
function mouseDown(e){
  if (e.button === 0){
      mouse.lc = true
  }   
}
function mouseUp(e){
  if (e.button === 0){
      mouse.lc = false
  }
}
*/
const keys = [];

socket.on("notification", (e) =>{
  console.log(e);
});

socket.on("identify", (e) =>{
  id = e;
  identify(id);
});

function identify(id){
  //REWRITE
  if (id === 0){
    hDef.player = true;
    hOff.player = true;
    aDef.player = false;
    aOff.player = false;
  }
  else if (id === 1){
    aDef.player = true;
    aOff.player = true;
    hDef.player = false;
    hOff.player = false;
  }
  else{
    return;
  };
};
socket.on("playerLeft",(e)=>{
  if (e<id){
    id--;
    identify(id);
  };
});







socket.on("pongPos", (e)=>{
  puck.pos = new Vec2D(e.x,e.y);
});

socket.on("playerPos", (e)=>{
  if (id === 0){
    aOff.pos.y = e.y;
    aDef.pos.y = e.y;
  }
  else if (id === 1){
    hOff.pos.y = e.y;
    hDef.pos.y = e.y;
  }
  else{
    return;
  };
});

//REWRITE?
socket.on("scoreUpdate", (e)=>{
  overlay.homeScore = e.h;
  overlay.awayScore = e.a;
});

socket.on("stateChange", (e)=>{
  console.log(e);
  if (e === "startMenu"){
    gameState.switchState(gameState.state[0]);
  }
  else if (e === "pongRun"){
    gameState.switchState(gameState.state[1]);  
    console.log("pongRun");
  }
  else if (e === "score"){
    gameState.switchState(gameState.state[2]);
  }
  else if (e === "winState"){
    gameState.switchState(gameState.state[3]);
  };
});

socket.on("winUpdate", (e)=>{
  overlay.winner = e;
  gameState.switchState(gameState.state[3]);
});







let id;
const rink = new Rink();
const puck = new Puck();
const overlay = new Overlay();

//nst name = new Unit(playerTeam,clientNumber)
const hDef = new Defense(true, 0);
const aDef = new Defense(false, 1);
const hOff = new Offense(true, 0);
const aOff = new Offense(false, 1);
const unitArray = [
  hDef,
  aDef,
  hOff,
  aOff
];
const gameState = new GameState();


let pingTimerToggle = false;
let pong = false;
let pingTime = 0;
socket.on("pong", () => {
  pong = true;
});







function init(){
  gameState.switchState(gameState.state[0]);
}

function drawPong(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameState.update();
}




init()
setInterval(drawPong, 16.6);