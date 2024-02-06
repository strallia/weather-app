import { setCity } from './data';
import { displayWeatherContent } from './contentDOM';
import { displayCity } from './titleDOM';
import Search from './images/search.png';

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

const displaySearchIcon = () => {
  const img = document.createElement('img');
  img.src = Search;
  searchBtn.appendChild(img);
};
displaySearchIcon();

// TODO: remove these lines after testing
displayWeatherContent();
displayCity();
