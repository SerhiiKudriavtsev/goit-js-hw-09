function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;
let btnStartTimerId = null;
let btnStopTimerId = null;

const body = document.querySelector('body');
btnStop.setAttribute('disabled', true);
if (!btnStart.disabled) {
  btnStartTimerId = setInterval(() =>
    btnStart.style.backgroundColor = getRandomHexColor(), 100);
}

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', true);
  clearInterval(btnStartTimerId);
  btnStop.removeAttribute('disabled');
  btnStopTimerId = setInterval(() => 
    btnStop.style.backgroundColor = getRandomHexColor(), 100);
  timerId = setInterval(() => 
    body.style.backgroundColor = getRandomHexColor(), 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
  clearInterval(btnStopTimerId);
  btnStartTimerId = setInterval(() => 
    btnStart.style.backgroundColor = getRandomHexColor(), 100);
});