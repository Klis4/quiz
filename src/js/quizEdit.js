function generatePagination(count) {
  const pagination = document.getElementById('pagination');
  for (let i = 0; i < count; i += 1) {
    pagination.insertAdjacentHTML('beforeEnd', `<span id="question${i + 1}" class="questionNumber" data-click>${i + 1}</span>`);
    console.log(`i = ${i}`);
  }
}

function randomQuestions(allQuestions, questionsNumConfig) {
  const arr = [];
  for (let i = 0; i < allQuestions; i += 1) {
    arr.push(i);
  }

  const sorted = arr.sort(() => {
    const val = Math.random() - 0.5;
    return val;
  });

  return sorted.slice(0, questionsNumConfig);
}

/*
  Write "str" to HTML element with id "id"
*/
function writeHTML(str, id) {
  const elem = document.getElementById(id);
  elem.textContent = str;
}

function getElement(id) {
  const elem = document.getElementById(id);
  return elem;
}

function writeQuestionAndAnswers(obj) {
  writeHTML(obj.question, 'question');
  obj.answers.forEach((elem, i) => {
    writeHTML(elem.text, `answer${i + 1}`);
    getElement(`rad${i + 1}`).value = i;
  });
}

export {
  writeQuestionAndAnswers as wrQuestAndAnsws,
  randomQuestions as randQuestions,
  generatePagination,
};
