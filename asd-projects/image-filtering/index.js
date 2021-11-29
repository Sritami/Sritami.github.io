// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilterNoBackground(reddify);
    applyFilterNoBackground(increaseGreenByBlue);
    applyFilter(increaseGreenByBlue);
  



    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here

function applyFilter(filterFunction) {
    //nested loop - iterates through rows of image array
    for (var r = 0; r < image.length; r++) {

        //iterates through each column of each row in image array  
        for (var c = 0; c < image[r].length; c++) {
            //assigning rgbString to each value of image array
             var rgbString = image[r][c];
             //convert rgbString to array
             var rgbNumbers = rgbStringToArray(rgbString);  
             //applying filter
             filterFunction(rgbNumbers);
            //convert rgbNumbers back into string 
             var addNewColors = rgbArrayToString(rgbNumbers);
            //each value of image array has updated values after filterFunction
             image[r][c] = addNewColors;

          }
        
      }
}


// TODO 6: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
   //background color - image[0][0] --> string
   var background = image[0][0];


    //nested loop - iterates through rows of image array
    for (var r = 0; r < image.length; r++) {

        //iterates through each column of each row in image array
        for (var c = 0; c < image[r].length; c++) {
            //assigning rgbString to each value of image array 
            var rgbString = image[r][c];


            //convert rgbString to array
             var rgbNumbers = rgbStringToArray(rgbString); 
             
       
            /*applying filter to values that are not 
            equal to background color ([0][0]), which is (150,150,150), apply filter */
            if (background !== rgbString) {
                filterFunction(rgbNumbers);
            }

            //convert rgbNumbers back into string 
             var addNewColors = rgbArrayToString(rgbNumbers);
             //each value of image array has updated values after filterFunction
             image[r][c] = addNewColors;        

    
          }
        
      }
    }




      


// TODO 3 & 5: Create filter functions
function reddify(arr) {
    /* changing all index 0's to have a value of 255 to make
    image more red */
    arr[RED] = 255;

}

function decreaseBlue(arr) {
    /* subtracting 50 from value of index 2 (arr[BLUE]) to make image 
    less blue */
    arr[BLUE] = keepInBounds(arr[BLUE] - 50);
    
}

function increaseGreenByBlue(arr) {
    /*adding value of the index 2 (arr[BLUE]) of the image array
    to index 1 (arr[GREEN]) to make image more green */
    arr[GREEN] = keepInBounds(arr[BLUE] + arr[GREEN]);
}


function keepInBounds(num) {
    //creating temp variable to make sure num is not less than 0
    var limit = Math.max(num, 0);
    //returning 255 if num is over 255 
    return Math.min(255, limit);
}


