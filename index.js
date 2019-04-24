import { randQuestions } from './src/js/quizEdit';
import { questsQuantity } from './src/js/workWithJSON';
import load from './src/js/load'; // it must be fixed!!!!

const questionsOrder = randQuestions(questsQuantity());
console.log(questionsOrder);

load(questionsOrder);

export { questionsOrder as questsOrder };
