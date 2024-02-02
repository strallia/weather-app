import { key } from './key';

const baseURL = 'https://www.weatherapi.com/docs/#';
const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=`;
const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=`;

// Current Weather
const fetchCurrentWeather = async () => {
  const city = 'sacramento';
  try {
    const response = await fetch(currentWeatherUrl + city, { mode: 'cors' });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const getCurrentWeatherData = async (fetchResponse) => {
  const data = await fetchResponse.json();
  return data;
};

fetchCurrentWeather()
  .then((response) => getCurrentWeatherData(response))
  .then((data) => console.log(data));
