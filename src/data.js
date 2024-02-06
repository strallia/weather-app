import { key } from './key';
import { displayWarningLabel } from './warningDOM';

const forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=${key}&days=4&q=`;

// state variables
let city = 'davis';
const setCity = (string) => {
  city = string;
};
const getCity = () => city;

let units = 'imperial';
const setUnits = (string) => {
  units = string;
};
const getUnits = () => units;

// Forecast API calls
const fetchForecast = async () => {
  const response = await fetch(forecastURL + city, { mode: 'cors' });
  return response;
};

const processData = async (response) => {
  const data = await response.json();
  const forecast = data.forecast.forecastday;
  const dataArr = [];

  forecast.forEach((dayObj) => {
    const dayData = dayObj.day;
    let sharedData = {};
    let unitSpecificData = {};

    // gather shared data
    const {
      condition: { text: condition },
      condition: { icon: imgURL },
      avghumidity: avgHumidity,
    } = dayData;
    const { date } = dayObj;
    sharedData = { condition, imgURL, avgHumidity, date };

    // gather data filtered by units
    if (units === 'imperial') {
      const {
        maxtemp_f: maxTemp,
        mintemp_f: minTemp,
        totalprecip_in: totalPrecip,
        maxwind_mph: maxWind,
      } = dayData;
      unitSpecificData = { maxTemp, minTemp, totalPrecip, maxWind };
    } else if (units === 'metric') {
      const {
        maxtemp_c: maxTemp,
        mintemp_c: minTemp,
        totalprecip_mm: totalPrecip,
        maxwind_kph: maxWind,
      } = dayData;
      unitSpecificData = { maxTemp, minTemp, totalPrecip, maxWind };
    }

    // round temperature
    unitSpecificData.maxTemp = Math.round(unitSpecificData.maxTemp);
    unitSpecificData.minTemp = Math.round(unitSpecificData.minTemp);

    dataArr.push({ ...sharedData, ...unitSpecificData });
  });

  return dataArr;
};

const returnData = async () => {
  try {
    const response = await fetchForecast();
    if (!response.ok) throw new Error('');
    const data = processData(response);
    return data;
  } catch (e) {
    displayWarningLabel();
  }
};

export { setCity, getCity, getUnits, setUnits, returnData };
