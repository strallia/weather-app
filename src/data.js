import { key } from './key';

const baseURL = 'https://www.weatherapi.com/docs/#';
const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=`;
const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=`;

// Set city
let city = 'davis';

const setCity = (string) => {
  city = string;
};

const getCity = () => city;

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
    condition: { text: condition },
    temp_c: tempC,
    temp_f: tempF,
    feelslike_c: feelsLikeC,
    feelslike_f: feelsLikeF,
    wind_kph: windKPH,
    wind_mph: windMPH,
    humidity,
    precip_mm: precipMM,
    precip_in: precipIN,
  } = data.current;

  const { name: cityName } = data.location;

  return {
    tempC,
    tempF,
    condition,
    feelsLikeC,
    feelsLikeF,
    windKPH,
    windMPH,
    humidity,
    precipMM,
    precipIN,
    cityName,
  };
};

const returnData = async () => {
  const response = await fetchCurrentWeather();
  const data = processData(response);
  return data;
};

export { setCity, getCity, returnData };
