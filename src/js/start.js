import { readSettings } from './workWithJSON';
import { generatePagination } from './quizEdit';
import stats from './stats';

function timer() {
  const time = new Date();
  time.setMinutes(readSettings().time.min);
  time.setSeconds(readSettings().time.sec);

  const timerElem = document.getElementById('timer');
  timerElem.style.fontSize = '6vh';
  setInterval(() => {
    const sec = (time.getSeconds() < 10) ? `0${time.getSeconds()}` : time.getSeconds(); // if sec<10, then add '0' before sec
    timerElem.textContent = `${time.getMinutes()}:${sec}`;
    if (!(time.getMinutes() === 0 && time.getSeconds() === 0)) {
      time.setSeconds(time.getSeconds() - 1);
    } else {
      stats('failed');
    }
  }, 1000);
}

function startGame() {
  const config = readSettings();
  generatePagination(config.questionsQuantity);

  const timeValue = document.getElementById('timeValue'); // writes down timer value on modal
  if (config.timerOn) {
    timeValue.textContent = ` ${config.time.min}min ${config.time.sec}sec`;
  } else {
    timeValue.style.fontSize = '8vh';
  }

  const questCount = document.getElementById('questCount');
  questCount.textContent = ` ${config.questionsQuantity}`;// writes down number of questions on start dialog

  const btn = document.getElementById('button');
  btn.addEventListener('click', () => {
    const modal = document.getElementById('modal'); // hide modal
    modal.style.display = 'none';
    const container = document.getElementById('container'); // show main
    container.style.display = 'block';
    if (config.timerOn) {
      timer();
    }
  });
}

export default startGame;
