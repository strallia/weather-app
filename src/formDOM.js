import { setCity } from './data';
import { displayWeatherContent } from './contentDOM';
import { displayCity } from './titleDOM';

const form = document.querySelector('form');
const input = document.querySelector('input[type=text]');
const searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  setCity(input.value);
  displayWeatherContent();
  displayCity();
  form.reset();
});

// TODO: remove these lines after testing
displayWeatherContent();
displayCity();
