
/* using this later
function edgeDetect(object){
  if (object.bounds.max.x > rink.bounds.min.x 
  &&  object.bounds.max.y > rink.bounds.min.y 
  &&  object.bounds.min.x < rink.bounds.max.x 
  &&  object.bounds.min.y < rink.bounds.max.y
    ){
    console.log("blah")
    return true
  }
}
*/

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

function objectCollisionDetect(thisObject, otherObject){
  if (thisObject.bounds.max.x > otherObject.bounds.min.x 
  &&  thisObject.bounds.max.y > otherObject.bounds.min.y 
  &&  thisObject.bounds.min.x < otherObject.bounds.max.x 
  &&  thisObject.bounds.min.y < otherObject.bounds.max.y
    ){
    return true
  }
}

function puckCollisionDetect(puck){
  for (unit of unitArray){
    if (id === unit.teamID){
      if(objectCollisionDetect(puck,unit) && (!puck.bounceCheck)){
        //puck.velocity.x = puck.velocity.x *-1
        let math = (puck.pos.subtract(unit.pos))
        let right = (math.x >0)? true : false;
        socket.emit("bounce", right);
        puck.bounceCheck = true;
        setTimeout(() => {puck.bounceCheck = false}, 60);
      }
    }
  }
}