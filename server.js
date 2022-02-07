
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static("public"));
const allClients = [];

const Vec2D = require("./vector2d.js");
const Rink = require("./rink.js");

const canvas ={
  width: 1100, 
  height:525
}
canvas.c = {
  x:canvas.width/2, 
  y:canvas.height/2
} 
canvas.buffer = {
  x:50, 
  y:50
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});

//on connection, put clients in allClients array, set data, give player role and gamestate
io.on('connection', (socket) => {
  allClients.push(socket);
  console.log('a user connected ' +socket.id);
  let i = allClients.indexOf(socket);
  allClients[i].pos = null;
  allClients[i].restart = false;
  allClients[i].score = 0
  socket.emit("identify", i)
  socket.emit("stateChange", gameState._state)

  //if player 1 and player 2 are already in
  if (allClients[1]){
    if (allClients[2]){
      console.log("p3 is in");
      socket.emit("notification", "game is full");

    }
    //when player 2 joins
    else{
      console.log("p2 is in");
      socket.emit("notification", "player 2 is in");
    }
  }
  //when player 1 joins
  else {
    console.log("p1 is in");
    socket.emit("notification", "player 1 is in");

  }

  //on disconnect, remove player, forift game if playing
  socket.on('disconnect', () => {
    console.log('user disconnected');  
    let i = allClients.indexOf(socket);
    if (i === 0){
      //if player 1 disconnects
      console.log("player 1 has left");
      io.emit("winUpdate", "Player 2");
      io.emit("playerLeft", 0)
      gameState.switchState(gameState.state[3])
    }
    else if (i === 1){
      //if player 2 disconnects
      console.log("player 2 has left")
      io.emit("winUpdate", "Player 1");
      io.emit("playerLeft", 1)
      gameState.switchState(gameState.state[3])
    }
    else {
      //if waiting player disconnects 
      io.emit("playerLeft", 2)
    }
    allClients.splice(i,1);
  });

  //player controls location, emits to server to other player
  socket.on("playerPos", (pos) =>{
    socket.broadcast.emit("playerPos", pos);
  });

  //player controls hitreg, when ball contacts emits what side of the paddle its on
  socket.on("bounce", (right) =>{
    if (right){
      puck.velocity.x = 5
    }
    else{
      puck.velocity.x = -5
    }
  })

  //after game is over player 1 and player 1 hit restart
  socket.on("restart",(e)=>{
    allClients[e].restart = true;
    console.log(allClients[e].id +" Restart")

  })
});

//emit score to players
function scoreUpdate(){
  if(allClients[0] && allClients[1]){
    let h = allClients[0].score
    let a = allClients[1].score
    io.emit("scoreUpdate", {h,a})
  }
  else
    io.emit("scoreUpdate", {h:0,a:0} )
}

//edge collision for puck
function edgeCollision(object){
  if (object.bounds.min.x < rink.bounds.min.x){
    object.pos.x = rink.bounds.min.x+object.r
    object.velocity.x = object.velocity.x*-1
  }
  else if (object.bounds.max.x > rink.bounds.max.x){
    object.pos.x = rink.bounds.max.x-object.r
    object.velocity.x = object.velocity.x*-1
  }
  if (object.bounds.min.y < rink.bounds.min.y){
    object.pos.y = rink.bounds.min.y+object.r
    object.velocity.y = object.velocity.y*-1
  }
  else if (object.bounds.max.y > rink.bounds.max.y){
    object.pos.y = rink.bounds.max.y-object.r
    object.velocity.y = object.velocity.y*-1
  }
}


//puck.js

