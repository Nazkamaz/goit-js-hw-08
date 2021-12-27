import throttle from 'lodash.throttle';

const elements = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('.feedback-form input'),
  textareaText: document.querySelector('.feedback-form textarea'),
  submitButton: document.querySelector('.feedback-form button'),
};
const localStorageKey = 'feedback-form-state';
const storageObj = {
  email: '',
  message: '',
};
basicStorage();
// populateEmail();
// populateTextarea();

elements.form.addEventListener('submit', onFormSubmit);
elements.inputEmail.addEventListener('input', throttle(onEmailInput, 500));
elements.textareaText.addEventListener('input', throttle(onTextareaInput, 500));

function basicStorage() {
  const currLocStor = localStorage.getItem(localStorageKey);

  const parsLocStor = JSON.parse(currLocStor);
  //   console.log(parsLocStor.email);
  //   console.log(parsLocStor.message);
  if (!parsLocStor) {
    localStorage.setItem(localStorageKey, JSON.stringify(storageObj));
  } else {
    populateEmail();
    populateTextarea();
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  if (elements.inputEmail.value === '' || elements.textareaText.value === '') {
    window.alert('one or both of the fields are empty!');
    return;
  }
  const sendData = localStorage.getItem(localStorageKey);
  console.log(JSON.parse(sendData));
  event.currentTarget.reset();
  localStorage.removeItem(localStorageKey);
}

function populateEmail() {
  const locStorCurr = localStorage.getItem(localStorageKey);
  //   console.log(locStorCurr);
  const parsLocStorCurr = JSON.parse(locStorCurr);
  //   console.log(parsLocStorCurr);

  if (parsLocStorCurr.email) {
    elements.inputEmail.value = parsLocStorCurr.email;
  }
}

function populateTextarea() {
  const locStorCurr = localStorage.getItem(localStorageKey);
  const parsLocStorCurr = JSON.parse(locStorCurr);
  if (parsLocStorCurr.message) {
    elements.textareaText.value = parsLocStorCurr.message;
  }
}

function onEmailInput(event) {
  const emailValue = event.target.value;
  const currLocStor = localStorage.getItem(localStorageKey);
  //   console.log(currLocStor);
  const parsLocStor = JSON.parse(currLocStor);
  //   console.log(parsLocStor);

  if (!parsLocStor) {
    localStorage.setItem(localStorageKey, JSON.stringify(storageObj));

    const locStor = localStorage.getItem(localStorageKey);
    const parsLocStor = JSON.parse(locStor);
    parsLocStor.email = emailValue;
    localStorage.setItem(localStorageKey, JSON.stringify(parsLocStor));
  } else {
    parsLocStor.email = emailValue;
    localStorage.setItem(localStorageKey, JSON.stringify(parsLocStor));
  }
}

function onTextareaInput(event) {
  const currTextareaValue = event.target.value;
  const currentLocStor = localStorage.getItem(localStorageKey);
  //   console.log(currentLocStor);
  const parsCurrentLocStor = JSON.parse(currentLocStor);

  if (!parsCurrentLocStor) {
    localStorage.setItem(localStorageKey, JSON.stringify(storageObj));
    const locStor = localStorage.getItem(localStorageKey);
    const parsLocStor = JSON.parse(locStor);
    parsLocStor.message = currTextareaValue;
    localStorage.setItem(localStorageKey, JSON.stringify(parsLocStor));
  } else {
    parsCurrentLocStor.message = currTextareaValue;
    localStorage.setItem(localStorageKey, JSON.stringify(parsCurrentLocStor));
  }
}
