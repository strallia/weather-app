import { setCity } from './data';
import { displayWeatherContent } from './contentDOM';
import { displayCity } from './titleDOM';
import Search from './images/search.png';
import { hideWarningLabel } from './warningDOM';

const form = document.querySelector('form');
const input = document.querySelector('input[type=text]');
const searchBtn = document.querySelector('button');

input.addEventListener('input', hideWarningLabel);

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  setCity(input.value);
  displayWeatherContent();
  displayCity();
  form.reset();
});

const displaySearchIcon = () => {
  const img = document.createElement('img');
  img.src = Search;
  searchBtn.appendChild(img);
};
displaySearchIcon();

// TODO: remove these lines after testing
displayWeatherContent();
displayCity();