//server controls the puck and emits position to players, puck keeps track of scoring points
class Puck{
  constructor(){
    this.r = 5
    this.speed = 5
    this.pos = new Vec2D(rink.center.x,rink.center.y);
    this.velocity = new Vec2D(this.speed,this.speed)
    this.winScore = 5
  }
  get bounds(){
    let min = this.pos.subScalar(this.r)
    let max = this.pos.addScalar(this.r)
    return {min:min, max:max}
  }
  pongMovement(){
    this.pos = this.pos.add(this.velocity);
      io.emit("pongPos", {x:puck.pos.x,y:puck.pos.y});
  }
  pongScore(){
    //if player 2 scores goal
    if (puck.pos.x < rink.line.hGoal){
      allClients[1].score++
      if (allClients[1].score >= this.winScore){
        io.emit("winUpdate", "Player 2")
        gameState.switchState(gameState.state[3])
      }
      else{
        scoreUpdate();
        puck.pos = new Vec2D(rink.center.x,rink.center.y)        
      }
    }
    //if player 1 scores goal
    else if (puck.pos.x > rink.line.aGoal){
      allClients[0].score++
      if (allClients[0].score >= this.winScore){
        io.emit("winUpdate", "Player 1")
        gameState.switchState(gameState.state[3])
      }
      else{
        scoreUpdate()
        puck.pos = new Vec2D(rink.center.x,rink.center.y)
      }
    }
  }
  pongRun(){
    edgeCollision(this);
    this.pongMovement();
    this.pongScore();
  }
}

//END puck.js

// **** GAMESTATE MACHINE ****

//I'm using a state machine I saw in a C# tutorial, a bit janky/overkill for javascript but it works
//on state change, endState fires once, then beginstate fires once, then update runs
class GameState{
  constructor(){
    this.state = ["startMenu", "pongRun", "score", "winState"]
    this._state;
    this.timer ={menu:false}
  }

  //start() USE THE INIT TO START
  switchState(newState){
    this.endState();
    this._state=newState;
    this.beginState(newState);
  }

  beginState(newState){
    switch (newState){
      case this.state[0]:
        //this.starMenuStart();
        gameState.timer.menu = false
        puck.pos.x = rink.center.x;
        puck.pos.y = rink.center.y;
        scoreUpdate();

        console.log("menu running");
      break;

      case this.state[1]:
        //this.pongStart();
        console.log("game start");

      break;

      case this.state[2]:
        //this.scoreStart();

      break;

      case this.state[3]:
        //this.winStateStart();
        console.log("winstate")
      break;
    }
  }

  update(){
    switch (this._state){
      case this.state[0]:
        //this.startMenuRun();
        if (!this.timer.menu){
          if (allClients[1]){
            console.log("if both players are in")
            setTimeout(()=>{
              io.emit("stateChange", "pongRun")

              this.switchState(this.state[1])}, 5000)
            this.timer.menu = true
          }
          else{
            console.log("check every 5 seconds")
            gameState.timer.menu = true;
            setTimeout(()=>{this.timer.menu=false}, 5000)
          }
        }


      break;
      
      case this.state[1]:
        //this.pongRun();
        puck.pongRun();

      break;
      
      case this.state[2]:
        //this.scoreRun();
      break;

      case this.state[3]:
        //this.winStateRun();
        if(allClients[1]){
          if (allClients[0].restart && allClients[1].restart){
            io.emit("stateChange", "startMenu")
            gameState.switchState(gameState.state[0])
          }          
        }
        else if(allClients[0]){
          io.emit("stateChange", "startMenu");
          gameState.switchState(gameState.state[0])
        }
        else {
          gameState.switchState(gameState.state[0])          
        }
      break;
    }

  }
  endState(){
    switch(this._state){
      case this.state[0]:
        //this.startMenuEnd();
      break

      case this.state[1]:
        //this.pongEnd();
      break;

      case this.state[2]:
        //this.scoreEnd();
      break;

      case this.state[3]:
        //this.winStateEnd();
        if(allClients[1]){
          allClients[1].score = 0
          allClients[1].restart = false
          allClients[0].score = 0
          allClients[0].restart = false
        }
        else if(allClients[0]){
          allClients[0].score = 0
          allClients[0].restart = false
        }
      break;
    }
  }
}

//****END GAMESTATEMACHINE****



const rink = new Rink();
const puck = new Puck();
const gameState = new GameState();

function init(){
  gameState.switchState(gameState.state[0]);
}

function gameRun(){
  gameState.update()
}

init()
setInterval(gameRun, 16.6);