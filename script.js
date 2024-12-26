const startButton = document.getElementById("counter");
const innerCircle = document.getElementById("inner-circle");
const title = document.querySelector("h1");
const dropDown = document.getElementById("exercise");
const inhaleSound = new Audio("./sounds/inhale.mp3")
const exhaleSound = new Audio("./sounds/exhale.mp3")
const endSound = new Audio("./sounds/two-chimes.mp3")
let selection = dropDown.value;
let selectedTime = document.querySelector('input[name="length"]:checked').value;
const bellSound = new Audio("./sounds/3min-bell.mp3")
let timeoutIds = []

function playBell() {
  bellSound.play()
  setTimeout(() => {bellSound.pause()}, 3000)
  
}

const breathingExercises = [
  {
    name: "Focus",
    description:
      "&#127919;Follow along with the timer to focus breathe.&#127919;",
    inhaleTimeInSeconds: 4,
    holdTimeOne: 4,
    exhaleTimeInSeconds: 4,
    holdTimeTwo: 4,
    bgColor: "url('./backgrounds/bullseye.png')",
  },
  {
    name: "Relaxation",
    description: "&#127811;Reduce stress and promote relaxation&#127811;",
    inhaleTimeInSeconds: 5,
    holdTimeOne: 7,
    exhaleTimeInSeconds: 8,
    holdTimeTwo: 0,
    bgColor: "url('./backgrounds/zen_garden.jpg')"
  },
  {
    name: "Energy_Boost",
    description: "&#128293;Increase alertness and energy!&#128293;",
    inhaleTimeInSeconds: 8,
    holdTimeOne: 0,
    exhaleTimeInSeconds: 1,
    holdTimeTwo: 0,
    bgColor: "url('./backgrounds/burn.png')",
  },
  {
    name: "Deep_Calm",
    description:
      "&#x1F9D8;&#x1F3FF;&#x200D;&#x2642;&#xFE0F;Enter a state of deep relaxation.&#x1F9D8;&#x1F3FF;&#x200D;&#x2642;&#xFE0F;",
    inhaleTimeInSeconds: 6,
    holdTimeOne: 0,
    exhaleTimeInSeconds: 9,
    holdTimeTwo: 0,
    bgColor: "url('./backgrounds/space.png')",
  },
  {
    name: "Sleep",
    description: "&#128564;Prepare your body and mind for sleep.&#128564;",
    inhaleTimeInSeconds: 7,
    holdTimeOne: 7,
    exhaleTimeInSeconds: 9,
    holdTimeTwo: 0,
    bgColor: "url('./backgrounds/bedroom.png')",
  },
];

let breathingStyle = breathingExercises.find(
  (style) => style.name.toLowerCase() === selection
);

document.getElementById("directions").innerHTML = breathingStyle["description"];
document.querySelector(".container").style.backgroundImage =
    breathingStyle.bgColor;

//Event Listener to change style
dropDown.addEventListener("change", function () {
  selection = dropDown.value;
  breathingStyle = breathingExercises.find(
    (style) => style.name.toLowerCase() === selection.toLowerCase()
  );
   document.getElementById("directions").innerHTML =
     breathingStyle["description"];
  document.querySelector(".container").style.backgroundImage =
    breathingStyle.bgColor;
  //console.log(breathingStyle)
});


function fillBar(transTime) {
  inhaleSound.play()
  innerCircle.style.transitionDuration = `${transTime}s`;
  innerCircle.style.height = "18em";
  innerCircle.style.width = "18em";
}

function emptyBar(transTime) {
  exhaleSound.play()
  innerCircle.style.transitionDuration = `${transTime}s`;
  innerCircle.style.height = "6em";
  innerCircle.style.width = "6em";
}

function activateTimer(exercise) {
  //function for calling repeated setTimeout functions. time is added to the same variable to mimmick a sleep function cleanly. seconds variable is multiplied by 1000 to simplify the argument.
  let milliseconds = 1000;
  innerCircle.style.transition = "inherit";
  function nextLine(action, seconds) {
    timeoutIds.push(setTimeout(action, milliseconds));
    milliseconds += seconds * 1000;
  }

  let inhaleTimeInSeconds, exhaleTimeInSeconds, holdTimeOne, holdTimeTwo;

  inhaleTimeInSeconds = exercise.inhaleTimeInSeconds;
  holdTimeOne = exercise.holdTimeOne;
  exhaleTimeInSeconds = exercise.exhaleTimeInSeconds;
  holdTimeTwo = exercise.holdTimeTwo;

  // console.log(
  //   exercise.inhaleTimeInSeconds,
  //   exercise.exhaleTimeInSeconds,
  //   exercise.holdTimeOne,
  //   exercise.holdTimeTwo
  // );

  counter.innerHTML = "Let's Begin";
  
  nextLine(() => {
    playBell()
    counter.innerHTML = "3"
  }, 1);
  nextLine(() => (counter.innerHTML = "2"), 1);
  nextLine(() => (counter.innerHTML = "1"), 1);

  //Until timer is up, do breathing exercise
  //fill bar
  //hold (optional)
  //empty bar
  //hold (optional)
  while (milliseconds < selectedTime * 60000 + 3) {
    //Breathe In
    nextLine(() => {
      counter.innerHTML = "Breathe In";
      fillBar(inhaleTimeInSeconds);
      //console.log(milliseconds)
    }, inhaleTimeInSeconds);

    //First Hold

    nextLine(() => {
      counter.innerHTML = "Hold";
    }, holdTimeOne);

    //Breath Out
    nextLine(() => {
      counter.innerHTML = "Breathe Out";
      emptyBar(exhaleTimeInSeconds);
    }, exhaleTimeInSeconds);

    //Second Hold
    nextLine(() => {
      counter.innerHTML = "Hold";
    }, holdTimeTwo);
  }
  //End with a compliment
  nextLine(() => {
    endSound.play()
    counter.innerHTML = "Great Job"
  }, 1);
  nextLine(() => {
    dropDown.style.pointerEvents = "all";
    dropDown.style.appearance = "";
  }, 1);
  console.log(timeoutIds)
}

// activate on button click
startButton.onclick = () => {
  if (counter.innerHTML == "Start" || counter.innerHTML == "Great Job") {
    //console.log("breathing:", breathingStyle);
    selectedTime = document.querySelector('input[name="length"]:checked').value;
    activateTimer(breathingStyle);
    dropDown.style.pointerEvents = "none";
    dropDown.style.appearance = "none";
  } 
};

//restart button
document.getElementById("restart").onclick = () => {
  timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
  timeoutIds = []
  dropDown.style.pointerEvents = "all";
  dropDown.style.appearance = "";
  counter.innerHTML = "Start"
  innerCircle.style.transition = "none";
  innerCircle.style.height = "6em";
  innerCircle.style.width = "6em";
};
