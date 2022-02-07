//puck, the main thing of the game
class Puck{
  constructor(){
    this.r = 5
    this.pos = new Vec2D(rink.center.x,rink.center.y);
    this.bounceCheck = false
  }
  get bounds(){
    let min = this.pos.subScalar(this.r)
    let max = this.pos.addScalar(this.r)
    return {min:min, max:max}
  }
  pongDraw(){
    drawCircle(this.pos.x,this.pos.y,this.r,"white")
  }
  pongRun(){
    puckCollisionDetect(this);
    this.pongDraw();
  }
}