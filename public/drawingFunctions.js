function drawLine(x, y, x2, y2, width=1, color="black"){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.stroke();
    ctx.restore();
}
//old function drawSquare(x,y,x2,y2,fill,width=1,color="black"){
function drawSquare(minX,minY,maxX,maxY,fill,width=1,color="black"){
    ctx.restore();
    ctx.beginPath();
    ctx.rect(minX,minY,maxX-minX,maxY-minY);
    if(!fill){
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    else{
        ctx.fillStyle= color;
        ctx.fill();
        ctx.closePath();
    }
}
function drawCircle(x,y,r,fill,width=1,color="black",start=0,end=Math.PI*2){
    ctx.restore();
    ctx.beginPath();
    ctx.arc(x, y, r, start,end,false)
    if(!fill){
        ctx.lineWidth= width;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    else{
        ctx.fillStyle= fill;
        ctx.fill();
        ctx.closePath();
    }
}
function drawDot (x,y,color="black"){
    ctx.restore();
    ctx.beginPath();
    ctx.arc(x,y,2,0,Math.PI*2,false);
    ctx.fillStyle= color;
    ctx.fill();
}