import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import "@fortawesome/fontawesome-free/scss/brands.scss"
import "@fortawesome/fontawesome-free/scss/solid.scss"
import "@fortawesome/fontawesome-free/scss/fontawesome.scss"
import '../styles/styles.scss';

// Globals
const player = {
  sessionTime: 25,
  breakTime: 5,
  time: {
    "minutes": 25,
    "seconds": 0
  },
  isPlaying: false,
  interval: undefined
}

// SessionTime Controls
const sessionDown = document.querySelector("#session-controls i.fa-chevron-circle-down");
const sessionUp = document.querySelector("#session-controls i.fa-chevron-circle-up");
const sessionTimeHolder = document.querySelector("#session-time-holder");

function updateSessionTimeText() {
  sessionTimeHolder.innerText = player.sessionTime;
  player.time.minutes = player.sessionTime;
  player.time.seconds = 0;
  player.updatePlayerTime();
}

function incrementSessionTime() {
  if (player.isPlaying == false) {
    player.sessionTime++;
    updateSessionTimeText();
    console.log(`player.sessionTime Incremented: ${player.sessionTime}`);
  }
}

function decrementSessionTime() {
  if (player.sessionTime > 1 && player.isPlaying == false) {
    player.sessionTime--;
    updateSessionTimeText();
    console.log(`player.sessionTime Decremented: ${player.sessionTime}`);
  }
}

sessionUp.addEventListener("click", incrementSessionTime);

sessionDown.addEventListener("click", decrementSessionTime);

// BreakTime Controls
const breakDown = document.querySelector("#break-controls i.fa-chevron-circle-down");
const breakUp = document.querySelector("#break-controls i.fa-chevron-circle-up");
const breakTimeHolder = document.querySelector("#break-time-holder");


function incrementBreakTime() {
  if (player.isPlaying == false) {
    player.breakTime++;
    breakTimeHolder.innerText = player.breakTime;
    console.log(`player.breakTime Incremented: ${player.breakTime}`);
  }
}

function decrementBreakTime() {
  if (player.breakTime > 1 && player.isPlaying == false) {
    player.breakTime--;
    breakTimeHolder.innerText = player.breakTime;
    console.log(`player.breakTime Decremented: ${player.breakTime}`);
  }
}

breakUp.addEventListener("click", incrementBreakTime);

breakDown.addEventListener("click", decrementBreakTime);

// Player Controls
const playerTimeHolder = document.querySelector("#player-time-holder");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");

player.updatePlayerTime = function() {
  let displayTime = addPadding(player.time.minutes) + ":" + addPadding(player.time.seconds);
  playerTimeHolder.innerText = displayTime;
}

function resetPlayer() {
  player.isPlaying = false;
  player.sessionTime = 25;
  player.breakTime = 5;

  if (player.interval != undefined) {
    clearInterval(player.interval);
  }

  updateSessionTimeText();
  breakTimeHolder.innerText = player.breakTime;
  console.log("reset");
}

resetBtn.addEventListener("click", resetPlayer);

function addPadding(num) {
  const stringNum = num.toString();
  if (num < 10) {
    return "0" + stringNum; 
  } else {
    return stringNum;
  }
}


function decrementTime () {
  if (player.time.seconds == 0) {
    player.time.seconds = 59;
    player.time.minutes--;
  } else {
    player.time.seconds--;
  }

  player.updatePlayerTime();
}


function play() {
  player.isPlaying = true;
  player.interval = setInterval(function() {
    decrementTime();
  }, 1000);
  console.log("playing");
}

function pause() {
  clearInterval(player.interval);
  console.log("paused");
}

function stop() {
  clearInterval(player.interval);
  player.isPlaying = false;
  updateSessionTimeText();
  console.log("stopped");
}

playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", pause);
stopBtn.addEventListener("click", stop);

// initialize
resetPlayer();