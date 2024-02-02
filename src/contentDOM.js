import { returnData } from './data';
import { appendChildren } from './helpersDOM';

const container = document.querySelector('.content-container');

const displayContent = async () => {
  const data = await returnData();
  const { tempF, feelsLikeF } = data;
  container.textContent = `${tempF}°F, FEELS: ${feelsLikeF}°F`;
};

const generateDayLayout = () => {
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

  appendChildren(titleDiv, [dayPara, conditionPara]);
  appendChildren(imgDiv, [img]);
  appendChildren(tempDiv, [tempPara, feelsPara]);
  appendChildren(detailsDiv, [precipPara, windPara, humidityPara]);

  appendChildren(dayFrame, [titleDiv, imgDiv, tempDiv, detailsDiv]);

  appendChildren(container, [dayFrame]);
};

export { displayContent };
