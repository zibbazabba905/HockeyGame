
//rewrite?
function objectCollisionDetect(thisObject, otherObject){
  if (thisObject.bounds.max.x > otherObject.bounds.min.x 
  &&  thisObject.bounds.max.y > otherObject.bounds.min.y 
  &&  thisObject.bounds.min.x < otherObject.bounds.max.x 
  &&  thisObject.bounds.min.y < otherObject.bounds.max.y
    ){
    return true;
  }
};

function puckCollisionDetect(puck){
  for (unit of unitArray){
    if (id === unit.teamID){
      if(objectCollisionDetect(puck,unit) && (!puck.bounceCheck)){
        let math = (puck.pos.subtract(unit.pos));
        let right = (math.x >0)? true : false;
        socket.emit("bounce", right);
        puck.bounceCheck = true;
        setTimeout(() => {puck.bounceCheck = false}, 60);
      };
    };
  };
};