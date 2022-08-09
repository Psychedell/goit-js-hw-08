import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const emailInput = document.querySelector('.feedback-form input');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormElInput, 500));

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
getInputValue();

function onFormElInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getInputValue() {
  const inputValueParse = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (inputValueParse) {
    if (inputValueParse.email) {
      emailInput.value = inputValueParse.email;
    }

    if (inputValueParse.message) {
      textarea.value = inputValueParse.message;
    }
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  if (textarea.value === '' || emailInput.value === '') {
    return alert('Required fields');
  }
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  formData = {};
}
