import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ position: 'center-center' });

const form = document.querySelector('.form');

form.addEventListener('submit', createPromises);

function createPromises(event) {
  event.preventDefault();

  let {
    elements: { delay, step, amount },
  } = event.currentTarget;

  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);
  
  for (let position = 1; position <= amount; position += 1) {    
    createPromise(position, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
        })
      .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
        });
    delay += step;
      // console.log(position, delay);
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        };
      }, delay);
    });
  };
}

