import './styles.css';
import './data';
import './formDOM';
import './dateDOM';
import './toggleThemeDOM';
import './toggleUnitDOM';
import './viewModeDOM';
import { displayWeatherContent } from './contentDOM';
import { displayCity } from './titleDOM';

// Display default city weather
displayWeatherContent();
displayCity();
