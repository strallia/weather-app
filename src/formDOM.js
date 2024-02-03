import { setCity } from './data';
import { setCurrentDataArr } from './contentDOM';
import { displayCity } from './titleDOM';

const input = document.querySelector('input[type=search]');
const searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  setCity(input.value);
  setCurrentDataArr();
  displayCity();
});

// TODO: remove these lines after testing
setCurrentDataArr();
displayCity();
