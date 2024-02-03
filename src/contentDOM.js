import { returnData } from './data';
import { appendChildren } from './helpersDOM';
import Sun from './images/sun.png';

const container = document.querySelector('.content-container');

let currentDataArr;

const generateDayFrame = (obj) => {
  const dayFrame = document.createElement('div');

  const titleDiv = document.createElement('div');
  const dayPara = document.createElement('h3');
  const conditionPara = document.createElement('p');

  const imgDiv = document.createElement('div');
  const img = document.createElement('img');

  const tempDiv = document.createElement('div');
  const maxTempPara = document.createElement('p');
  const minTempPara = document.createElement('p');

  const detailsDiv = document.createElement('div');
  const precipPara = document.createElement('p');
  const windPara = document.createElement('p');
  const humidityPara = document.createElement('p');

  dayFrame.classList.add('day-frame');
  titleDiv.classList.add('title');
  imgDiv.classList.add('img');
  tempDiv.classList.add('temp');
  detailsDiv.classList.add('details');

  dayFrame.setAttribute('data-id', obj.date);

  appendChildren(titleDiv, [dayPara, conditionPara]);
  appendChildren(imgDiv, [img]);
  appendChildren(tempDiv, [maxTempPara, minTempPara]);
  appendChildren(detailsDiv, [precipPara, windPara, humidityPara]);

  appendChildren(dayFrame, [titleDiv, imgDiv, tempDiv, detailsDiv]);

  appendChildren(container, [dayFrame]);
};

const generateDayContent = (obj) => {
  const frame = document.querySelector(`.day-frame[data-id="${obj.date}"]`);
  const dayPara = frame.querySelector('.title > h3');
  const conditionPara = frame.querySelector('.title > p');
  const img = frame.querySelector('img');
  const maxTempPara = frame.querySelector('.temp > p:first-child');
  const minTempPara = frame.querySelector('.temp > p:last-child');
  const precipPara = frame.querySelector('.details > p:first-of-type');
  const windPara = frame.querySelector('.details > p:nth-child(2)');
  const humidityPara = frame.querySelector('.details > p:last-of-type');

  dayPara.textContent = obj.date;
  conditionPara.textContent = obj.condition;
  maxTempPara.textContent = `${obj.maxTempF}°`;
  minTempPara.textContent = `${obj.minTempF}°`;
  precipPara.textContent = `${obj.totalPrecipIN} in.`;
  windPara.textContent = `${obj.maxWindMPH} mph`;
  humidityPara.textContent = `${obj.avgHumidity}%`;

  img.src = `https:${obj.imgURL}`;
};

const runContentGenerationSequence = (obj) => {
  generateDayFrame(obj);
  generateDayContent(obj);
};

const setCurrentDataArr = async () => {
  currentDataArr = await returnData();
  currentDataArr.forEach((obj) => runContentGenerationSequence(obj));
};

export { setCurrentDataArr };
