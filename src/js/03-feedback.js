import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('.feedback-form input');
const textareaText = document.querySelector('.feedback-form textarea');
const submitButton = document.querySelector('.feedback-form button');
const localStorageKey = 'feedback-form-state';
populateEmail();
populateTextarea();

inputEmail.addEventListener('input', throttle(onEmailInput, 500));
textareaText.addEventListener('input', throttle(onTextareaInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const sendData = localStorage.getItem(localStorageKey);
  console.log(JSON.parse(sendData));
  event.currentTarget.reset();
  localStorage.removeItem(localStorageKey);
}

function populateEmail() {
  const locStorCurr = localStorage.getItem(localStorageKey);
  const parsLocStorCurr = JSON.parse(locStorCurr);
  if (parsLocStorCurr && parsLocStorCurr.email) {
    const savedEmail = parsLocStorCurr.email;
    if (savedEmail) {
      inputEmail.value = savedEmail;
    }
  }
}

function populateTextarea() {
  const locStorCurr = localStorage.getItem(localStorageKey);
  const parsLocStorCurr = JSON.parse(locStorCurr);
  if (parsLocStorCurr && parsLocStorCurr.message) {
    const savedTextarea = parsLocStorCurr.message;
    if (savedTextarea) {
      textareaText.value = savedTextarea;
    }
  }
}

function onEmailInput(event) {
  const emailValue = event.target.value;
  const locStorVal = {
    email: emailValue,
    message: '',
  };
  localStorage.setItem(localStorageKey, JSON.stringify(locStorVal));
}

function onTextareaInput(event) {
  const textareaValue = event.target.value;

  const currentLocStor = localStorage.getItem(localStorageKey);
  const parsCurentLocStor = JSON.parse(currentLocStor);

  parsCurentLocStor.message = textareaValue;

  const finalLocStor = localStorage.setItem(localStorageKey, JSON.stringify(parsCurentLocStor));
}
