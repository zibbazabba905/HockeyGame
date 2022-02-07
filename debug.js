let debugToggle = false
function debugTest(testThing,time){
  if (!debugToggle){
    console.log(testThing);
    debugToggle=true;
    setTimeout(()=>{debugToggle = false}, time)
  }
}
