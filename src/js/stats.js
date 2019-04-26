function generateWindow(type) {
  const elem = {
    modal: document.getElementById('modal'),
    button: document.getElementById('button'),
    time: document.getElementById('time'),
    question: document.getElementById('quantityQuestions'),
    container: document.getElementById('container'),
    text: document.getElementById('text'),
  };


  elem.text.style.fontSize = '20vh';
  elem.button.textContent = 'Restart';
  elem.time.textContent = '';
  elem.question.textContent = '';
  elem.container.style.display = 'none';

  switch (type) {
    case 'success': {
      elem.text.textContent = 'Success!!!';
      elem.text.style.color = '#6ad61d';
      break;
    }
    case 'failed': {
      elem.text.textContent = 'Failed!!!';
      elem.text.style.fontSize = '25vh';
      elem.text.style.color = '#ff5454';
      break;
    }
    default: return;
  }
  elem.modal.style.display = 'block';
  elem.button.addEventListener('click', () => {
    document.location.reload(true);
  });
}

export default generateWindow;
