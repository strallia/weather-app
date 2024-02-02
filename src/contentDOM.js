import { returnData } from './apiCalls';

const container = document.querySelector('.content-container');

const displayContent = async () => {
  const data = await returnData();
  const { tempF, feelsLikeF } = data;
  container.textContent = `${tempF}°F, FEELS: ${feelsLikeF}°F`;
};

export { displayContent };
