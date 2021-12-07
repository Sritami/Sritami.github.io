/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
async function bubbleSort(array) {
    var sorted = false;
    while (sorted === false) {
        //makes loop stop after all sorting done
        sorted = true;

        for(var i = 0; i < array.length - 1; i++) {
            if(array[i].value > array[i + 1].value) {
                //call swap function 
                swap(array, i, i + 1);
                sorted = false;

                //display sorting 
                updateCounter(bubbleCounter);
                await sleep();



            }
        }
    
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right) {
    //making greater than 1 to make sure actually have values to sort
  if (array.length > 1) {
      /* defining pivot index (a.k.a the marker for sorting either 
      on left side or right side) */
      var index = await partition(array, left, right);
    /*  if all the left values of the pivot index are less than it, 
     sort the values */
      if (left < index-1) {
        await quickSort(array, left, index-1);
      }
      /* if all values right of pivot index are greater than it, 
      sort the values  */
      if (right > index) {
        await quickSort(array, index, right);
      }

  } 


}


// TODOs 4 & 5: Implement partition
async function partition(array, left, right) {
    /* picks the middle value between left and right values as the pivot
    (it would be better for this to be random) */
   var pivot = array[Math.floor((right + left)/2)].value;
   
   
   /* searching for values that need to be swapped */
   while(left < right) {
       
    
        while(array[left].value < pivot) {
            /* shift a value of left until it finds a value greater than 
            the pivot value, if not, stays on left side */
            // array[left].value += 1;
            left++;
        }

        while(array[right].value > pivot) {
                /* shift a value of right until it finds a value less than 
            the pivot value, if not stays on right side */
            // array[right].value -= 1;
            right--;
                
        }

        if (left < right) {
            swap(array, left, right);
            updateCounter(quickCounter);
            await sleep();
        }

   }

   return left + 1;

   

}



// TODO 1: Implement swap
function swap(array, i, j) {
    //temp var keeps track of original var to reassign to second index again
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    drawSwap(array, i, j);
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}