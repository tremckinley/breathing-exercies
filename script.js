const startButton = document.getElementById("counter");
const innerCircle = document.getElementById("inner-circle");
const title = document.querySelector("h1");
let milliseconds = 1000;

function fillBar() {
  innerCircle.style.height = "18em";
  innerCircle.style.width = "18em";
}

function emptyBar() {
  innerCircle.style.height = "6em";
  innerCircle.style.width = "6em";
};

function activateTimer(breathTime) {
//function for calling repeated setTimeout functions. time is added to the same variable to mimmick a sleep function cleanly. seconds variable is multiplied by 1000 to simplify the argument.
  function nextLine(action, seconds) {
  setTimeout(action, milliseconds);
  milliseconds += seconds*1000;
  };

  counter.innerHTML = "Let's Begin"
    nextLine(() => counter.innerHTML = "3", 1);
    nextLine(() => counter.innerHTML = "2", 1);
    nextLine(() => counter.innerHTML = "1", 1);
    
    //FOR 3 rotations, do breathing exercise
    //fill bar over 4 seconds
    //hold
    //empty bar over 4 seconds
    //hold
  for (let i=0; i<2; i++) {
    nextLine(() => {
      counter.innerHTML = "Breathe In"
      fillBar()  
    }, breathTime);
    nextLine(() => {
      counter.innerHTML = "Hold" 
    }, breathTime);
    nextLine(() => {
      counter.innerHTML = "Breathe Out"
      emptyBar()  
    }, breathTime);
    nextLine(() => {
      counter.innerHTML = "Hold" 
    }, breathTime);
  }
  //End with a compliment
  nextLine(() => counter.innerHTML = "Great Job", 1);
}


// activate on button click
startButton.onclick = () => activateTimer(4);
