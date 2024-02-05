import { getUnits, returnData } from './data';

let currentDataArr;

const generateDayContent = (obj, index) => {
  const frame = document.querySelector(`.day-frame[data-id="${index}"]`);
  const dayPara = frame.querySelector('.title > h3');
  const conditionPara = frame.querySelector('.title > p');
  const img = frame.querySelector('img');
  const maxTempPara = frame.querySelector('.temp > p:first-child');
  const minTempPara = frame.querySelector('.temp > p:last-child');
  const precipPara = frame.querySelector('.details > p:first-of-type');
  const windPara = frame.querySelector('.details > p:nth-child(2)');
  const humidityPara = frame.querySelector('.details > p:last-of-type');

  const unitsType = getUnits();
  const tempUnit = unitsType === 'imperial' ? 'F' : 'C';
  const precipUnit = unitsType === 'imperial' ? 'in.' : 'mm';
  const windUnit = unitsType === 'imperial' ? 'mph' : 'kph';

  dayPara.textContent = obj.date;
  conditionPara.textContent = obj.condition;
  maxTempPara.textContent = `${obj.maxTemp}°${tempUnit}`;
  minTempPara.textContent = `${obj.minTemp}°${tempUnit}`;
  precipPara.textContent = `${obj.totalPrecip} ${precipUnit}`;
  windPara.textContent = `${obj.maxWind} ${windUnit}`;
  humidityPara.textContent = `${obj.avgHumidity}%`;

  img.src = `https:${obj.imgURL}`;
};

const displayWeatherContent = async () => {
  currentDataArr = await returnData();
  currentDataArr.forEach((obj, index) => generateDayContent(obj, index));
};

export { displayWeatherContent };
