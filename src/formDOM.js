import { setCity, logData } from './apiCalls';

const input = document.querySelector('input');
const searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  setCity(input.value);
  logData();
});
