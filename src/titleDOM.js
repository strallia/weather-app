import { getCity } from './data';

const titleContainer = document.querySelector('.title-container');

const displayCity = () => {
  const city = getCity();
  titleContainer.textContent = city.toUpperCase();
};

export { displayCity };
