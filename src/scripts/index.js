import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import "@fortawesome/fontawesome-free/scss/brands.scss"
import "@fortawesome/fontawesome-free/scss/solid.scss"
import "@fortawesome/fontawesome-free/scss/fontawesome.scss"
import '../styles/styles.scss';

// Globals
let sessionTime;
let breakTime;

// SessionTime Controls
const sessionDown = document.querySelector("#session-controls i.fa-chevron-circle-down");
const sessionUp = document.querySelector("#session-controls i.fa-chevron-circle-up");
const sessionTimeHolder = document.querySelector("#session-time-holder");

function updateSessionTimeText() {
  sessionTimeHolder.innerText = sessionTime;
  playerTimeHolder.innerText = addPadding(sessionTime);
}

function incrementSessionTime() {
  sessionTime++;
  updateSessionTimeText();
  console.log(`sessionTime Incremented: ${sessionTime}`);
}

function decrementSessionTime() {
  if (sessionTime > 0) {
    sessionTime--;
    updateSessionTimeText();
    console.log(`sessionTime Decremented: ${sessionTime}`);
  }
}

sessionUp.addEventListener("click", incrementSessionTime);

sessionDown.addEventListener("click", decrementSessionTime);

// BreakTime Controls
const breakDown = document.querySelector("#break-controls i.fa-chevron-circle-down");
const breakUp = document.querySelector("#break-controls i.fa-chevron-circle-up");
const breakTimeHolder = document.querySelector("#break-time-holder");


function incrementBreakTime() {
  breakTime++;
  breakTimeHolder.innerText = breakTime;
  console.log(`breakTime Incremented: ${breakTime}`);
}

function decrementBreakTime() {
  if (breakTime > 0) {
    breakTime--;
    breakTimeHolder.innerText = breakTime;
    console.log(`breakTime Decremented: ${breakTime}`);
  }
}

breakUp.addEventListener("click", incrementBreakTime);

breakDown.addEventListener("click", decrementBreakTime);

// Player Controls
const playerTimeHolder = document.querySelector("#player-time-holder");
const resetBtn = document.querySelector("#resetBtn");

function resetPlayer() {
  sessionTime = 25;
  breakTime = 5;

  updateSessionTimeText();
  breakTimeHolder.innerText = breakTime;
  console.log("Player reset");
}

resetBtn.addEventListener("click", resetPlayer);

function addPadding(num) {
  const stringNum = num.toString();
  return stringNum + ":00";
}

// initialize
resetPlayer();