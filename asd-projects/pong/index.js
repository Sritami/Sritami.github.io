/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const BOARD_LEFT = 0;
  const BOARD_TOP = 0; 
  
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
  startBall();  


  
               



  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    //move ball
    moveObject(ball); 
    moveObject(rightPaddle); 
    moveObject(leftPaddle);
    wallCollision(ball);

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

  //gives ball starting point at center and intitial speed
  function startBall() {
      ball.x = 150;
      ball.y = 150;
      var randomNum1 = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
      var randomNum2 = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
      ball.speedX = randomNum1;
      ball.speedY = randomNum2;
      console.log('start ball is called');
  }

 
  //updates the game item's x & y positions as speed increases each frame
  function moveObject(object) {
    object.x = object.x + object.speedX;
    object.y = object.y + object.speedY; 
    $(object.id).css('left', object.x);
    $(object.id).css('top', object.y);
  }

  function wallCollision(object) {
    console.log(BOARD_WIDTH);
    if (object.x < BOARD_LEFT) {
      // left wall  - change speed to positive x
  
        console.log('left wall collided');    
        object.speedX = object.speedX * -1;  
        
    } else if (object.x > BOARD_WIDTH) {
      console.log()
      //right wall - change speed to negative x
       console.log('right wall collided'); 
       object.speedX = -object.speedX;


   } else if (object.y > BOARD_HEIGHT) {
       //bottom wall - change speed to negative y
       console.log('bottom wall collided');
       object.speedY = -object.speedY;

   } else if (object.y < BOARD_TOP) {
     // top wall  - change speed to positive y
       console.log('top wall collided');
       object.speedY = object.speedY * -1; 
      
   }
  }





  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
