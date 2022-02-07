
class Overlay{
  constructor(){
    this.homeScore = 0
    this.awayScore = 0
    this.winner = null;
    this.infoBox = {
      bounds: {
        min: new Vec2D(rink.faceOff.circle.min.x,rink.faceOff.circle.min.y),
        max: new Vec2D(rink.faceOff.circle.max.x,rink.faceOff.circle.max.y)
      },
      color: {
        inner: "grey",
        outer: "white"
      },
      text: {
        location: null,
        size: null
      }
    }
  }
  drawScore(){
    ctx.restore();
    ctx.font = "bold 100px courier";
    ctx.textAlign = "center"
    ctx.fillStyle= "white"
    ctx.fillText(this.homeScore,rink.center.x-(rink.length/4),rink.center.y-(rink.width/4))
    ctx.fillText(this.awayScore,rink.center.x+(rink.length/4),rink.center.y-(rink.width/4))
  }
  drawinfoBox(){
    //function drawSquare(minX,minY,maxX,maxY,fill,width=1,color="black"){
    drawSquare(this.infoBox.bounds.min.x, this.infoBox.bounds.min.y,this.infoBox.bounds.max.x,this.infoBox.bounds.max.y,true,1,this.infoBox.color.inner)
  }
  menuDraw(){
    ctx.restore()
    let text = "Use W and D to move Up and Down"
    this.infoBox.color.inner = "grey"
    this.drawinfoBox();
    ctx.restore();
    ctx.font = " 40px georgia";
    ctx.fontFamily = 
    ctx.fillStyle= "white"
    ctx.fillText(text,220,220)
  }
  winDraw(){
    ctx.restore();
    let text = this.winner +" WIN"
    this.infoBox.color.inner = "green"
    this.drawinfoBox();
    ctx.restore();
    ctx.font = " 115px georgia";
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillStyle= "white"
    ctx.fillText(text,210,rink.center.y)
    ctx.font= "20px georgia";
    ctx.fillText("press q for restart", 210, rink.center.y+80)
  }
  pongDraw(){
    this.drawScore();
  }
}