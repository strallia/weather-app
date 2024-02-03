import { key } from './key';

const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=`;
const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${key}&days=4&q=`;

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

// Forecast Weather
const fetchForecastWeather = async () => {
  try {
    const response = await fetch(forecastURL + city, { mode: 'cors' });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const XprocessData = async (data) => {
  const forecast = data.forecast.forecastday;
  const dataArr = [];

  forecast.forEach((dayObj) => {
    const dayData = dayObj.day;
    const {
      condition: { text: condition },
      condition: { icon: imgURL },
      maxtemp_c: maxTempC,
      maxtemp_f: maxTempF,
      mintemp_c: minTempC,
      mintemp_f: minTempF,
      totalprecip_mm: totalPrecipMM,
      totalprecip_in: totalPrecipIN,
      maxwind_kph: maxWindKPH,
      maxwind_mph: maxWindMPH,
      avghumidity: avgHumidity,
    } = dayData;
    const renamedObjProperties = {
      condition,
      imgURL,
      maxTempC,
      maxTempF,
      minTempC,
      minTempF,
      totalPrecipMM,
      totalPrecipIN,
      maxWindKPH,
      maxWindMPH,
      avgHumidity,
    };
    dataArr.push(renamedObjProperties);
  });
  console.log(dataArr);

  // need access to day of the week

  return {};
};
fetchForecastWeather().then((res) => XprocessData(res));

export { setCity, getCity, returnData };
