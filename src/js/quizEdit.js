
function randomQuestions(count) {
  const arr = [];
  for (let i = 0; i < count; i += 1) {
    arr.push(i);
  }

  return arr.sort(() => {
    const val = Math.random() - 0.5;
    return val;
  });
}

/*
  Write "str" to HTML element with id "id"
*/
function writeHTML(str, id) {
  const elem = document.getElementById(id);
  elem.textContent = str;
}


function writeQuestionAndAnswers(obj) {
  writeHTML(obj.question, 'question');
  obj.answers.forEach((elem, i) => {
    // console.log(`answer${i + 1}`);
    writeHTML(elem.text, `answer${i + 1}`);
  });
}

export {
  writeQuestionAndAnswers as wrQuestAndAnsws,
  randomQuestions as randQuestions,
};
