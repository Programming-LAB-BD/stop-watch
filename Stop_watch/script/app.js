// Import all item
import Recorde from "./Recorde.js";

// setup document's reference
const hourElement = document.querySelector("#hour .body p");
const minuteElement = document.querySelector("#minute .body p");
const secondeElement = document.querySelector("#seconde .body p");
const m_secondeElement = document.querySelector("#mili_seconde .body p");
const startElement = document.querySelector("#start");
const pauseElement = document.querySelector("#pause");
const addRecorde = document.querySelector("#addRecorde");
const recordes = document.querySelector("#info ul");
const reset_btn = document.querySelector("#reset_btn");
const item_of_info_list = "<button>x</button>";

// setup working variable
let hour = 0;
let minute = 0;
let seconde = 0;
let m_seconde = 0;
let start = false;
let pause = false;
let info = [];

// mili seconde incrementer function
function m_secondeIncrementer() {
  /* 
  here first i'm checking the mili seconde is smaller than 99 or not.
  if the mili seconde is smalller than 99, It will be increment.
  otherwise it will be reassign by 0 and call the secondeIncrementer function.
  finally the function will return.
  */

  m_seconde < 99 ? m_seconde++ : ((m_seconde = 0), secondeIncrementer());
  return;
}

// seconde incrementer function
function secondeIncrementer() {
  /* 
  here first i'm checking the seconde is smaller than 59 or not.
  if the seconde is smalller than 59, It will be increment.
  otherwise it will be reassign by 0 and call the minuteIncrementer function.
  finally the function will return.
  */

  seconde < 59 ? seconde++ : ((seconde = 0), minuteIncrementer());
  return;
}

// minute incrementer function
function minuteIncrementer() {
  /* 
  here first i'm checking the minute is smaller than 59 or not.
  if the minute is smalller than 59, It will be increment.
  otherwise it will be reassign by 0 and call the hourIncrementer function.
  finally the function will return.
  */

  minute < 59 ? minute++ : ((minute = 0), hourIncrementer());
  return;
}

// hour incrementer function
function hourIncrementer() {
  // here just i'm increment the hour and return the function.
  hour++;
  return;
}

// Starting stop watch functionality
function startTimer() {
  // here i'm calling the m_secondeIncrementer function.
  m_secondeIncrementer();

  // here i'm printing all timer data into DOM.
  m_secondeElement.innerHTML = m_seconde < 10 ? `0${m_seconde}` : m_seconde;
  secondeElement.innerHTML = seconde < 10 ? `0${seconde}` : seconde;
  minuteElement.innerHTML = minute < 10 ? `0${minute}` : minute;
  hourElement.innerHTML = hour < 10 ? `0${hour}` : hour;
}

// Stoping stop watch functionality
function stopTimer(timerInterval) {
  hour = 0;
  minute = 0;
  seconde = 0;
  m_seconde = 0;
  hourElement.innerHTML = "00";
  minuteElement.innerHTML = "00";
  secondeElement.innerHTML = "00";
  m_secondeElement.innerHTML = "00";
  pause = false;
  pauseElement.innerHTML = "Pause";
  clearInterval(timerInterval);
}

// Single Recorde removing functionality
function recordeRemover() {
  // forEach method applied on recorde array.
  info.forEach((singleRecorde, index) => {
    // here i'm adding the event listener of single recorde
    singleRecorde.element.children.item(0).addEventListener("click", () => {
      // here i'm remove the li element from UI
      singleRecorde.element.remove();

      // here i'm remove the li element from storage/array
      info = info.filter((remover) => {
        return remover !== singleRecorde;
      });

      /* 
      here i'm looking the storage/array is empty or not.
      if the array is empty the reset button will be hide from UI.
      */
      if (info.length === 0) {
        reset_btn.style.display = "none";
      }
    }); // eventListener here ended
  }); // forEach method here ended

  // recordeRemover here ended
}

// Multiple Recorde removing functionality
function multiRecordeRemover() {
  // here i'm removing all recorde from storage/array
  info = [];

  // here i'm removing all recorde from UI/(ul element)
  recordes.innerHTML = "";

  // here i'm hiding the Reset button from UI.
  reset_btn.style.display = "none";
}

// Recorde adding functionality
function recordeAdder() {
  // here i'm checking the stop whtch is start or not
  if (!start) return;

  // here i'm showing the Reset button in UI
  reset_btn.style.display = "block";

  /* here i'm creating the recorde object by Recorde class, which i've created in another file. */
  const newRec = new Recorde(hour, minute, seconde, m_seconde);

  // here i'm creating the li element for UI
  let li = document.createElement("li");
  li.innerHTML = `${newRec.hour}.${newRec.minute}.${newRec.seconde}.${newRec.m_seconde} ${item_of_info_list}`;

  // here i'm setting the li element into Recorde class.
  newRec.element = li;

  // here i'm adding the li element into storage/array.
  info.push(newRec);

  // here i'm adding the li element into UI/(ul element)
  recordes.appendChild(li);

  // here i'm removing the single recorde from UI and storage/array
  recordeRemover();
}

// Setup Start eventListerner
startElement.addEventListener("click", () => {
  // here i'm reversing the start variable
  start = !start;

  // here i'm setting the Start and Stop text in UI button
  start
    ? (startElement.innerHTML = "Stop")
    : (startElement.innerHTML = "Start");

  // here i'm setting the Interval and in the interval i'm calling the start/stop/pause/resume functionality
  let timer = setInterval(() => {
    if (start) {
      if (!pause) {
        startTimer();
      } else {
        return;
      }
    } else {
      stopTimer(timer);
    }
  }, 10);
});

// Setup Pause eventListerner
pauseElement.addEventListener("click", () => {
  /* 
  here i'm looking the timer is start or not.
  if the timer is not start the function will return
  */
  if (!start) return;

  // here i'm reversing the pause variable
  pause = !pause;

  // here i'm setting the Pause and Resume text in UI button
  pause
    ? (pauseElement.innerHTML = "Resume")
    : (pauseElement.innerHTML = "Pause");
});

// Setup Add Recorde eventListerner
addRecorde.addEventListener("click", () => recordeAdder());

// Setup Add Recorde eventListerner
reset_btn.addEventListener("click", () => multiRecordeRemover());
