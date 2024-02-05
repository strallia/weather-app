import { setCity } from './data';
import { displayWeatherContent } from './contentDOM';
import { displayCity } from './titleDOM';

const input = document.querySelector('input[type=search]');
const searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  setCity(input.value);
  displayWeatherContent();
  displayCity();
});

// TODO: remove these lines after testing
displayWeatherContent();
displayCity();
