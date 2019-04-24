import json from '../data.json';

function questionsQuantity() {
  return json.length;
}

/*
  Function readQuestion read one question and answers with index "i"
*/
function readQuestion(i) {
  const obj = {};
  obj.question = json[i].question;
  obj.answers = [];

  for (let j = 0; j < json[i].answers.length; j += 1) {
    obj.answers.push({ text: json[i].answers[j].text, isCorrect: !!json[i].answers[j].isCorrect });
  }
  return obj;
}

export { readQuestion as readQuest, questionsQuantity as questsQuantity };
