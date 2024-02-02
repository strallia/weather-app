import { setCity } from './data';
import { displayContent } from './contentDOM';
import { displayCity } from './titleDOM';

const input = document.querySelector('input');
const searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  setCity(input.value);
  displayContent();
  displayCity();
});
