import { setCity } from './apiCalls';
import { displayContent } from './contentDOM';

const input = document.querySelector('input');
const searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  setCity(input.value);
  displayContent();
});
