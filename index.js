/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  var boardWidth = $("#board").width();	// the maximum X-Coordinate of the screen
  var boardHeight = $("#board").height(); //the maximum Y-Coordinate of the screen

  var positionX = 0; // the x-coordinate location for the box
  var speedX = 0; // the speed for the box along the y-axis
  var positionY = 0; // the x-coordinate location for the box
  var speedY = 0; // the speed for the box along the y-axis

  
  // Game Item Objects
  var KEY = {
    "RIGHT": 39,
    "LEFT": 37,
    "TOP": 38,
    "BOTTOM": 40,
  }
  

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);  
  $(document).on('keyup', handleKeyUp);                            // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem(); 
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.RIGHT) {
      speedX = 5; 
    }

    else if (event.which === KEY.LEFT) {
      speedX = -5; 
    }

    else if (event.which === KEY.TOP) {
      speedY = -5; 
    }

    else if (event.which === KEY.BOTTOM) {
      speedY = 5; 
    }
  


  }

  function handleKeyUp(event) {
    if (event.which === KEY.RIGHT) {
        speedX = 0; 
      }
  
    else if (event.which == KEY.LEFT) {
        speedX = 0; 
      }

    else if (event.which == KEY.TOP) {
        speedY = 0; 
      }

    else if (event.which == KEY.BOTTOM) {
        speedY = 0; 
      }



  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function repositionGameItem() {
    positionX += speedX; // update position of box along the x-axis
    positionY += speedY; // update position of box along the y-axis
  
  }


  function redrawGameItem() {
    $("#gameItem").css("left", positionX);    // draw box in new location, positionX pixels away from "left"
    $("#gameItem").css("top", positionY);    // draw box in new location, positionY pixels away from "top"
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
