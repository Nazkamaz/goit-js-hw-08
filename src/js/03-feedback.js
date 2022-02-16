import throttle from 'lodash.throttle';

const formRef = document.querySelector('form');
const inputEmail = formRef.elements.email;
const textareaText = formRef.elements.message;

const localStorageKey = 'feedback-form-state';
basicStorage();

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput, 500));

function onFormInput() {
  const formData = {
    email: inputEmail.value,
    message: textareaText.value,
  };

  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}


function basicStorage() {
  const currLocStor = localStorage.getItem(localStorageKey);

  const parsLocStor = JSON.parse(currLocStor);

  if (!parsLocStor) {
    return;
  } else {
inputEmail.value = parsLocStor.email;
textareaText.value = parsLocStor.message
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  if (!inputEmail.value  || !textareaText.value) {
    window.alert('one or both of the fields are empty!');
    return;
  }
    console.log({ email: inputEmail.value, message: textareaText.value });
  event.currentTarget.reset();
  localStorage.removeItem(localStorageKey);
}