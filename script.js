const startButton = document.getElementById("counter");
const innerCircle = document.getElementById("inner-circle");
const title = document.querySelector("h1");
const dropDown = document.getElementById("breathing-exercise-selector");
const selection = dropDown.value;




const breathingExercises = [
  {
    name: "Focus",
    description: "&#127919;Follow along with the timer to focus breathe.&#127919;",
    inhaleTimeInSeconds: 4,
    holdTimeOne: 4,
    exhaleTimeInSeconds: 4,
    holdTimeTwo: 4
  },
  {
    name: "Relaxation",
    description: "&#127811;Reduce stress and promote relaxation&#127811;",
    inhaleTimeInSeconds: 5,
    holdTimeOne: 7,
    exhaleTimeInSeconds: 8,
    holdTimeTwo: 1
  },
  {
    name: "Energy Boost",
    description: "&#128293;Increase alertness and energy!&#128293;",
    inhaleTimeInSeconds: 8,
    holdTimeOne: 1,
    exhaleTimeInSeconds: 1,
    holdTimeTwo: 1
  },
  {
    name: "Deep Calm",
    description: "&#x1F9D8;&#x1F3FF;&#x200D;&#x2642;&#xFE0F;Enter a state of deep relaxation.&#x1F9D8;&#x1F3FF;&#x200D;&#x2642;&#xFE0F;",
    inhaleTimeInSeconds: 6,
    holdTimeOne: 1,
    exhaleTimeInSeconds: 9,
    holdTimeTwo: 1
  },
  {
    name: "Sleep",
    description: "&#128564;Prepare your body and mind for sleep.&#128564;",
    inhaleTimeInSeconds: 7,
    holdTimeOne: 7,
    exhaleTimeInSeconds: 9,
    holdTimeTwo: 1
  }
];

let breathingStyle = breathingExercises.find(style => style.name.toLowerCase() === selection)
document.getElementById("directions").innerHTML = breathingStyle["description"]
dropDown.addEventListener('change', function() {
  const selectedStyle = dropDown.value;
  breathingStyle = breathingExercises.find(style => style.name.toLowerCase() === selectedStyle.toLowerCase());
  document.getElementById("directions").innerHTML = breathingStyle["description"]
  console.log(breathingStyle)
});

//need to fix inner circle transistion durations

function fillBar(transTime) {
  innerCircle.style.transitionDuration = toString(transTime) + 'ms';
  innerCircle.style.height = "18em";
  innerCircle.style.width = "18em";
}

function emptyBar(transTime) {
  innerCircle.style.transitionDuration = toString(transTime) + 'ms';
  innerCircle.style.height = "6em";
  innerCircle.style.width = "6em";
};

function activateTimer(style) {
//function for calling repeated setTimeout functions. time is added to the same variable to mimmick a sleep function cleanly. seconds variable is multiplied by 1000 to simplify the argument.
  let milliseconds = 1000;
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
  for (let i=0; i<3; i++) {
    //Breathe In
    nextLine(() => {
      counter.innerHTML = "Breathe In"
      fillBar(9000)  
    }, style.inhaleTimeInSeconds);

    //First Hold
    
      nextLine(() => {
        counter.innerHTML = "Hold" 
      }, style.holdTimeOne);
    

    //Breath Out
    nextLine(() => {
      counter.innerHTML = "Breathe Out"
      emptyBar(0)  
    }, style.exhaleTimeInSeconds);

    //Second Hold
      nextLine(() => {
        counter.innerHTML = "Hold" 
      }, style.holdTimeTwo);
  }
  //End with a compliment
  nextLine(() => counter.innerHTML = "Great Job", 1);
}



// activate on button click
startButton.onclick = () => {
    if (counter.innerHTML == "Start" || counter.innerHTML == "Great Job") {
      console.log("breathing:", breathingStyle)
      activateTimer(breathingStyle);
    };
  };

//restart button
document.getElementById('restart').onclick = () => {
  location.reload();
}