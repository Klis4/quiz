import { readSettings, readQuest, questsQuantity } from './workWithJSON';
import { wrQuestAndAnsws, randQuestions } from './quizEdit';
import stats from './stats';

export default class Control {
  constructor() {
    const data = {
      currentQuestion: 0, // (number)
      lastQuestion: 0,
      correctAnswers: 0,
      answeredQuestions: [],
      settings: readSettings(),
    };

    const questsOrder = randQuestions(questsQuantity(), readSettings().questionsQuantity); // questions order after random(array)
    
    this.data = data; // variables
    this.questsOrder = questsOrder;

    this.highlightQuestionNum = this.highlightQuestionNum.bind(this); // functions
    this.highlightQuestionNumByBtn = this.highlightQuestionNumByBtn.bind(this);
    this.btnNextClick = this.btnNextClick.bind(this);
    this.btnPrevClick = this.btnPrevClick.bind(this);
    this.changeQuestionAndAnswersByNum = this.changeQuestionAndAnswersByNum.bind(this);
    this.nextQuestionAnsweredCheck = this.nextQuestionAnsweredCheck.bind(this);
    this.rightAnswers = this.rightAnswers.bind(this);
  }

  nextQuestionAnsweredCheck() { // search next unanswered question
    while (this.data.answeredQuestions.indexOf(this.data.currentQuestion + 1) > -1 || this.data.currentQuestion + 1 > this.data.settings.questionsQuantity - 1) {
      if (this.data.currentQuestion + 1 < this.data.settings.questionsQuantity - 1) {
        this.data.currentQuestion += 1;
      } else {
        this.data.currentQuestion = -1;
      }
    }
  }

  highlightQuestionNum(elem, currColor, prevColor) {
    if (this.data.lastQuestion) {
      this.data.lastQuestion.style.color = prevColor;
    }

    const element = elem;

    element.style.color = currColor;
    this.data.lastQuestion = elem;
  }

  highlightQuestionNumByBtn() { // changing question number color after click on button
    const elem = document.getElementById(`question${this.data.currentQuestion + 1}`);

    this.highlightQuestionNum(elem, 'orange', '#bba6c1');
  }

  btnNextClick() {
    this.nextQuestionAnsweredCheck();
    this.data.currentQuestion += 1;
    console.log(this.data.currentQuestion);

    wrQuestAndAnsws(readQuest(this.questsOrder[this.data.currentQuestion]));
    this.highlightQuestionNumByBtn();
  }

  btnPrevClick() {
    while (this.data.answeredQuestions.indexOf(this.data.currentQuestion - 1) > -1 || this.data.currentQuestion - 1 < 0) {
      if (this.data.currentQuestion - 1 > 0) {
        this.data.currentQuestion -= 1;
      } else {
        this.data.currentQuestion = this.data.settings.questionsQuantity;
      }
    }
    this.data.currentQuestion -= 1;
    wrQuestAndAnsws(readQuest(this.questsOrder[this.data.currentQuestion]));
    this.highlightQuestionNumByBtn(this.data.currentQuestion);
  }

  rightAnswers() {
    if (this.data.correctAnswers >= this.data.settings.questionsToSuccess) {
      stats('success');
    } else {
      stats('failed');
    }
  }

  acceptAnswer(elem) {
    this.data.answeredQuestions.push(this.data.currentQuestion);

    if (!(this.data.answeredQuestions.length === this.questsOrder.length)) {
      setTimeout(() => { // timer is needed to create a delay between switching questions
        if (readQuest(this.questsOrder[this.data.currentQuestion]).answers[+elem.value].isCorrect) {
          // if answer correct add 1 to correct answered questions
          this.data.correctAnswers += 1;
        }
        this.data.lastQuestion = document.getElementById(`question${this.data.currentQuestion + 1}`);

        this.highlightQuestionNum(this.data.lastQuestion, '#83ff00'); // #83ff00 - light green
        this.data.lastQuestion.style.opacity = 0.5;
        this.nextQuestionAnsweredCheck();

        this.data.currentQuestion += 1;

        this.highlightQuestionNum(document.getElementById(`question${this.data.currentQuestion + 1}`), 'orange');
        wrQuestAndAnsws(readQuest(this.questsOrder[this.data.currentQuestion]));
      }, 200);
    } else {
      this.rightAnswers();
    }
  }

  changeQuestionAndAnswersByNum(elem) {
    const id = +elem.id.slice(-1) - 1;
    wrQuestAndAnsws(readQuest(this.questsOrder[id]));
    this.data.currentQuestion = id;
  }
}
