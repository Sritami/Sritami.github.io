$(document).ready(function() {
    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// INITIALIZATION ////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    var FPS = 60;
    
    var playerID = "#player1";
    var playerX = 100;
    var playerY = 100;
    var playerVelocityX = 0;
    var playerVelocityY = 0;

   //setting board width and board height variables 
    const boardWidth = $('#board').width();
    const boardHeight = $('#board').height();
  
    //creating variables for "magic numbers" / keycodes
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;
    const W_KEY = 87;
    const A_KEY = 65;
    const S_KEY = 83;
    const D_KEY = 68;
    const C_KEY = 67;

   //refactored in factory function:
    // var player2 = {
    //     'velocityX' : 0,
    //     'velocityY' : 0, 
    //     'locationX' : parseFloat($("#player2").css('left'));
    //     'locationY' : parseFloat($("#player2").css('top'));
    // }
  
    //creating factory function to create both player objects 
   function Player($id) {
     var object = {};
     object.velocityX = 0;
     object.velocityY = 0;
     object.locationX = parseFloat($($id).css('left'));
     object.locationY = parseFloat($($id).css('top'));
     object.width = $($id).width();
     object.id = $id;
     return object;
   }
   
  //initializing two player objects 
   var player1 = Player("#player1");
   var player2 = Player("#player2"); 
  
    

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////// CORE LOGIC //////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    setInterval(newFrame, 1000 / FPS); // execute newFrame() 60 times per second

	$(document).on('keydown', setPlayerVelocity); // execute setPlayerVelocity() in response to keydown events
	$(document).on('keyup', stopPlayerVelocity);  // execute stopPlayerVelocity() in response to keydown events
    
    function newFrame() {
        //refactored in move helper function: 
        // player1.locationX += player1.velocityX;
        // player1.locationY += player1.velocityY;
        // player2.locationX += player2.velocityX;
        // player2.locationY += player2.velocityY;
      
        move(player1);
        move(player2);
        rePosition(player1);
        rePosition(player2);
        keepInBounds(player1);
        keepInBounds(player2);
			
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
	

//repositioning the player objects on screen with css
function rePosition(player) {
    //refactored:
    // $(playerID).css("left", playerX);
    // $(playerID).css("top", playerY);
    $(player.id).css("left", player.locationX);
    $(player.id).css("top", player.locationY);
 
  
  }

  //updating values in player objects to move 
  function move(player) {
    player.locationX += player.velocityX;
    player.locationY += player.velocityY;
  }

  //prevent both players from leaving the bounds of the board
  function keepInBounds(player) {
    if (player.locationX < 0) {
      player.locationX = 0;
    } else if (player.locationX + player.width > boardWidth) {
      player.locationX = boardWidth - player.width;
    }
    
    if (player.locationY < 0) {
      player.locationY = 0;
    } else if (player.locationY + player.width > boardHeight) {
      player.locationY = boardHeight - player.width;
    }
    
  }
  
  
  
  
    

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// KEYBOARD FUNCTIONS //////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    /** 
    Key codes:
    - left: 37
    - up: 38
    - right: 39
    - down: 40
    - w: 87
    - a: 65
    - s: 83
    - d: 68
    - c: 67
    */
    
    function setPlayerVelocity(event) {
        if (event.which === UP_KEY) {
           player1.velocityY = -5; 
        }
      
        if (event.which === DOWN_KEY) {
           player1.velocityY = 5; 
        }
        if (event.which === LEFT_KEY) {
           player1.velocityX = -5; 
        }
        if (event.which === RIGHT_KEY) {
           player1.velocityX = 5; 
        }
      
        if (event.which === W_KEY) {
           player2.velocityY = -5; 
        }
      
        if (event.which === A_KEY) {
           player2.velocityX = -5; 
        }
      
        if (event.which === S_KEY) {
           player2.velocityY = 5; 
        }
      
        if (event.which === D_KEY) {
           player2.velocityX = 5; 
        }
      
  
    }


    function stopPlayerVelocity(event) {
        if (event.which === UP_KEY || event.which === DOWN_KEY) {
           player1.velocityY = 0; 
        }

        if (event.which === LEFT_KEY || event.which === RIGHT_KEY) {
           player1.velocityX = 0; 
        }
      
      
        if (event.which === W_KEY || event.which === S_KEY) {
           player2.velocityY = 0; 
        }

        if (event.which === A_KEY || event.which === D_KEY) {
           player2.velocityX = 0; 
        }
    }

}); // DO NOT DELETE










