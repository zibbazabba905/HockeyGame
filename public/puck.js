//puck, the main thing of the game
class Puck{
  constructor(){
    this.r = 5
    this.pos = new Vec2D(rink.center.x,rink.center.y);
    this.bounceCheck = false
  }
  get bounds(){
    return {min:this.pos.subScalar(this.r), max:this.pos.addScalar(this.r)};
  }
  pongDraw(){
    drawCircle(this.pos.x,this.pos.y,this.r,"white")
  }
  pongRun(){
    puckCollisionDetect(this);
    this.pongDraw();
  }
}