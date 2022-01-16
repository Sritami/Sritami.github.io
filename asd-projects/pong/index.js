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

  function CreateObject($id) {
    var gameItem = {};
    gameItem.id = $id;
    gameItem.x = parseFloat($($id).css('left'));
    gameItem.y = parseFloat($($id).css('top'));
    gameItem.speedX = 0;
    gameItem.speedY = 0;
    gameItem.height = parseFloat($($id).height());
    gameItem.width = parseFloat($($id).width());
    return gameItem;
  }

 //Game Item Objects - Initialization
 var ball = CreateObject('#ball');
 var rightPaddle = CreateObject('#rightPaddle');
 var leftPaddle = CreateObject('#leftPaddle');


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
  var updatedScorePlayer1 = 0;   //if ball hits rights wall
  var updatedScorePlayer2 = 0; //if ball hits left wall
  startBall();  


  
               



  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball); 
    moveObject(rightPaddle); 
    moveObject(leftPaddle);
    wallCollisionBall(ball);
    wallCollision(rightPaddle);
    wallCollision(leftPaddle);
    doCollide(ball, rightPaddle);
    doCollide(ball, leftPaddle);
    finalizeScore();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.TOP) {
      rightPaddle.speedY = -5; 
    }

    else if (event.which === KEY.BOTTOM) {
      rightPaddle.speedY = 5;  
    }

    else if (event.which === KEY.W) {
      leftPaddle.speedY = -5; 
    }

    else if (event.which === KEY.S) {
      leftPaddle.speedY = 5; 
    }
  


  }

function handleKeyUp(event) {
    if (event.which === KEY.TOP) {
        rightPaddle.speedY = 0; 
      }
  
    else if (event.which == KEY.BOTTOM) {
        rightPaddle.speedY = 0; 
      }

    else if (event.which == KEY.W) {
        leftPaddle.speedY = 0; 
      }

    else if (event.which == KEY.S) {
        leftPaddle.speedY = 0; 
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
  }

 
  //updates the game item's x & y positions as speed increases each frame
  function moveObject(object) {
    object.x = object.x + object.speedX;
    object.y = object.y + object.speedY; 
    $(object.id).css('left', object.x);
    $(object.id).css('top', object.y);
  }

  //wall collision specifically for the ball
  function wallCollisionBall(object) {

    //left wall
    if (object.x < BOARD_LEFT) {
      //change speed to positive x 
        object.speedX = object.speedX * -1; 

        //update player 2 score
        updatedScorePlayer2 += 1;
        $("#player2Score").text(updatedScorePlayer2); 

        //reset ball
        startBall();
        

    //right wall 
    } else if ((object.x + object.width) > BOARD_WIDTH) {
      //change speed to negative x
       object.speedX = -object.speedX;

       //update player 2 score
       updatedScorePlayer1 += 1;
       $("#player1Score").text(updatedScorePlayer1);

       //reset ball
       startBall();

   //bottom wall     
   } else if ((object.y + object.height) > BOARD_HEIGHT) {
    //change speed to negative y
       object.speedY = -object.speedY;
       

    //top wall   
   } else if (object.y < BOARD_TOP) {
     //change speed to positive y
       object.speedY = object.speedY * -1; 
      
   }
  }


  // wall collision for paddles 
  function wallCollision(object) {
    if (object.y > BOARD_HEIGHT - object.height) {
      // - change speed to positive x 
       object.y = BOARD_HEIGHT - object.height;
       //object.speedY = 0; 
        
    } else if (object.y < BOARD_TOP) {
     // top wall  - change speed to positive 
     object.y = BOARD_TOP;
      
   }
  }

  // if two objects collide, the first object is bounced back
  function doCollide(obj1, obj2) {
    obj1.left = obj1.x;
    obj1.top = obj1.y;
    obj1.right = obj1.x + $(obj1.id).width();
    obj1.bottom = obj1.y + $(obj1.id).height();
    
    obj2.left = obj2.x;
    obj2.top = obj2.y;
    obj2.right = obj2.x + $(obj2.id).width();
    obj2.bottom = obj2.bottom = obj2.y + $(obj2.id).height();

    if (obj2.right > obj1.left && obj2.left < obj1.right &&
      obj2.bottom > obj1.top && obj2.top < obj1.bottom) {
       obj1.speedX = -obj1.speedX;
     }
     

  }

   function finalizeScore() {
     //if either player reaches a score of 10, games ends
     if (updatedScorePlayer1 == 10 || updatedScorePlayer2 == 10) {
       endGame();
     }
   }



  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
