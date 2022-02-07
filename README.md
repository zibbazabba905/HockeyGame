# HockeyGame
this was supposed to be my hello world


Hockey 0.13.1 
-started 2/Feb/22
pong framework to build my hockey game on top of

codesandbox requires every file to be named index.js in order to run
tried converting js files to modules, but require(module) works in node, but does not work in javascript or html so they cannot be shared between them. 

top folder:
(server.js)index.js - the server javascript run in node
rink.js - rink positons
vector2d.js - math stuff from EKW

public folder:
index.html - html page
index.js - main javascript
calculationFunctions - hitbox stuff
drawingFunctions - my first module, I should convert it to a class and import/export format
gameState - main game state machine
overlay.js - info/text boxes
puck.js - the puck
rink.js - the background and rink positions. all notes for full rink drawing
unit.js - the paddles
vector2d.js - math stuff from EKW

previous version notes

//version 11.5 1/11/21
    //https://jsfiddle.net/m3Ly1foa/1/
    //https://jsfiddle.net/8sjnw3au/
    //shooting seems slow
    //movement seems chugging (just me?)
//version 11.4
    //312 collision checks per tick just on collision I know I know
    //changed physics to vectors
    //changed ALL of physics to vectors
    //cleaned up some stuff around user class
    //time to finally work on adding back in AI

    /*
        //Array.prototype.some()
        //Returns true if at least one element in this array satisfies the provided testing function.
        //Math.random() * (maximum - minimum) + minimum
    */



//version 11 start 12/21/2020
    //rewrite and reorganize 
    //maybe learn async?
    //switch to xy direction and vector direction instead of atan2



//version 10
    //stable
    //added "controls" layout
    //added center AI script
    //debug grid array was a bust
    //need to refine center AI script
    //need to add NPC scripts
    //AI can grab puck from goal sometimes
    //puck velocity does not reset when game resets, feature?

        //https://jsfiddle.net/zdn0yrbu/
    //added players
    //added player bump
    //added puck bump
    //added "reset" function

    //time to make the debug grid array and AI want

//version 9.wtf
//https://jsfiddle.net/zkyoap7e/
//version 9 start 12/07/20
    //adding class arrays
    //making classes interact with themselves 
    //rewriting script calls
    //https://jsfiddle.net/3o70wend/

//version 8 start 12/06/20
    //stable
    //conversion from "let function" to classes
    //fixed score problem
    //wall hit problem with goals, drawing from left to right top to bottom,goals back to front

//version 7 **** 12/06/20
    //stable
//version 7 notes
    //goal hasn't been converted to "let function" system
//version 6 **** 12/01/20
    //https://jsfiddle.net/n7et4qbv/
//version 6 notes
    //right goal score increases by 100 sometimes
    //corner math is messy
    //puck moves slightly off
    //puck.shot physics problem

//version 4 
2015 11/09/20

//version 3
version 2
version 1
//start 0047 10/31/20

