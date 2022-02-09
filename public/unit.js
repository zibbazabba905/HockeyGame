//base unit to use for player and ai character, "Players"

class Unit{
  constructor(playerTeam, teamID){
    this.pos //= (playerTeam)? new Vec2D(rink.faceOff.circle.min.x,rink.center.y) : new Vec2D(rink.faceOff.circle.max.x,rink.center.y)
    this.r = 5
    this.width = 2*this.r
    this.color = (playerTeam)? "green" : "red"
    this.height = 50
    this.speed = 5
    this.player = false
    this.teamID = teamID
  }
  get bounds(){
    return {
      min:new Vec2D(this.pos.x-this.r,this.pos.y-this.height*.5),
      max:new Vec2D(this.pos.x+this.r,this.pos.y+this.height*.5)
    }
  }
  pongDraw(){
  //drawSquare(minX,minY,maxX,maxY,fill,width=1,color="black")
    drawSquare(this.bounds.min.x,this.bounds.min.y,this.bounds.max.x,this.bounds.max.y,true,1,this.color)
  }
  pongMovement(){    
    if(this.player===true){
      if (keys.w){
        this.pos.y = this.pos.y -this.speed;
        socket.emit("playerPos", this.pos);
      }
      else if (keys.s){
        this.pos.y = this.pos.y +this.speed;
        socket.emit("playerPos", this.pos);
      }
    }
  }
  pongRun(){
    this.pongMovement();
    this.pongDraw();
  }
}

class Offense extends Unit{
  constructor(playerTeam, teamID){
    super(playerTeam, teamID)
    this.pos = (playerTeam)? new Vec2D(rink.faceOff.spot.max.x,rink.center.y) : new Vec2D(rink.faceOff.spot.min.x,rink.center.y)
  }
}

class Defense extends Unit{
  constructor(playerTeam, teamID){
    super(playerTeam, teamID)
    this.pos = (playerTeam)? new Vec2D(rink.faceOff.circle.min.x,rink.center.y) : new Vec2D(rink.faceOff.circle.max.x,rink.center.y)
  }
}
