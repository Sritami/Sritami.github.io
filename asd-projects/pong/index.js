/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects - Factory Function 
  function Ball($id) {
    var ball = {};
    ball.id = $id;
    ball.x = parseFloat($($id).css('left'));
    ball.y = parseFloat($($id).css('top'));
    ball.speedX = 0;
    ball.speedY = 0;
    return ball;
  }

  function RightPaddle($id) {
    var rightPaddle = {};
    rightPaddle.id = $id;
    rightPaddle.x = parseFloat($($id).css('left'));
    rightPaddle.y = parseFloat($($id).css('top'));
    rightPaddle.speedX = 0;
    rightPaddle.speedY = 0;
    return rightPaddle;
  }

  function LeftPaddle($id) {
    var leftPaddle = {};
    leftPaddle.id = $id;
    leftPaddle.x = parseFloat($($id).css('left'));
    leftPaddle.y = parseFloat($($id).css('top'));
    leftPaddle.speedX = 0;
    leftPaddle.speedY = 0;
    return leftPaddle;
  }

 //Game Item Objects - Initialization
 var ball = Ball('#ball');
 var rightPaddle = RightPaddle('#rightPaddle');
 var leftPaddle = LeftPaddle('#leftPaddle');


 //Game Item Objects - keyboard events 
 var KEY = {
  "TOP": 38,
  "BOTTOM": 40,
  "W": 87,
  "S": 83
}

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);       
  $(document).on('keyup', handleKeyUp);                          



  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.TOP) {
      speedX = -5; 
    }

    else if (event.which === KEY.BOTTOM) {
      speedY = 5;  
    }

    else if (event.which === KEY.W) {
      speedY = -5; 
    }

    else if (event.which === KEY.S) {
      speedY = 5; 
    }
  


  }

function handleKeyUp(event) {
    if (event.which === KEY.TOP) {
        speedX = 0; 
      }
  
    else if (event.which == KEY.BOTTOM) {
        speedX = 0; 
      }

    else if (event.which == KEY.W) {
        speedY = 0; 
      }

    else if (event.which == KEY.S) {
        speedY = 0; 
      }



  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
