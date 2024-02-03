import { returnData } from './data';
import { appendChildren } from './helpersDOM';

const container = document.querySelector('.content-container');

let dayData;

const generateDayFrame = () => {
  const dayFrame = document.createElement('div');

  const titleDiv = document.createElement('div');
  const dayPara = document.createElement('h3');
  const conditionPara = document.createElement('p');

  const imgDiv = document.createElement('div');
  const img = document.createElement('img');

  const tempDiv = document.createElement('div');
  const tempPara = document.createElement('p');
  const feelsPara = document.createElement('p');

  const detailsDiv = document.createElement('div');
  const precipPara = document.createElement('p');
  const windPara = document.createElement('p');
  const humidityPara = document.createElement('p');

  dayFrame.classList.add('day-frame');
  titleDiv.classList.add('title');
  imgDiv.classList.add('img');
  tempDiv.classList.add('temp');
  detailsDiv.classList.add('details');

  dayFrame.setAttribute('data-id', 'today');

  appendChildren(titleDiv, [dayPara, conditionPara]);
  appendChildren(imgDiv, [img]);
  appendChildren(tempDiv, [tempPara, feelsPara]);
  appendChildren(detailsDiv, [precipPara, windPara, humidityPara]);

  appendChildren(dayFrame, [titleDiv, imgDiv, tempDiv, detailsDiv]);

  appendChildren(container, [dayFrame]);
};

const generateDayContent = () => {
  const frame = document.querySelector('.day-frame[data-id=today]');
  const dayPara = frame.querySelector('.title > h3');
  const conditionPara = frame.querySelector('.title > p');
  const tempPara = frame.querySelector('.temp > p:first-of-type');
  const feelsPara = frame.querySelector('.temp > p:last-of-type');
  const precipPara = frame.querySelector('.details > p:first-of-type');
  const windPara = frame.querySelector('.details > p:nth-child(2)');
  const humidityPara = frame.querySelector('.details > p:last-of-type');

  dayPara.textContent = 'TODAY';
  conditionPara.textContent = dayData.condition;
  tempPara.textContent = `${dayData.tempF}°`;
  feelsPara.textContent = `${dayData.feelsLikeF}°`;
  precipPara.textContent = `${dayData.precipIN} in.`;
  windPara.textContent = `${dayData.windMPH} mph`;
  humidityPara.textContent = `${dayData.humidity}%`;
};

const runContentGenerationSequence = () => {
  generateDayFrame();
  generateDayContent();
};

const setDayData = async () => {
  dayData = await returnData();
  runContentGenerationSequence();
};

export { setDayData };
