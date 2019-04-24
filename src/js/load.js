import { wrQuestAndAnsws } from './quizEdit';
import { readQuest } from './workWithJSON';
import { changeNumColor } from './controls'; // it must be fixed!!!!


function loadAtStart(questionsOrder) {
  wrQuestAndAnsws(readQuest(questionsOrder[0]));
  changeNumColor(document.getElementById('question1'));
}

export default loadAtStart;
