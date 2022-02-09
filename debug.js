let debugToggle = false
function debugTest(testThing,time){
  if (!debugToggle){
    console.log(testThing);
    debugToggle=true;
    setTimeout(()=>{debugToggle = false}, time)
  }
}



//server side
...
  socket.on("ping", () => {
    socket.emit("pong");
  });
...
//client side
let pingTimerToggle = false;
let pong = false;
let pingTime = 0;
socket.on("pong", () => {
  pong = true;
});
function pingTest() {
  if (pong) {
    console.log(Math.round(pingTime * 16.6));
    pingTime = 0;
    pong = false;
  }
  if (!pingTimerToggle) {
    socket.emit("ping");
    setTimeout(() => {
      pingTimerToggle = false;
    }, 1000);
    pingTimerToggle = true;
  }
  pingTime++;
}
