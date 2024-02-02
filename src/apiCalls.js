import { key } from './key';

const baseURL = 'https://www.weatherapi.com/docs/#';
const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=`;
const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=`;

// Set city
let city;

const setCity = (string) => {
  city = string;
};

// Current Weather
const fetchCurrentWeather = async () => {
  try {
    const response = await fetch(currentWeatherUrl + city, { mode: 'cors' });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const processData = async (data) => {
  const {
    temp_c: tempC,
    temp_f: tempF,
    is_day: isDay,
    condition: { text: condition },
  } = data.current;
  const { name: cityName } = data.location;

  return { tempC, tempF, isDay, condition, cityName };
};

const logData = () => {
  fetchCurrentWeather()
    .then((response) => processData(response))
    .then((data) => console.log(data));
};

export { setCity, logData };
