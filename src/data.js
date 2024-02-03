import { key } from './key';

const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${key}&days=4&q=`;

// City variable
let city = 'davis';

const setCity = (string) => {
  city = string;
};

const getCity = () => city;

// Forecast API calls
const fetchForecast = async () => {
  try {
    const response = await fetch(forecastURL + city, { mode: 'cors' });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const processData = async (data) => {
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

    const { date } = dayObj;

    const renamedObjProperties = {
      date,
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
  return dataArr;
};

const returnData = async () => {
  const response = await fetchForecast();
  const data = processData(response);
  return data;
};

export { setCity, getCity, returnData };
