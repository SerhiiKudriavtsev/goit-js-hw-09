import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const value = document.querySelectorAll('.value');

let selectedDate = "";
let currentDate = "";
let dateDifference = "";
let timerId = null;
btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    localStorage.setItem('selectedData', selectedDates[0]);
    selectedDate = new Date(localStorage.getItem('selectedData'));
    btn.disabled = false;
    dateInput.disabled = false;
    if (selectedDate <= new Date()) {
      Notify.init({position: 'center-center', closeButton: false})
      Notify.failure("Please choose a date in the future");
      btn.disabled = true;
      return;
    };
    for (v of value) {
      v.style.color = '#00008b';
    };
  },
}

const fp = flatpickr("#datetime-picker", options);

btn.addEventListener('click', timer);

function timer() {
  btn.disabled = true;
  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => { counter() }, 1000);
}

function counter() { 
  selectedDate = new Date(localStorage.getItem('selectedData'));
  currentDate = new Date();
  dateDifference = selectedDate - currentDate;
  if (dateDifference > 0) {
    convertMs(dateDifference);
    dateInput.disabled = true;
  }
  else {
    Notify.init({ position: 'center-center' });
    Notify.success('Congratulations! Your happy future has arrived!');
    clearInterval(timerId);
    Notify.init({position: 'center-center', closeButton: true})
    Notify.info('Shall we choose the date of an even better future?');
    dateInput.disabled = false;
  };
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  daysEl.textContent = addLeadingZero(days.toString());
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  hoursEl.textContent = addLeadingZero(hours.toString());
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  minutesEl.textContent = addLeadingZero(minutes.toString());
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  secondsEl.textContent = addLeadingZero(seconds.toString());
  colorChange(seconds);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, "0");
};

function colorChange(el) {
  for (v of value) {
    if (el === 5) v.style.color = '#de05ff';
    if (el === 4) v.style.color = '#f21505';
    if (el === 3) v.style.color = '#ff9f05';
    if (el === 2) v.style.color = '#fffb05';
    if (el === 1) v.style.color = '#aeeb07';
    if (el === 0) v.style.color = '#22eb07';
  }
}