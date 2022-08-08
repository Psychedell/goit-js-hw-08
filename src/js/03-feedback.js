import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const emailInput = document.querySelector('.feedback-form input');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onFormElInput);
// form.addEventListener(
//   'input',
//   throttle(e => {
//     formData[e.target.name] = e.target.value;
//     console.log(formData);
//   }, 1000)
// );

const STORAGE_KEY = 'feedback-form-state';

const formData = {};
getInputValue();

function onFormElInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getInputValue() {
  const inputValue = localStorage.getItem(STORAGE_KEY);
  const inputValueParse = JSON.parse(inputValue);

  if (inputValueParse) {
    emailInput.value = inputValueParse.email;
    textarea.value = inputValueParse.message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  if (textarea.value !== '' || emailInput.value !== '') {
    console.log(formData);
  }

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
