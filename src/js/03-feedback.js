import throttle from 'lodash.throttle';

const formRef = document.querySelector('form');
const inputEmail = formRef.elements.email;
const textareaText = formRef.elements.message;

const localStorageKey = 'feedback-form-state';
const storageObj = {
  email: '',
  message: '',
};
basicStorage();

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput, 500));

function basicStorage() {
  const currLocStor = localStorage.getItem(localStorageKey);

  const parsLocStor = JSON.parse(currLocStor);

  if (!parsLocStor) {
    localStorage.setItem(localStorageKey, JSON.stringify(storageObj));
  } else {
    populateEmail();
    populateTextarea();
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  if (inputEmail.value === '' || textareaText.value === '') {
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

  const parsLocStorCurr = JSON.parse(locStorCurr);

  if (parsLocStorCurr.email) {
    inputEmail.value = parsLocStorCurr.email;
  }
}

function populateTextarea() {
  const locStorCurr = localStorage.getItem(localStorageKey);
  const parsLocStorCurr = JSON.parse(locStorCurr);
  if (parsLocStorCurr.message) {
    textareaText.value = parsLocStorCurr.message;
  }
}

function onFormInput(event) {
  const formValue = event.target.value;

  const currLocStor = localStorage.getItem(localStorageKey);

  const parsLocStor = JSON.parse(currLocStor);

  if (!parsLocStor) {
    localStorage.setItem(localStorageKey, JSON.stringify(storageObj));

    const locStor = localStorage.getItem(localStorageKey);
    const parsLocStor = JSON.parse(locStor);
    if (event.target.name === 'email') {
      parsLocStor.email = formValue;
    } else if (event.target.name === 'message') {
      parsLocStor.message = formValue;
    }
    localStorage.setItem(localStorageKey, JSON.stringify(parsLocStor));
  } else {
    if (event.target.name === 'email') {
      parsLocStor.email = formValue;
    } else if (event.target.name === 'message') {
      parsLocStor.message = formValue;
    }
    localStorage.setItem(localStorageKey, JSON.stringify(parsLocStor));
  }
}
