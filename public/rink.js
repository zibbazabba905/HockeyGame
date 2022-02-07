//main background rink for game, 
//should change scale to make more fun
//should contain all points of interest and locations

class Rink{
  constructor(){
    //scale is *5
      //200f long 85f wide
      //corners are 28f radius circle
    //face Off circles
      //r 15ft, 22ft from middle, 20ft from center, 69ft from center
      //wall, 22.5ft, center, 62.5ft, wall
      //left, 31ft, 80ft, center, 120ft, 169ft, right
    //Goal is 3.33ft(40inches) by 6 ft 16 x 30

    //TURN THESE TO VEC2D SYSTEM
    this.pongLineWidth = 5
    this.length = 1000;
    this.width = 425;
    this.center= {
      x:canvas.buffer.x +500,
      y:canvas.buffer.y +this.width/2
    }
    this.bounds = {
      min: {
        x:canvas.buffer.x, 
        y:canvas.buffer.y
      },
      max: {
        x:canvas.buffer.x +this.length, 
        y:canvas.buffer.x +this.width
      }
    }
    this.corner ={
      r: 140,
      min:{
        x: this.bounds.min.x +140,
        y: this.bounds.min.y +140
      },
      max:{
        x: this.bounds.max.x -140,
        y: this.bounds.max.y -140
      }
    }
    this.line = {
      hGoal: canvas.buffer.x +55,
      hBlue: canvas.buffer.x +375,
      center: this.center.x,
      aBlue: canvas.buffer.x +625,
      aGoal: canvas.buffer.x +945
    }
    this.faceOff = {
      r:75,
      circle:{
        min:{
          x: canvas.buffer.x +155,
          y: canvas.buffer.y +112.5
        },
        max:{
          x: canvas.buffer.x +845,
          y: canvas.buffer.y +312.5
        }
      },
      spot:{
        min:{
          x: canvas.buffer.x +400,
          y: canvas.buffer.y +112.5
        },
        max:{
          x: canvas.buffer.x +600,
          y: canvas.buffer.y +312.5
        }
      }
    }
    this.goal = {
      width: 30,
      depth: 16,
      home:{
        min:{
          x: canvas.buffer.x +39,
          y: canvas.buffer.y +197.5
        },
        max:{
          x: canvas.buffer.x +55,
          y: canvas.buffer.y +227.5
        }
      },
      away:{
        min:{
          x: canvas.buffer.x +945,
          y: canvas.buffer.y +197.5
        },
        max:{
          x: canvas.buffer.x +961,
          y: canvas.buffer.y +227.5
        }
      }  
    }
  }
  pongDraw(){
    //drawSquare(minX,minY,maxX,maxY,fill,width=1,color="black")
    //drawLine(x, y, x2, y2, width=1, color="black"){
    drawSquare(rink.bounds.min.x,rink.bounds.min.y,rink.bounds.max.x,rink.bounds.max.y,false,this.pongLineWidth,"white")
    drawLine(rink.line.center,rink.bounds.min.y,rink.line.center,rink.bounds.max.y,rink.pongLineWidth,"darkRed")
    drawLine(rink.line.hGoal,rink.bounds.min.y,rink.line.hGoal,rink.bounds.max.y,rink.pongLineWidth,"white")
    drawLine(rink.line.aGoal,rink.bounds.min.y,rink.line.aGoal,rink.bounds.max.y,rink.pongLineWidth,"white")

  }
}