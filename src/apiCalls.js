import { key } from './key';

const baseURL = 'https://www.weatherapi.com/docs/#';
const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=`;
const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=`;

// Current Weather
const fetchCurrentWeather = async () => {
  const city = 'sacramento';
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

  return { tempC, tempF, isDay, condition };
};

fetchCurrentWeather()
  .then((response) => processData(response))
  .then((data) => console.log(data));
