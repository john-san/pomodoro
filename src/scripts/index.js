import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import "@fortawesome/fontawesome-free/scss/brands.scss"
import "@fortawesome/fontawesome-free/scss/solid.scss"
import "@fortawesome/fontawesome-free/scss/fontawesome.scss"
import '../styles/styles.scss';

// SessionTime Controls
const sessionDown = document.querySelector("#session-controls i.fa-chevron-circle-down");
const sessionUp = document.querySelector("#session-controls i.fa-chevron-circle-up");
const sessionTimeHolder = document.querySelector("#session-time-holder");
let sessionTime = 25;

function incrementSessionTime() {
  sessionTime++;
  sessionTimeHolder.innerText = sessionTime;
  console.log(`sessionTime Incremented: ${sessionTime}`);
}

function decrementSessionTime() {
  sessionTime--;
  sessionTimeHolder.innerText = sessionTime;
  console.log(`sessionTime Decremented: ${sessionTime}`);
}

sessionUp.addEventListener("click", incrementSessionTime);

sessionDown.addEventListener("click", decrementSessionTime);

// BreakTime Control
const breakDown = document.querySelector("#break-controls i.fa-chevron-circle-down");
const breakUp = document.querySelector("#break-controls i.fa-chevron-circle-up");
const breakTimeHolder = document.querySelector("#break-time-holder");
let breakTime = 5;

function incrementBreakTime() {
  breakTime++;
  breakTimeHolder.innerText = breakTime;
  console.log(`breakTime Incremented: ${breakTime}`);
}

function decrementBreakTime() {
  breakTime--;
  breakTimeHolder.innerText = breakTime;
  console.log(`breakTime Decremented: ${breakTime}`);
}

breakUp.addEventListener("click", incrementBreakTime);

breakDown.addEventListener("click", decrementBreakTime);