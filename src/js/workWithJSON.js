import json from '../data.json';
import settings from '../config.json';

function questionsQuantity() {
  return json.length;
}

/*
  Read and return settings file
*/
function readSettings() {
  const obj = {};
  obj.questionsQuantity = settings.questionsQuantity;
  obj.time = {};
  obj.time.min = settings.time.min;
  obj.time.sec = settings.time.sec;
  obj.questionsToSuccess = settings.questionsToSuccess;
  obj.timerOn = settings.timerOn;

  return obj;
}

/*
  Function readQuestion read one question and answers with index "i"
*/
function readQuestion(i) {
  const obj = {};
  obj.question = json[i].question;
  obj.answers = [];

  json[i].answers.forEach((elem, j) => {
    obj.answers.push({ text: json[i].answers[j].text, isCorrect: !!json[i].answers[j].isCorrect });
  });
  return obj;
}

export { readQuestion as readQuest, questionsQuantity as questsQuantity, readSettings };
