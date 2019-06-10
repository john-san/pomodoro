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
  inSession: false,
  isPlaying: false,
  onBreak: false,
  interval: undefined
}

const sessionType = document.querySelector("#session-type");

// SessionTime Controls
const sessionDown = document.querySelector("#session-controls i.fa-chevron-circle-down");
const sessionUp = document.querySelector("#session-controls i.fa-chevron-circle-up");
const sessionTimeHolder = document.querySelector("#session-time-holder");

player.updateSessionAndPlayerTime = () => {
  sessionTimeHolder.innerText = player.sessionTime;
  player.time.minutes = player.sessionTime;
  player.time.seconds = 0;
  player.updatePlayerTime();
}

player.updatePlayerTime = () => {
  let displayTime = addPadding(player.time.minutes) + ":" + addPadding(player.time.seconds);
  playerTimeHolder.innerText = displayTime;
}

player.incrementSessionTime = () => {
  if (player.inSession == false && player.sessionTime < 60) {
    player.sessionTime++;
    player.updateSessionAndPlayerTime();
    console.log(`player.sessionTime Incremented: ${player.sessionTime}`);
  }
}

player.decrementSessionTime = () => {
  if (player.sessionTime > 1 && player.inSession == false) {
    player.sessionTime--;
    player.updateSessionAndPlayerTime();
    console.log(`player.sessionTime Decremented: ${player.sessionTime}`);
  }
}

sessionUp.addEventListener("click", player.incrementSessionTime);
sessionDown.addEventListener("click", player.decrementSessionTime);

// BreakTime Controls
const breakDown = document.querySelector("#break-controls i.fa-chevron-circle-down");
const breakUp = document.querySelector("#break-controls i.fa-chevron-circle-up");
const breakTimeHolder = document.querySelector("#break-time-holder");

player.incrementBreakTime = () => {
  if (player.inSession == false && player.breakTime < 30) {
    player.breakTime++;
    breakTimeHolder.innerText = player.breakTime;
    console.log(`player.breakTime Incremented: ${player.breakTime}`);
  }
}

player.decrementBreakTime = () => {
  if (player.breakTime > 1 && player.inSession == false) {
    player.breakTime--;
    breakTimeHolder.innerText = player.breakTime;
    console.log(`player.breakTime Decremented: ${player.breakTime}`);
  }
}

breakUp.addEventListener("click", player.incrementBreakTime);
breakDown.addEventListener("click", player.decrementBreakTime);

// Player Controls
const playerTimeHolder = document.querySelector("#player-time-holder");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");



player.reset = () => {
  console.dir(player);
  player.inSession = false;
  player.isPlaying = false;
  player.sessionTime = 25;
  player.breakTime = 5;

  if (player.interval != undefined) {
    clearInterval(player.interval);
  }

  player.updateSessionAndPlayerTime();
  player.quitBreak();
  breakTimeHolder.innerText = player.breakTime;
  console.log("reset");
}

resetBtn.addEventListener("click", player.reset);

function addPadding(num) {
  const stringNum = num.toString();
  if (num < 10) {
    return "0" + stringNum; 
  } else {
    return stringNum;
  }
}

function timeOut() {
  return player.time.minutes == 0 && player.time.seconds == 0;
}

player.decrementTime = () => {
  if (timeOut() && player.onBreak) {
    player.stop();
  } else if (timeOut()) {
    player.startBreak();
  } else {
    if (player.time.seconds == 0) {
      player.time.seconds = 59;
      player.time.minutes--;
    } else {
      player.time.seconds--;
    }
  
    player.updatePlayerTime();
  }

}

player.startBreak = () => {
  console.log("Started Break");
  player.onBreak = true;
  sessionType.innerText = "Break";
  player.time.minutes = player.breakTime;
  player.time.seconds = 0;
  player.updatePlayerTime();
}

player.quitBreak = () => {
  if (player.onBreak) {
    player.onBreak = false;
    sessionType.innerText = "Session";
  }
}

player.play = () => {
  if (player.isPlaying == false) {
    player.inSession = true;
    player.isPlaying = true;
    player.interval = setInterval(function() {
      player.decrementTime();
    }, 1000);
    console.log("playing");
  }
}

player.pause = () => {
  if (player.isPlaying == true) {
    player.isPlaying = false;
    clearInterval(player.interval);
    console.log("paused");
  }
}

player.stop = () => {
  if (player.isPlaying == true) {
    player.quitBreak();
    clearInterval(player.interval);
    player.inSession = false;
    player.isPlaying = false;
    player.updateSessionAndPlayerTime();
    console.log("stopped");
  }
}



playBtn.addEventListener("click", player.play);
pauseBtn.addEventListener("click", player.pause);
stopBtn.addEventListener("click", player.stop);

// initialize
player.reset();