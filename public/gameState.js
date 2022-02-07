class GameState{
  constructor(){
    this.state = ["startMenu", "pong", "score", "winState"]
    this._state;
    this.toggleControl = {
      restart:false
    }
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
        console.log("beginMenuState")
        this.toggleControl.restart = false;
        aDef.pos.y = rink.center.y
        hDef.pos.y = rink.center.y
        aOff.pos.y = rink.center.y
        hOff.pos.y = rink.center.y
        overlay.winner = null;        
      break;

      case this.state[1]:
        //this.pongStart();
      break;

      case this.state[2]:
        //this.scoreStart();
      break;

      case this.state[3]:
      console.log("winstate")
        //this.winStateStart();
      break;
    }
  }

  update(){
    switch (this._state){
      case this.state[0]:
        //this.startMenuRun();
        rink.pongDraw();
        overlay.menuDraw();
      break;

      case this.state[1]:
        //this.pongRun();
        rink.pongDraw();
        overlay.pongDraw();
        puck.pongRun();
        hDef.pongRun();
        aDef.pongRun();
        hOff.pongRun();
        aOff.pongRun();
      break;

      case this.state[2]:
        //this.scoreRun();
      break;

      case this.state[3]:
        //this.winStateRun();
        rink.pongDraw();
        overlay.winDraw(overlay.winner)
        if (keys.q && !this.toggleControl.restart && id<2){
          socket.emit("restart", id);
          console.log("emit restart")
          this.toggleControl.restart = true;
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
      break;
    }
  }
}
