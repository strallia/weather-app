import { displayWeatherContent } from './contentDOM';
import { setUnits, getUnits } from './data';

const unitToggle = document.querySelector('input.unit-toggle');

const toggleUnits = () => {
  if (getUnits() === 'imperial') {
    setUnits('metric');
  } else {
    setUnits('imperial');
  }
  displayWeatherContent();
};

unitToggle.addEventListener('click', toggleUnits);
