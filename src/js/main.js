import { wrQuestAndAnsws } from './quizEdit';
import { readQuest, readSettings } from './workWithJSON';
import Control from './controls';


function main() {
  console.log(`questions: ${readSettings.questionsQuantity}`);

  const control = new Control();
  control.highlightQuestionNum(document.getElementById('question1'), 'orange');
  wrQuestAndAnsws(readQuest(control.questsOrder[0]));

  const prev = document.getElementById('prev');
  prev.addEventListener('click', control.btnPrevClick); // Event: prevBtn click

  const next = document.getElementById('next');
  next.addEventListener('click', control.btnNextClick); // Event: nextBtn click

  document.addEventListener('click', (event) => { // Event: click to pagination number
    if (!event.target.hasAttribute('data-click')) return;
    if (control.answeredQuestions.indexOf(+event.target.id.slice(-1) - 1) > -1) return;

    const elem = event.target;

    control.highlightQuestionNum(elem, 'orange', '#bba6c1');
    control.changeQuestionAndAnswersByNum(elem);
  });

  const questionBlock = document.getElementById('questionsBlock');
  questionBlock.addEventListener('click', (event) => { // Event: click to radio buttom
    if (!event.target.hasAttribute('radio-click')) return;
    const elem = event.target;
    setTimeout(() => {
      elem.checked = false;
    }, 200);
    control.acceptAnswer(elem);
  });
}

export default main;
