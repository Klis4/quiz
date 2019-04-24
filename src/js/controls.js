import { questsQuantity, readQuest } from './workWithJSON';
import { wrQuestAndAnsws } from './quizEdit';
import { questsOrder } from '../../index'; // it must be fixed!!!!!!

let i = 0; // current question id
let lastQuestion; // current question number element


function changeQuestionNumColor(elem) {
  const element = elem;
  if (lastQuestion) {
    lastQuestion.style.color = '#bba6c1';
  }

  element.style.color = 'orange';
  lastQuestion = elem;
}

function highlightQuestionNumByBtn(id) {
  const elem = document.getElementById(`question${id + 1}`);
  console.log(`element: ${elem}, question${id + 1}`);
  changeQuestionNumColor(elem);
}

function btnNextClick() {
  if (i < questsQuantity() - 1) {
    i += 1;
  } else {
    i = 0;
  }
  console.log(i);
  wrQuestAndAnsws(readQuest(questsOrder[i]));
  highlightQuestionNumByBtn(i);
}

function btnPrevClick() {
  if (i > 0) {
    i -= 1;
  } else {
    i = questsQuantity() - 1;
  }
  console.log(i);
  wrQuestAndAnsws(readQuest(questsOrder[i]));
  highlightQuestionNumByBtn(i);
}

function changeQuestionAndAnswersByNum(elem) {
  wrQuestAndAnsws(readQuest(questsOrder[+elem.id.slice(-1) - 1]));
}

const prev = document.getElementById('prev');
prev.addEventListener('click', btnPrevClick);

const next = document.getElementById('next');
next.addEventListener('click', btnNextClick);


document.addEventListener('click', (event) => {
  if (!event.target.hasAttribute('data-click')) return;

  const elem = event.target;

  changeQuestionNumColor(elem);
  changeQuestionAndAnswersByNum(elem);
});

export { changeQuestionNumColor as changeNumColor };
