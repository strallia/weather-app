/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/contentDOM.js":
/*!***************************!*\
  !*** ./src/contentDOM.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayWeatherContent: () => (/* binding */ displayWeatherContent)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _helpersDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpersDOM */ "./src/helpersDOM.js");


const container = document.querySelector('.content-container');
let currentDataArr;

// const generateDayFrame = (obj) => {
//   const dayFrame = document.createElement('div');

//   const titleDiv = document.createElement('div');
//   const dayPara = document.createElement('h3');
//   const conditionPara = document.createElement('p');

//   const imgDiv = document.createElement('div');
//   const img = document.createElement('img');

//   const tempDiv = document.createElement('div');
//   const maxTempPara = document.createElement('p');
//   const minTempPara = document.createElement('p');

//   const detailsDiv = document.createElement('div');
//   const precipPara = document.createElement('p');
//   const windPara = document.createElement('p');
//   const humidityPara = document.createElement('p');

//   dayFrame.classList.add('day-frame', 'full-view');
//   titleDiv.classList.add('title');
//   imgDiv.classList.add('img');
//   tempDiv.classList.add('temp');
//   detailsDiv.classList.add('details');

//   dayFrame.setAttribute('data-id', obj.date);

//   appendChildren(titleDiv, [dayPara, conditionPara]);
//   appendChildren(imgDiv, [img]);
//   appendChildren(tempDiv, [maxTempPara, minTempPara]);
//   appendChildren(detailsDiv, [precipPara, windPara, humidityPara]);

//   appendChildren(dayFrame, [titleDiv, imgDiv, tempDiv, detailsDiv]);

//   appendChildren(container, [dayFrame]);
// };

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
  const unitsType = (0,_data__WEBPACK_IMPORTED_MODULE_0__.getUnits)();
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
  (0,_helpersDOM__WEBPACK_IMPORTED_MODULE_1__.clearContent)([container]);
  currentDataArr = await (0,_data__WEBPACK_IMPORTED_MODULE_0__.returnData)();
  currentDataArr.forEach((obj, index) => generateDayContent(obj, index));
};


/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCity: () => (/* binding */ getCity),
/* harmony export */   getUnits: () => (/* binding */ getUnits),
/* harmony export */   returnData: () => (/* binding */ returnData),
/* harmony export */   setCity: () => (/* binding */ setCity),
/* harmony export */   setUnits: () => (/* binding */ setUnits)
/* harmony export */ });
/* harmony import */ var _key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./key */ "./src/key.js");

const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=${_key__WEBPACK_IMPORTED_MODULE_0__.key}&days=4&q=`;

// state variables
let city = 'davis';
const setCity = string => {
  city = string;
};
const getCity = () => city;
let units = 'imperial';
const setUnits = string => {
  units = string;
};
const getUnits = () => units;

// Forecast API calls
const fetchForecast = async () => {
  try {
    const response = await fetch(forecastURL + city, {
      mode: 'cors'
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
const processData = async data => {
  const forecast = data.forecast.forecastday;
  const dataArr = [];
  forecast.forEach(dayObj => {
    const dayData = dayObj.day;
    let sharedData = {};
    let unitSpecificData = {};

    // gather shared data
    const {
      condition: {
        text: condition
      },
      condition: {
        icon: imgURL
      },
      avghumidity: avgHumidity
    } = dayData;
    const {
      date
    } = dayObj;
    sharedData = {
      condition,
      imgURL,
      avgHumidity,
      date
    };

    // gather data filtered by units
    if (units === 'imperial') {
      const {
        maxtemp_f: maxTemp,
        mintemp_f: minTemp,
        totalprecip_in: totalPrecip,
        maxwind_mph: maxWind
      } = dayData;
      unitSpecificData = {
        maxTemp,
        minTemp,
        totalPrecip,
        maxWind
      };
    } else if (units === 'metric') {
      const {
        maxtemp_c: maxTemp,
        mintemp_c: minTemp,
        totalprecip_mm: totalPrecip,
        maxwind_kph: maxWind
      } = dayData;
      unitSpecificData = {
        maxTemp,
        minTemp,
        totalPrecip,
        maxWind
      };
    }

    // round temperature
    unitSpecificData.maxTemp = Math.round(unitSpecificData.maxTemp);
    unitSpecificData.minTemp = Math.round(unitSpecificData.minTemp);
    dataArr.push({
      ...sharedData,
      ...unitSpecificData
    });
  });
  return dataArr;
};
const returnData = async () => {
  const response = await fetchForecast();
  const data = processData(response);
  return data;
};


/***/ }),

/***/ "./src/dateDOM.js":
/*!************************!*\
  !*** ./src/dateDOM.js ***!
  \************************/
/***/ (() => {

const date = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateSpan = document.querySelector('.date');
const displayTodaysDate = () => {
  const dayOfTheWeek = days[date.getDay()].toUpperCase();
  const month = months[date.getMonth()].toUpperCase();
  const dayOfTheMonth = date.getDate();
  const year = date.getFullYear();
  dateSpan.textContent = `${dayOfTheWeek}, ${month} ${dayOfTheMonth}, ${year}`;
};
displayTodaysDate();

/***/ }),

/***/ "./src/formDOM.js":
/*!************************!*\
  !*** ./src/formDOM.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _contentDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contentDOM */ "./src/contentDOM.js");
/* harmony import */ var _titleDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./titleDOM */ "./src/titleDOM.js");



const form = document.querySelector('form');
const input = document.querySelector('input[type=text]');
const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', event => {
  event.preventDefault();
  (0,_data__WEBPACK_IMPORTED_MODULE_0__.setCity)(input.value);
  (0,_contentDOM__WEBPACK_IMPORTED_MODULE_1__.displayWeatherContent)();
  (0,_titleDOM__WEBPACK_IMPORTED_MODULE_2__.displayCity)();
  form.reset();
});

// TODO: remove these lines after testing
(0,_contentDOM__WEBPACK_IMPORTED_MODULE_1__.displayWeatherContent)();
(0,_titleDOM__WEBPACK_IMPORTED_MODULE_2__.displayCity)();

/***/ }),

/***/ "./src/helpersDOM.js":
/*!***************************!*\
  !*** ./src/helpersDOM.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendChildren: () => (/* binding */ appendChildren),
/* harmony export */   clearContent: () => (/* binding */ clearContent)
/* harmony export */ });
const appendChildren = (parentNode, childrenArr) => {
  childrenArr.forEach(child => parentNode.appendChild(child));
};
const clearContent = nodeArr => {
  nodeArr.forEach(node => {
    const childNode = node;
    childNode.textContent = '';
  });
};


/***/ }),

/***/ "./src/key.js":
/*!********************!*\
  !*** ./src/key.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   key: () => (/* binding */ key)
/* harmony export */ });
const key = '39d1be001ef94d3dbc040648243101';

/***/ }),

/***/ "./src/titleDOM.js":
/*!*************************!*\
  !*** ./src/titleDOM.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayCity: () => (/* binding */ displayCity)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");

const titleContainer = document.querySelector('.title-container');
const displayCity = () => {
  const city = (0,_data__WEBPACK_IMPORTED_MODULE_0__.getCity)();
  titleContainer.textContent = city.toUpperCase();
};


/***/ }),

/***/ "./src/toggleThemeDOM.js":
/*!*******************************!*\
  !*** ./src/toggleThemeDOM.js ***!
  \*******************************/
/***/ (() => {

const themeToggle = document.querySelector('input.theme-toggle');
const root = document.querySelector(':root');
const toggleTheme = () => {
  if (themeToggle.checked) {
    root.classList.remove('light');
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
};
themeToggle.addEventListener('click', toggleTheme);

/***/ }),

/***/ "./src/toggleUnitDOM.js":
/*!******************************!*\
  !*** ./src/toggleUnitDOM.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _contentDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentDOM */ "./src/contentDOM.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");


const unitToggle = document.querySelector('input.unit-toggle');
const toggleUnits = () => {
  if ((0,_data__WEBPACK_IMPORTED_MODULE_1__.getUnits)() === 'imperial') {
    (0,_data__WEBPACK_IMPORTED_MODULE_1__.setUnits)('metric');
  } else {
    (0,_data__WEBPACK_IMPORTED_MODULE_1__.setUnits)('imperial');
  }
  (0,_contentDOM__WEBPACK_IMPORTED_MODULE_0__.displayWeatherContent)();
};
unitToggle.addEventListener('click', toggleUnits);

/***/ }),

/***/ "./src/viewModeDOM.js":
/*!****************************!*\
  !*** ./src/viewModeDOM.js ***!
  \****************************/
/***/ (() => {

const menuContainer = document.querySelector('.menu-container');
const contentContainer = document.querySelector('.content-container');
const dayFrames = document.querySelectorAll('.day-frame');
window.addEventListener('resize', () => {
  if (window.innerWidth < 920) {
    menuContainer.classList.remove('full-view');
    menuContainer.classList.add('narrow-view');
    contentContainer.classList.remove('full-view');
    contentContainer.classList.add('narrow-view');
    dayFrames.forEach(frame => {
      frame.classList.remove('full-view');
      frame.classList.add('narrow-view');
    });
  } else {
    menuContainer.classList.add('full-view');
    menuContainer.classList.remove('narrow-view');
    contentContainer.classList.add('full-view');
    contentContainer.classList.remove('narrow-view');
    dayFrames.forEach(frame => {
      frame.classList.add('full-view');
      frame.classList.remove('narrow-view');
    });
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Rufina:wght@700&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Open+Sans&family=Rufina:wght@700&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  /* outline: 1px solid red; */
}

:root {
  font-size: 16px;
}

:root.light {
  --background-color: rgb(245, 242, 232);
  --contrast-color: rgb(26, 28, 26);
  --search-background-color: rgba(26, 28, 26, 0.1);
}

:root.dark {
  --background-color: rgb(26, 28, 26);
  --contrast-color: rgb(245, 242, 232);
  --search-background-color: rgba(245, 242, 232, 0.1);
}

body {
  background-color: var(--background-color);
  color: var(--contrast-color);

  display: grid;
  grid-template-columns: minmax(min-content, 1100px);
  justify-content: center;
}

.page-container {
  height: 100vh;
  padding: 0 10px;

  display: grid;
  grid-template-rows: repeat(5, min-content);
  justify-items: center;
}

.title-container,
.content-container,
footer {
  user-select: none;
}

.title-container {
  font-size: 5rem;
  letter-spacing: 0.5rem;
  text-align: center;
}

.title-container,
footer *,
.unit-toggle * {
  font-family: 'Rufina', serif;
}

.menu-container {
  padding-bottom: 10px;

  display: grid;
  justify-content: space-between;
  align-items: center;
}

.menu-container.full-view {
  grid-template-columns: 140px minmax(200px, 30%) 140px;
}

.menu-container.narrow-view {
  grid-template-columns: min-content min-content;
  grid-template-rows: auto auto;
  column-gap: 30px;
  row-gap: 10px;

  > .theme-toggle {
    grid-row: 2/3;
  }
  > form {
    grid-column: 1/3;
  }
  > .unit-toggle {
    grid-row: 2/3;
  }
}

.menu-container,
footer {
  width: 100%;
  justify-self: space-between;
}

.theme-toggle.switch {
  width: 57px;
}

.unit-toggle.switch {
  width: 140px;
}

.theme-toggle.slider {
  width: 22px;
  background-color: goldenrod;
}

.unit-toggle.slider {
  width: 70px;
}

.metric,
.imperial {
  position: absolute;
  top: 6px;
  font-size: 0.8rem;
  color: var(--background-color);
  user-select: none;
  cursor: pointer;
}

.imperial {
  left: 14px;
}

.metric {
  right: 10px;
}

.switch {
  border: 3px solid var(--contrast-color);
  overflow: hidden;
  position: relative;
  margin: 3px;
  height: 33px;
}

.switch,
.slider {
  border-radius: 30px;
}

input[type='checkbox'] {
  appearance: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: transparent;
}

.slider {
  background-color: var(--contrast-color);
  position: absolute;
  top: 3px;
  left: 4px;
  transition: 300ms;
  cursor: pointer;
  height: 22px;
}

input[type='checkbox']:checked {
  + .theme-toggle.slider {
    transform: translate(23px);
    background-color: transparent;
    box-shadow: inset -8px 0 0px 0px rgb(116, 154, 224);
  }
  + .unit-toggle.slider {
    width: 55px;
    transform: translate(73px);
  }
}

form {
  width: 100%;
  position: relative;

  display: flex;
  align-items: center;
}

input[type='text'] {
  border: none;
  background-color: lightgray;
  padding: 7px 15px;
  background-color: var(--search-background-color);
  border-radius: 20px;

  flex: 1;
}

input[type='text']:focus {
  border: none;
  outline: 2px solid cornflowerblue;
}

form button {
  padding: 20px;
  background-color: transparent;
  border: none;
  position: absolute;
  right: 35px;
  zoom: 17%;
  transition: 300ms;
}

button:hover {
  cursor: pointer;
  zoom: 18%;
}

.date-container {
  border-top: 5px solid var(--contrast-color);
  border-bottom: 3px solid var(--contrast-color);
  text-align: center;
  padding: 2px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  gap: 50px;
}

.date-container * {
  font-family: 'EB Garamond', serif;
  letter-spacing: 0.2rem;
  font-weight: bold;
  font-size: 0.8rem;
}

.content-background {
  background-color: var(--contrast-color);
  width: 100%;
  margin: 30px 0;
}

.content-container {
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 1px;
}

.content-container.full-view {
  border-left: 1px solid var(--contrast-color);
  border-right: 1px solid var(--contrast-color);

  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.content-container.narrow-view {
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fit, min-content);

  > .day-frame {
    padding: 20px;
  }
}

.day-frame {
  background-color: var(--background-color);
  padding: 0 30px;
  text-align: center;
  display: grid;
  gap: 15px;
}

.day-frame.narrow-view {
  width: 100%;

  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  align-items: center;
  justify-content: stretch;
  gap: 15px;
}

.title h3 {
  font-size: 1.5rem;
}

.temp,
.details {
  font-weight: bold;
}

.temp p:first-child {
  font-size: 3rem;
}

.temp p:last-child {
  font-weight: normal;
  font-size: 1.5rem;
}

.day-frame ::before {
  font-weight: normal;
}

.details {
  display: grid;
  gap: 3px;
}

.details p:first-child::before {
  content: 'rain: ';
}

.details p:nth-child(2)::before {
  content: 'wind: ';
}

.details p:last-child::before {
  content: 'humidity: ';
}

.img {
  display: flex;
  justify-content: center;
  filter: grayscale(0.5);
}

img {
  width: 100px;
}

footer {
  border-top: 2px solid var(--contrast-color);
  padding-top: 5px;
  font-size: 0.8rem;
  letter-spacing: 0.2rem;

  display: flex;
  justify-content: space-between;
}

.credits a {
  font-family: inherit;
  color: inherit;
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Rufina:wght@700&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Rufina:wght@700&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap');\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: 'Open Sans', sans-serif;\n  /* outline: 1px solid red; */\n}\n\n:root {\n  font-size: 16px;\n}\n\n:root.light {\n  --background-color: rgb(245, 242, 232);\n  --contrast-color: rgb(26, 28, 26);\n  --search-background-color: rgba(26, 28, 26, 0.1);\n}\n\n:root.dark {\n  --background-color: rgb(26, 28, 26);\n  --contrast-color: rgb(245, 242, 232);\n  --search-background-color: rgba(245, 242, 232, 0.1);\n}\n\nbody {\n  background-color: var(--background-color);\n  color: var(--contrast-color);\n\n  display: grid;\n  grid-template-columns: minmax(min-content, 1100px);\n  justify-content: center;\n}\n\n.page-container {\n  height: 100vh;\n  padding: 0 10px;\n\n  display: grid;\n  grid-template-rows: repeat(5, min-content);\n  justify-items: center;\n}\n\n.title-container,\n.content-container,\nfooter {\n  user-select: none;\n}\n\n.title-container {\n  font-size: 5rem;\n  letter-spacing: 0.5rem;\n  text-align: center;\n}\n\n.title-container,\nfooter *,\n.unit-toggle * {\n  font-family: 'Rufina', serif;\n}\n\n.menu-container {\n  padding-bottom: 10px;\n\n  display: grid;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.menu-container.full-view {\n  grid-template-columns: 140px minmax(200px, 30%) 140px;\n}\n\n.menu-container.narrow-view {\n  grid-template-columns: min-content min-content;\n  grid-template-rows: auto auto;\n  column-gap: 30px;\n  row-gap: 10px;\n\n  > .theme-toggle {\n    grid-row: 2/3;\n  }\n  > form {\n    grid-column: 1/3;\n  }\n  > .unit-toggle {\n    grid-row: 2/3;\n  }\n}\n\n.menu-container,\nfooter {\n  width: 100%;\n  justify-self: space-between;\n}\n\n.theme-toggle.switch {\n  width: 57px;\n}\n\n.unit-toggle.switch {\n  width: 140px;\n}\n\n.theme-toggle.slider {\n  width: 22px;\n  background-color: goldenrod;\n}\n\n.unit-toggle.slider {\n  width: 70px;\n}\n\n.metric,\n.imperial {\n  position: absolute;\n  top: 6px;\n  font-size: 0.8rem;\n  color: var(--background-color);\n  user-select: none;\n  cursor: pointer;\n}\n\n.imperial {\n  left: 14px;\n}\n\n.metric {\n  right: 10px;\n}\n\n.switch {\n  border: 3px solid var(--contrast-color);\n  overflow: hidden;\n  position: relative;\n  margin: 3px;\n  height: 33px;\n}\n\n.switch,\n.slider {\n  border-radius: 30px;\n}\n\ninput[type='checkbox'] {\n  appearance: none;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  background-color: transparent;\n}\n\n.slider {\n  background-color: var(--contrast-color);\n  position: absolute;\n  top: 3px;\n  left: 4px;\n  transition: 300ms;\n  cursor: pointer;\n  height: 22px;\n}\n\ninput[type='checkbox']:checked {\n  + .theme-toggle.slider {\n    transform: translate(23px);\n    background-color: transparent;\n    box-shadow: inset -8px 0 0px 0px rgb(116, 154, 224);\n  }\n  + .unit-toggle.slider {\n    width: 55px;\n    transform: translate(73px);\n  }\n}\n\nform {\n  width: 100%;\n  position: relative;\n\n  display: flex;\n  align-items: center;\n}\n\ninput[type='text'] {\n  border: none;\n  background-color: lightgray;\n  padding: 7px 15px;\n  background-color: var(--search-background-color);\n  border-radius: 20px;\n\n  flex: 1;\n}\n\ninput[type='text']:focus {\n  border: none;\n  outline: 2px solid cornflowerblue;\n}\n\nform button {\n  padding: 20px;\n  background-color: transparent;\n  border: none;\n  position: absolute;\n  right: 35px;\n  zoom: 17%;\n  transition: 300ms;\n}\n\nbutton:hover {\n  cursor: pointer;\n  zoom: 18%;\n}\n\n.date-container {\n  border-top: 5px solid var(--contrast-color);\n  border-bottom: 3px solid var(--contrast-color);\n  text-align: center;\n  padding: 2px;\n  width: 100%;\n\n  display: flex;\n  justify-content: space-between;\n  gap: 50px;\n}\n\n.date-container * {\n  font-family: 'EB Garamond', serif;\n  letter-spacing: 0.2rem;\n  font-weight: bold;\n  font-size: 0.8rem;\n}\n\n.content-background {\n  background-color: var(--contrast-color);\n  width: 100%;\n  margin: 30px 0;\n}\n\n.content-container {\n  width: 100%;\n  display: grid;\n  align-items: center;\n  justify-content: center;\n  gap: 1px;\n}\n\n.content-container.full-view {\n  border-left: 1px solid var(--contrast-color);\n  border-right: 1px solid var(--contrast-color);\n\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n}\n\n.content-container.narrow-view {\n  grid-template-columns: 1fr;\n  grid-template-rows: repeat(auto-fit, min-content);\n\n  > .day-frame {\n    padding: 20px;\n  }\n}\n\n.day-frame {\n  background-color: var(--background-color);\n  padding: 0 30px;\n  text-align: center;\n  display: grid;\n  gap: 15px;\n}\n\n.day-frame.narrow-view {\n  width: 100%;\n\n  grid-template-columns: auto auto;\n  grid-template-rows: auto auto;\n  align-items: center;\n  justify-content: stretch;\n  gap: 15px;\n}\n\n.title h3 {\n  font-size: 1.5rem;\n}\n\n.temp,\n.details {\n  font-weight: bold;\n}\n\n.temp p:first-child {\n  font-size: 3rem;\n}\n\n.temp p:last-child {\n  font-weight: normal;\n  font-size: 1.5rem;\n}\n\n.day-frame ::before {\n  font-weight: normal;\n}\n\n.details {\n  display: grid;\n  gap: 3px;\n}\n\n.details p:first-child::before {\n  content: 'rain: ';\n}\n\n.details p:nth-child(2)::before {\n  content: 'wind: ';\n}\n\n.details p:last-child::before {\n  content: 'humidity: ';\n}\n\n.img {\n  display: flex;\n  justify-content: center;\n  filter: grayscale(0.5);\n}\n\nimg {\n  width: 100px;\n}\n\nfooter {\n  border-top: 2px solid var(--contrast-color);\n  padding-top: 5px;\n  font-size: 0.8rem;\n  letter-spacing: 0.2rem;\n\n  display: flex;\n  justify-content: space-between;\n}\n\n.credits a {\n  font-family: inherit;\n  color: inherit;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _formDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formDOM */ "./src/formDOM.js");
/* harmony import */ var _dateDOM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dateDOM */ "./src/dateDOM.js");
/* harmony import */ var _dateDOM__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dateDOM__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _toggleThemeDOM__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toggleThemeDOM */ "./src/toggleThemeDOM.js");
/* harmony import */ var _toggleThemeDOM__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_toggleThemeDOM__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _toggleUnitDOM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toggleUnitDOM */ "./src/toggleUnitDOM.js");
/* harmony import */ var _viewModeDOM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewModeDOM */ "./src/viewModeDOM.js");
/* harmony import */ var _viewModeDOM__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_viewModeDOM__WEBPACK_IMPORTED_MODULE_6__);







})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxpRkFBaUYsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksY0FBYyxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sT0FBTyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLE9BQU8sWUFBWSxPQUFPLEtBQUssYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsWUFBWSxLQUFLLFVBQVUsS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsS0FBSyxNQUFNLE1BQU0sVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxNQUFNLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsTUFBTSxNQUFNLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sTUFBTSxLQUFLLFVBQVUsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsY0FBYyxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxV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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXNCO0FBQ047QUFDRztBQUNBO0FBQ087QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbnRlbnRET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZGF0YS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRlRE9NLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2Zvcm1ET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaGVscGVyc0RPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9rZXkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdGl0bGVET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdG9nZ2xlVGhlbWVET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdG9nZ2xlVW5pdERPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy92aWV3TW9kZURPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFVuaXRzLCByZXR1cm5EYXRhIH0gZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7IGNsZWFyQ29udGVudCB9IGZyb20gJy4vaGVscGVyc0RPTSc7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWNvbnRhaW5lcicpO1xuXG5sZXQgY3VycmVudERhdGFBcnI7XG5cbi8vIGNvbnN0IGdlbmVyYXRlRGF5RnJhbWUgPSAob2JqKSA9PiB7XG4vLyAgIGNvbnN0IGRheUZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbi8vICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgY29uc3QgZGF5UGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4vLyAgIGNvbnN0IGNvbmRpdGlvblBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cbi8vICAgY29uc3QgaW1nRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4vLyAgIGNvbnN0IHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgY29uc3QgbWF4VGVtcFBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4vLyAgIGNvbnN0IG1pblRlbXBQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG4vLyAgIGNvbnN0IGRldGFpbHNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgY29uc3QgcHJlY2lwUGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbi8vICAgY29uc3Qgd2luZFBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4vLyAgIGNvbnN0IGh1bWlkaXR5UGFyYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblxuLy8gICBkYXlGcmFtZS5jbGFzc0xpc3QuYWRkKCdkYXktZnJhbWUnLCAnZnVsbC12aWV3Jyk7XG4vLyAgIHRpdGxlRGl2LmNsYXNzTGlzdC5hZGQoJ3RpdGxlJyk7XG4vLyAgIGltZ0Rpdi5jbGFzc0xpc3QuYWRkKCdpbWcnKTtcbi8vICAgdGVtcERpdi5jbGFzc0xpc3QuYWRkKCd0ZW1wJyk7XG4vLyAgIGRldGFpbHNEaXYuY2xhc3NMaXN0LmFkZCgnZGV0YWlscycpO1xuXG4vLyAgIGRheUZyYW1lLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIG9iai5kYXRlKTtcblxuLy8gICBhcHBlbmRDaGlsZHJlbih0aXRsZURpdiwgW2RheVBhcmEsIGNvbmRpdGlvblBhcmFdKTtcbi8vICAgYXBwZW5kQ2hpbGRyZW4oaW1nRGl2LCBbaW1nXSk7XG4vLyAgIGFwcGVuZENoaWxkcmVuKHRlbXBEaXYsIFttYXhUZW1wUGFyYSwgbWluVGVtcFBhcmFdKTtcbi8vICAgYXBwZW5kQ2hpbGRyZW4oZGV0YWlsc0RpdiwgW3ByZWNpcFBhcmEsIHdpbmRQYXJhLCBodW1pZGl0eVBhcmFdKTtcblxuLy8gICBhcHBlbmRDaGlsZHJlbihkYXlGcmFtZSwgW3RpdGxlRGl2LCBpbWdEaXYsIHRlbXBEaXYsIGRldGFpbHNEaXZdKTtcblxuLy8gICBhcHBlbmRDaGlsZHJlbihjb250YWluZXIsIFtkYXlGcmFtZV0pO1xuLy8gfTtcblxuY29uc3QgZ2VuZXJhdGVEYXlDb250ZW50ID0gKG9iaiwgaW5kZXgpID0+IHtcbiAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZGF5LWZyYW1lW2RhdGEtaWQ9XCIke2luZGV4fVwiXWApO1xuICBjb25zdCBkYXlQYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLnRpdGxlID4gaDMnKTtcbiAgY29uc3QgY29uZGl0aW9uUGFyYSA9IGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSA+IHAnKTtcbiAgY29uc3QgaW1nID0gZnJhbWUucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gIGNvbnN0IG1heFRlbXBQYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLnRlbXAgPiBwOmZpcnN0LWNoaWxkJyk7XG4gIGNvbnN0IG1pblRlbXBQYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLnRlbXAgPiBwOmxhc3QtY2hpbGQnKTtcbiAgY29uc3QgcHJlY2lwUGFyYSA9IGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzID4gcDpmaXJzdC1vZi10eXBlJyk7XG4gIGNvbnN0IHdpbmRQYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLmRldGFpbHMgPiBwOm50aC1jaGlsZCgyKScpO1xuICBjb25zdCBodW1pZGl0eVBhcmEgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscyA+IHA6bGFzdC1vZi10eXBlJyk7XG5cbiAgY29uc3QgdW5pdHNUeXBlID0gZ2V0VW5pdHMoKTtcbiAgY29uc3QgdGVtcFVuaXQgPSB1bml0c1R5cGUgPT09ICdpbXBlcmlhbCcgPyAnRicgOiAnQyc7XG4gIGNvbnN0IHByZWNpcFVuaXQgPSB1bml0c1R5cGUgPT09ICdpbXBlcmlhbCcgPyAnaW4uJyA6ICdtbSc7XG4gIGNvbnN0IHdpbmRVbml0ID0gdW5pdHNUeXBlID09PSAnaW1wZXJpYWwnID8gJ21waCcgOiAna3BoJztcblxuICBkYXlQYXJhLnRleHRDb250ZW50ID0gb2JqLmRhdGU7XG4gIGNvbmRpdGlvblBhcmEudGV4dENvbnRlbnQgPSBvYmouY29uZGl0aW9uO1xuICBtYXhUZW1wUGFyYS50ZXh0Q29udGVudCA9IGAke29iai5tYXhUZW1wfcKwJHt0ZW1wVW5pdH1gO1xuICBtaW5UZW1wUGFyYS50ZXh0Q29udGVudCA9IGAke29iai5taW5UZW1wfcKwJHt0ZW1wVW5pdH1gO1xuICBwcmVjaXBQYXJhLnRleHRDb250ZW50ID0gYCR7b2JqLnRvdGFsUHJlY2lwfSAke3ByZWNpcFVuaXR9YDtcbiAgd2luZFBhcmEudGV4dENvbnRlbnQgPSBgJHtvYmoubWF4V2luZH0gJHt3aW5kVW5pdH1gO1xuICBodW1pZGl0eVBhcmEudGV4dENvbnRlbnQgPSBgJHtvYmouYXZnSHVtaWRpdHl9JWA7XG5cbiAgaW1nLnNyYyA9IGBodHRwczoke29iai5pbWdVUkx9YDtcbn07XG5cbmNvbnN0IGRpc3BsYXlXZWF0aGVyQ29udGVudCA9IGFzeW5jICgpID0+IHtcbiAgY2xlYXJDb250ZW50KFtjb250YWluZXJdKTtcbiAgY3VycmVudERhdGFBcnIgPSBhd2FpdCByZXR1cm5EYXRhKCk7XG4gIGN1cnJlbnREYXRhQXJyLmZvckVhY2goKG9iaiwgaW5kZXgpID0+IGdlbmVyYXRlRGF5Q29udGVudChvYmosIGluZGV4KSk7XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5V2VhdGhlckNvbnRlbnQgfTtcbiIsImltcG9ydCB7IGtleSB9IGZyb20gJy4va2V5JztcblxuY29uc3QgZm9yZWNhc3RVUkwgPSBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke2tleX0mZGF5cz00JnE9YDtcblxuLy8gc3RhdGUgdmFyaWFibGVzXG5sZXQgY2l0eSA9ICdkYXZpcyc7XG5jb25zdCBzZXRDaXR5ID0gKHN0cmluZykgPT4ge1xuICBjaXR5ID0gc3RyaW5nO1xufTtcbmNvbnN0IGdldENpdHkgPSAoKSA9PiBjaXR5O1xuXG5sZXQgdW5pdHMgPSAnaW1wZXJpYWwnO1xuY29uc3Qgc2V0VW5pdHMgPSAoc3RyaW5nKSA9PiB7XG4gIHVuaXRzID0gc3RyaW5nO1xufTtcbmNvbnN0IGdldFVuaXRzID0gKCkgPT4gdW5pdHM7XG5cbi8vIEZvcmVjYXN0IEFQSSBjYWxsc1xuY29uc3QgZmV0Y2hGb3JlY2FzdCA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGZvcmVjYXN0VVJMICsgY2l0eSwgeyBtb2RlOiAnY29ycycgfSk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRGF0YSA9IGFzeW5jIChkYXRhKSA9PiB7XG4gIGNvbnN0IGZvcmVjYXN0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcbiAgY29uc3QgZGF0YUFyciA9IFtdO1xuXG4gIGZvcmVjYXN0LmZvckVhY2goKGRheU9iaikgPT4ge1xuICAgIGNvbnN0IGRheURhdGEgPSBkYXlPYmouZGF5O1xuICAgIGxldCBzaGFyZWREYXRhID0ge307XG4gICAgbGV0IHVuaXRTcGVjaWZpY0RhdGEgPSB7fTtcblxuICAgIC8vIGdhdGhlciBzaGFyZWQgZGF0YVxuICAgIGNvbnN0IHtcbiAgICAgIGNvbmRpdGlvbjogeyB0ZXh0OiBjb25kaXRpb24gfSxcbiAgICAgIGNvbmRpdGlvbjogeyBpY29uOiBpbWdVUkwgfSxcbiAgICAgIGF2Z2h1bWlkaXR5OiBhdmdIdW1pZGl0eSxcbiAgICB9ID0gZGF5RGF0YTtcbiAgICBjb25zdCB7IGRhdGUgfSA9IGRheU9iajtcbiAgICBzaGFyZWREYXRhID0geyBjb25kaXRpb24sIGltZ1VSTCwgYXZnSHVtaWRpdHksIGRhdGUgfTtcblxuICAgIC8vIGdhdGhlciBkYXRhIGZpbHRlcmVkIGJ5IHVuaXRzXG4gICAgaWYgKHVuaXRzID09PSAnaW1wZXJpYWwnKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG1heHRlbXBfZjogbWF4VGVtcCxcbiAgICAgICAgbWludGVtcF9mOiBtaW5UZW1wLFxuICAgICAgICB0b3RhbHByZWNpcF9pbjogdG90YWxQcmVjaXAsXG4gICAgICAgIG1heHdpbmRfbXBoOiBtYXhXaW5kLFxuICAgICAgfSA9IGRheURhdGE7XG4gICAgICB1bml0U3BlY2lmaWNEYXRhID0geyBtYXhUZW1wLCBtaW5UZW1wLCB0b3RhbFByZWNpcCwgbWF4V2luZCB9O1xuICAgIH0gZWxzZSBpZiAodW5pdHMgPT09ICdtZXRyaWMnKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG1heHRlbXBfYzogbWF4VGVtcCxcbiAgICAgICAgbWludGVtcF9jOiBtaW5UZW1wLFxuICAgICAgICB0b3RhbHByZWNpcF9tbTogdG90YWxQcmVjaXAsXG4gICAgICAgIG1heHdpbmRfa3BoOiBtYXhXaW5kLFxuICAgICAgfSA9IGRheURhdGE7XG4gICAgICB1bml0U3BlY2lmaWNEYXRhID0geyBtYXhUZW1wLCBtaW5UZW1wLCB0b3RhbFByZWNpcCwgbWF4V2luZCB9O1xuICAgIH1cblxuICAgIC8vIHJvdW5kIHRlbXBlcmF0dXJlXG4gICAgdW5pdFNwZWNpZmljRGF0YS5tYXhUZW1wID0gTWF0aC5yb3VuZCh1bml0U3BlY2lmaWNEYXRhLm1heFRlbXApO1xuICAgIHVuaXRTcGVjaWZpY0RhdGEubWluVGVtcCA9IE1hdGgucm91bmQodW5pdFNwZWNpZmljRGF0YS5taW5UZW1wKTtcblxuICAgIGRhdGFBcnIucHVzaCh7IC4uLnNoYXJlZERhdGEsIC4uLnVuaXRTcGVjaWZpY0RhdGEgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhQXJyO1xufTtcblxuY29uc3QgcmV0dXJuRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEZvcmVjYXN0KCk7XG4gIGNvbnN0IGRhdGEgPSBwcm9jZXNzRGF0YShyZXNwb25zZSk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IHsgc2V0Q2l0eSwgZ2V0Q2l0eSwgZ2V0VW5pdHMsIHNldFVuaXRzLCByZXR1cm5EYXRhIH07XG4iLCJjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcblxuY29uc3QgZGF5cyA9IFtcbiAgJ1N1bmRheScsXG4gICdNb25kYXknLFxuICAnVHVlc2RheScsXG4gICdXZWRuZXNkYXknLFxuICAnVGh1cnNkYXknLFxuICAnRnJpZGF5JyxcbiAgJ1NhdHVyZGF5Jyxcbl07XG5cbmNvbnN0IG1vbnRocyA9IFtcbiAgJ0phbnVhcnknLFxuICAnRmVicnVhcnknLFxuICAnTWFyY2gnLFxuICAnQXByaWwnLFxuICAnTWF5JyxcbiAgJ0p1bmUnLFxuICAnSnVseScsXG4gICdBdWd1c3QnLFxuICAnU2VwdGVtYmVyJyxcbiAgJ09jdG9iZXInLFxuICAnTm92ZW1iZXInLFxuICAnRGVjZW1iZXInLFxuXTtcblxuY29uc3QgZGF0ZVNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0ZScpO1xuXG5jb25zdCBkaXNwbGF5VG9kYXlzRGF0ZSA9ICgpID0+IHtcbiAgY29uc3QgZGF5T2ZUaGVXZWVrID0gZGF5c1tkYXRlLmdldERheSgpXS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBtb250aCA9IG1vbnRoc1tkYXRlLmdldE1vbnRoKCldLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRheU9mVGhlTW9udGggPSBkYXRlLmdldERhdGUoKTtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICBkYXRlU3Bhbi50ZXh0Q29udGVudCA9IGAke2RheU9mVGhlV2Vla30sICR7bW9udGh9ICR7ZGF5T2ZUaGVNb250aH0sICR7eWVhcn1gO1xufTtcblxuZGlzcGxheVRvZGF5c0RhdGUoKTtcbiIsImltcG9ydCB7IHNldENpdHkgfSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0IHsgZGlzcGxheVdlYXRoZXJDb250ZW50IH0gZnJvbSAnLi9jb250ZW50RE9NJztcbmltcG9ydCB7IGRpc3BsYXlDaXR5IH0gZnJvbSAnLi90aXRsZURPTSc7XG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9dGV4dF0nKTtcbmNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuXG5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgc2V0Q2l0eShpbnB1dC52YWx1ZSk7XG4gIGRpc3BsYXlXZWF0aGVyQ29udGVudCgpO1xuICBkaXNwbGF5Q2l0eSgpO1xuICBmb3JtLnJlc2V0KCk7XG59KTtcblxuLy8gVE9ETzogcmVtb3ZlIHRoZXNlIGxpbmVzIGFmdGVyIHRlc3RpbmdcbmRpc3BsYXlXZWF0aGVyQ29udGVudCgpO1xuZGlzcGxheUNpdHkoKTtcbiIsImNvbnN0IGFwcGVuZENoaWxkcmVuID0gKHBhcmVudE5vZGUsIGNoaWxkcmVuQXJyKSA9PiB7XG4gIGNoaWxkcmVuQXJyLmZvckVhY2goKGNoaWxkKSA9PiBwYXJlbnROb2RlLmFwcGVuZENoaWxkKGNoaWxkKSk7XG59O1xuXG5jb25zdCBjbGVhckNvbnRlbnQgPSAobm9kZUFycikgPT4ge1xuICBub2RlQXJyLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBjb25zdCBjaGlsZE5vZGUgPSBub2RlO1xuICAgIGNoaWxkTm9kZS50ZXh0Q29udGVudCA9ICcnO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IGFwcGVuZENoaWxkcmVuLCBjbGVhckNvbnRlbnQgfTtcbiIsImV4cG9ydCBjb25zdCBrZXkgPSAnMzlkMWJlMDAxZWY5NGQzZGJjMDQwNjQ4MjQzMTAxJztcbiIsImltcG9ydCB7IGdldENpdHkgfSBmcm9tICcuL2RhdGEnO1xuXG5jb25zdCB0aXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS1jb250YWluZXInKTtcblxuY29uc3QgZGlzcGxheUNpdHkgPSAoKSA9PiB7XG4gIGNvbnN0IGNpdHkgPSBnZXRDaXR5KCk7XG4gIHRpdGxlQ29udGFpbmVyLnRleHRDb250ZW50ID0gY2l0eS50b1VwcGVyQ2FzZSgpO1xufTtcblxuZXhwb3J0IHsgZGlzcGxheUNpdHkgfTtcbiIsImNvbnN0IHRoZW1lVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQudGhlbWUtdG9nZ2xlJyk7XG5jb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKTtcblxuY29uc3QgdG9nZ2xlVGhlbWUgPSAoKSA9PiB7XG4gIGlmICh0aGVtZVRvZ2dsZS5jaGVja2VkKSB7XG4gICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKCdsaWdodCcpO1xuICAgIHJvb3QuY2xhc3NMaXN0LmFkZCgnZGFyaycpO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpO1xuICAgIHJvb3QuY2xhc3NMaXN0LmFkZCgnbGlnaHQnKTtcbiAgfVxufTtcblxudGhlbWVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVUaGVtZSk7XG4iLCJpbXBvcnQgeyBkaXNwbGF5V2VhdGhlckNvbnRlbnQgfSBmcm9tICcuL2NvbnRlbnRET00nO1xuaW1wb3J0IHsgc2V0VW5pdHMsIGdldFVuaXRzIH0gZnJvbSAnLi9kYXRhJztcblxuY29uc3QgdW5pdFRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LnVuaXQtdG9nZ2xlJyk7XG5cbmNvbnN0IHRvZ2dsZVVuaXRzID0gKCkgPT4ge1xuICBpZiAoZ2V0VW5pdHMoKSA9PT0gJ2ltcGVyaWFsJykge1xuICAgIHNldFVuaXRzKCdtZXRyaWMnKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRVbml0cygnaW1wZXJpYWwnKTtcbiAgfVxuICBkaXNwbGF5V2VhdGhlckNvbnRlbnQoKTtcbn07XG5cbnVuaXRUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVVbml0cyk7XG4iLCJjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtY29udGFpbmVyJyk7XG5jb25zdCBjb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtY29udGFpbmVyJyk7XG5jb25zdCBkYXlGcmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGF5LWZyYW1lJyk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDkyMCkge1xuICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZnVsbC12aWV3Jyk7XG4gICAgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCduYXJyb3ctdmlldycpO1xuXG4gICAgY29udGVudENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdmdWxsLXZpZXcnKTtcbiAgICBjb250ZW50Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ25hcnJvdy12aWV3Jyk7XG5cbiAgICBkYXlGcmFtZXMuZm9yRWFjaCgoZnJhbWUpID0+IHtcbiAgICAgIGZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2Z1bGwtdmlldycpO1xuICAgICAgZnJhbWUuY2xhc3NMaXN0LmFkZCgnbmFycm93LXZpZXcnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Z1bGwtdmlldycpO1xuICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnbmFycm93LXZpZXcnKTtcblxuICAgIGNvbnRlbnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZnVsbC12aWV3Jyk7XG4gICAgY29udGVudENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCduYXJyb3ctdmlldycpO1xuXG4gICAgZGF5RnJhbWVzLmZvckVhY2goKGZyYW1lKSA9PiB7XG4gICAgICBmcmFtZS5jbGFzc0xpc3QuYWRkKCdmdWxsLXZpZXcnKTtcbiAgICAgIGZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ25hcnJvdy12aWV3Jyk7XG4gICAgfSk7XG4gIH1cbn0pO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1ETStTZXJpZitEaXNwbGF5JmZhbWlseT1SdWZpbmE6d2dodEA3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3BlbitTYW5zJmZhbWlseT1SdWZpbmE6d2dodEA3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RUIrR2FyYW1vbmQ6d2dodEA1MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XG4gIC8qIG91dGxpbmU6IDFweCBzb2xpZCByZWQ7ICovXG59XG5cbjpyb290IHtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG46cm9vdC5saWdodCB7XG4gIC0tYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQyLCAyMzIpO1xuICAtLWNvbnRyYXN0LWNvbG9yOiByZ2IoMjYsIDI4LCAyNik7XG4gIC0tc2VhcmNoLWJhY2tncm91bmQtY29sb3I6IHJnYmEoMjYsIDI4LCAyNiwgMC4xKTtcbn1cblxuOnJvb3QuZGFyayB7XG4gIC0tYmFja2dyb3VuZC1jb2xvcjogcmdiKDI2LCAyOCwgMjYpO1xuICAtLWNvbnRyYXN0LWNvbG9yOiByZ2IoMjQ1LCAyNDIsIDIzMik7XG4gIC0tc2VhcmNoLWJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ1LCAyNDIsIDIzMiwgMC4xKTtcbn1cblxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xuICBjb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xuXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KG1pbi1jb250ZW50LCAxMTAwcHgpO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLnBhZ2UtY29udGFpbmVyIHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcGFkZGluZzogMCAxMHB4O1xuXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDUsIG1pbi1jb250ZW50KTtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xufVxuXG4udGl0bGUtY29udGFpbmVyLFxuLmNvbnRlbnQtY29udGFpbmVyLFxuZm9vdGVyIHtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbi50aXRsZS1jb250YWluZXIge1xuICBmb250LXNpemU6IDVyZW07XG4gIGxldHRlci1zcGFjaW5nOiAwLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRpdGxlLWNvbnRhaW5lcixcbmZvb3RlciAqLFxuLnVuaXQtdG9nZ2xlICoge1xuICBmb250LWZhbWlseTogJ1J1ZmluYScsIHNlcmlmO1xufVxuXG4ubWVudS1jb250YWluZXIge1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcblxuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5tZW51LWNvbnRhaW5lci5mdWxsLXZpZXcge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDE0MHB4IG1pbm1heCgyMDBweCwgMzAlKSAxNDBweDtcbn1cblxuLm1lbnUtY29udGFpbmVyLm5hcnJvdy12aWV3IHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCBtaW4tY29udGVudDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG87XG4gIGNvbHVtbi1nYXA6IDMwcHg7XG4gIHJvdy1nYXA6IDEwcHg7XG5cbiAgPiAudGhlbWUtdG9nZ2xlIHtcbiAgICBncmlkLXJvdzogMi8zO1xuICB9XG4gID4gZm9ybSB7XG4gICAgZ3JpZC1jb2x1bW46IDEvMztcbiAgfVxuICA+IC51bml0LXRvZ2dsZSB7XG4gICAgZ3JpZC1yb3c6IDIvMztcbiAgfVxufVxuXG4ubWVudS1jb250YWluZXIsXG5mb290ZXIge1xuICB3aWR0aDogMTAwJTtcbiAganVzdGlmeS1zZWxmOiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4udGhlbWUtdG9nZ2xlLnN3aXRjaCB7XG4gIHdpZHRoOiA1N3B4O1xufVxuXG4udW5pdC10b2dnbGUuc3dpdGNoIHtcbiAgd2lkdGg6IDE0MHB4O1xufVxuXG4udGhlbWUtdG9nZ2xlLnNsaWRlciB7XG4gIHdpZHRoOiAyMnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBnb2xkZW5yb2Q7XG59XG5cbi51bml0LXRvZ2dsZS5zbGlkZXIge1xuICB3aWR0aDogNzBweDtcbn1cblxuLm1ldHJpYyxcbi5pbXBlcmlhbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA2cHg7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5pbXBlcmlhbCB7XG4gIGxlZnQ6IDE0cHg7XG59XG5cbi5tZXRyaWMge1xuICByaWdodDogMTBweDtcbn1cblxuLnN3aXRjaCB7XG4gIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW46IDNweDtcbiAgaGVpZ2h0OiAzM3B4O1xufVxuXG4uc3dpdGNoLFxuLnNsaWRlciB7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG59XG5cbmlucHV0W3R5cGU9J2NoZWNrYm94J10ge1xuICBhcHBlYXJhbmNlOiBub25lO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uc2xpZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogM3B4O1xuICBsZWZ0OiA0cHg7XG4gIHRyYW5zaXRpb246IDMwMG1zO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGhlaWdodDogMjJweDtcbn1cblxuaW5wdXRbdHlwZT0nY2hlY2tib3gnXTpjaGVja2VkIHtcbiAgKyAudGhlbWUtdG9nZ2xlLnNsaWRlciB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMjNweCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgYm94LXNoYWRvdzogaW5zZXQgLThweCAwIDBweCAwcHggcmdiKDExNiwgMTU0LCAyMjQpO1xuICB9XG4gICsgLnVuaXQtdG9nZ2xlLnNsaWRlciB7XG4gICAgd2lkdGg6IDU1cHg7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNzNweCk7XG4gIH1cbn1cblxuZm9ybSB7XG4gIHdpZHRoOiAxMDAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuaW5wdXRbdHlwZT0ndGV4dCddIHtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7XG4gIHBhZGRpbmc6IDdweCAxNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zZWFyY2gtYmFja2dyb3VuZC1jb2xvcik7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG5cbiAgZmxleDogMTtcbn1cblxuaW5wdXRbdHlwZT0ndGV4dCddOmZvY3VzIHtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiAycHggc29saWQgY29ybmZsb3dlcmJsdWU7XG59XG5cbmZvcm0gYnV0dG9uIHtcbiAgcGFkZGluZzogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMzVweDtcbiAgem9vbTogMTclO1xuICB0cmFuc2l0aW9uOiAzMDBtcztcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB6b29tOiAxOCU7XG59XG5cbi5kYXRlLWNvbnRhaW5lciB7XG4gIGJvcmRlci10b3A6IDVweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMnB4O1xuICB3aWR0aDogMTAwJTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogNTBweDtcbn1cblxuLmRhdGUtY29udGFpbmVyICoge1xuICBmb250LWZhbWlseTogJ0VCIEdhcmFtb25kJywgc2VyaWY7XG4gIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDAuOHJlbTtcbn1cblxuLmNvbnRlbnQtYmFja2dyb3VuZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMzBweCAwO1xufVxuXG4uY29udGVudC1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMXB4O1xufVxuXG4uY29udGVudC1jb250YWluZXIuZnVsbC12aWV3IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcblxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIyMHB4LCAxZnIpKTtcbn1cblxuLmNvbnRlbnQtY29udGFpbmVyLm5hcnJvdy12aWV3IHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZml0LCBtaW4tY29udGVudCk7XG5cbiAgPiAuZGF5LWZyYW1lIHtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICB9XG59XG5cbi5kYXktZnJhbWUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgcGFkZGluZzogMCAzMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTVweDtcbn1cblxuLmRheS1mcmFtZS5uYXJyb3ctdmlldyB7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBhdXRvO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gYXV0bztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzdHJldGNoO1xuICBnYXA6IDE1cHg7XG59XG5cbi50aXRsZSBoMyB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuXG4udGVtcCxcbi5kZXRhaWxzIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi50ZW1wIHA6Zmlyc3QtY2hpbGQge1xuICBmb250LXNpemU6IDNyZW07XG59XG5cbi50ZW1wIHA6bGFzdC1jaGlsZCB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuXG4uZGF5LWZyYW1lIDo6YmVmb3JlIHtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cblxuLmRldGFpbHMge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDNweDtcbn1cblxuLmRldGFpbHMgcDpmaXJzdC1jaGlsZDo6YmVmb3JlIHtcbiAgY29udGVudDogJ3JhaW46ICc7XG59XG5cbi5kZXRhaWxzIHA6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xuICBjb250ZW50OiAnd2luZDogJztcbn1cblxuLmRldGFpbHMgcDpsYXN0LWNoaWxkOjpiZWZvcmUge1xuICBjb250ZW50OiAnaHVtaWRpdHk6ICc7XG59XG5cbi5pbWcge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmlsdGVyOiBncmF5c2NhbGUoMC41KTtcbn1cblxuaW1nIHtcbiAgd2lkdGg6IDEwMHB4O1xufVxuXG5mb290ZXIge1xuICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5jcmVkaXRzIGEge1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgY29sb3I6IGluaGVyaXQ7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUlBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7RUFDdEIsb0NBQW9DO0VBQ3BDLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxzQ0FBc0M7RUFDdEMsaUNBQWlDO0VBQ2pDLGdEQUFnRDtBQUNsRDs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxvQ0FBb0M7RUFDcEMsbURBQW1EO0FBQ3JEOztBQUVBO0VBQ0UseUNBQXlDO0VBQ3pDLDRCQUE0Qjs7RUFFNUIsYUFBYTtFQUNiLGtEQUFrRDtFQUNsRCx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTs7RUFFZixhQUFhO0VBQ2IsMENBQTBDO0VBQzFDLHFCQUFxQjtBQUN2Qjs7QUFFQTs7O0VBR0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZUFBZTtFQUNmLHNCQUFzQjtFQUN0QixrQkFBa0I7QUFDcEI7O0FBRUE7OztFQUdFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLG9CQUFvQjs7RUFFcEIsYUFBYTtFQUNiLDhC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QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsMkNBQTJDO0VBQzNDLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsc0JBQXNCOztFQUV0QixhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLGNBQWM7QUFDaEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RE0rU2VyaWYrRGlzcGxheSZmYW1pbHk9UnVmaW5hOndnaHRANzAwJmRpc3BsYXk9c3dhcCcpO1xcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU9wZW4rU2FucyZmYW1pbHk9UnVmaW5hOndnaHRANzAwJmRpc3BsYXk9c3dhcCcpO1xcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUVCK0dhcmFtb25kOndnaHRANTAwJmRpc3BsYXk9c3dhcCcpO1xcblxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XFxuICAvKiBvdXRsaW5lOiAxcHggc29saWQgcmVkOyAqL1xcbn1cXG5cXG46cm9vdCB7XFxuICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbjpyb290LmxpZ2h0IHtcXG4gIC0tYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQyLCAyMzIpO1xcbiAgLS1jb250cmFzdC1jb2xvcjogcmdiKDI2LCAyOCwgMjYpO1xcbiAgLS1zZWFyY2gtYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNiwgMjgsIDI2LCAwLjEpO1xcbn1cXG5cXG46cm9vdC5kYXJrIHtcXG4gIC0tYmFja2dyb3VuZC1jb2xvcjogcmdiKDI2LCAyOCwgMjYpO1xcbiAgLS1jb250cmFzdC1jb2xvcjogcmdiKDI0NSwgMjQyLCAyMzIpO1xcbiAgLS1zZWFyY2gtYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDUsIDI0MiwgMjMyLCAwLjEpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xcbiAgY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heChtaW4tY29udGVudCwgMTEwMHB4KTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ucGFnZS1jb250YWluZXIge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDAgMTBweDtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCBtaW4tY29udGVudCk7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50aXRsZS1jb250YWluZXIsXFxuLmNvbnRlbnQtY29udGFpbmVyLFxcbmZvb3RlciB7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXFxuLnRpdGxlLWNvbnRhaW5lciB7XFxuICBmb250LXNpemU6IDVyZW07XFxuICBsZXR0ZXItc3BhY2luZzogMC41cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4udGl0bGUtY29udGFpbmVyLFxcbmZvb3RlciAqLFxcbi51bml0LXRvZ2dsZSAqIHtcXG4gIGZvbnQtZmFtaWx5OiAnUnVmaW5hJywgc2VyaWY7XFxufVxcblxcbi5tZW51LWNvbnRhaW5lciB7XFxuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubWVudS1jb250YWluZXIuZnVsbC12aWV3IHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMTQwcHggbWlubWF4KDIwMHB4LCAzMCUpIDE0MHB4O1xcbn1cXG5cXG4ubWVudS1jb250YWluZXIubmFycm93LXZpZXcge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCBtaW4tY29udGVudDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byBhdXRvO1xcbiAgY29sdW1uLWdhcDogMzBweDtcXG4gIHJvdy1nYXA6IDEwcHg7XFxuXFxuICA+IC50aGVtZS10b2dnbGUge1xcbiAgICBncmlkLXJvdzogMi8zO1xcbiAgfVxcbiAgPiBmb3JtIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvMztcXG4gIH1cXG4gID4gLnVuaXQtdG9nZ2xlIHtcXG4gICAgZ3JpZC1yb3c6IDIvMztcXG4gIH1cXG59XFxuXFxuLm1lbnUtY29udGFpbmVyLFxcbmZvb3RlciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGp1c3RpZnktc2VsZjogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLnRoZW1lLXRvZ2dsZS5zd2l0Y2gge1xcbiAgd2lkdGg6IDU3cHg7XFxufVxcblxcbi51bml0LXRvZ2dsZS5zd2l0Y2gge1xcbiAgd2lkdGg6IDE0MHB4O1xcbn1cXG5cXG4udGhlbWUtdG9nZ2xlLnNsaWRlciB7XFxuICB3aWR0aDogMjJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdvbGRlbnJvZDtcXG59XFxuXFxuLnVuaXQtdG9nZ2xlLnNsaWRlciB7XFxuICB3aWR0aDogNzBweDtcXG59XFxuXFxuLm1ldHJpYyxcXG4uaW1wZXJpYWwge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA2cHg7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG4gIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uaW1wZXJpYWwge1xcbiAgbGVmdDogMTRweDtcXG59XFxuXFxuLm1ldHJpYyB7XFxuICByaWdodDogMTBweDtcXG59XFxuXFxuLnN3aXRjaCB7XFxuICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luOiAzcHg7XFxuICBoZWlnaHQ6IDMzcHg7XFxufVxcblxcbi5zd2l0Y2gsXFxuLnNsaWRlciB7XFxuICBib3JkZXItcmFkaXVzOiAzMHB4O1xcbn1cXG5cXG5pbnB1dFt0eXBlPSdjaGVja2JveCddIHtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uc2xpZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogM3B4O1xcbiAgbGVmdDogNHB4O1xcbiAgdHJhbnNpdGlvbjogMzAwbXM7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBoZWlnaHQ6IDIycHg7XFxufVxcblxcbmlucHV0W3R5cGU9J2NoZWNrYm94J106Y2hlY2tlZCB7XFxuICArIC50aGVtZS10b2dnbGUuc2xpZGVyIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMjNweCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAtOHB4IDAgMHB4IDBweCByZ2IoMTE2LCAxNTQsIDIyNCk7XFxuICB9XFxuICArIC51bml0LXRvZ2dsZS5zbGlkZXIge1xcbiAgICB3aWR0aDogNTVweDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNzNweCk7XFxuICB9XFxufVxcblxcbmZvcm0ge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuaW5wdXRbdHlwZT0ndGV4dCddIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcXG4gIHBhZGRpbmc6IDdweCAxNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2VhcmNoLWJhY2tncm91bmQtY29sb3IpO1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG5cXG4gIGZsZXg6IDE7XFxufVxcblxcbmlucHV0W3R5cGU9J3RleHQnXTpmb2N1cyB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBvdXRsaW5lOiAycHggc29saWQgY29ybmZsb3dlcmJsdWU7XFxufVxcblxcbmZvcm0gYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAzNXB4O1xcbiAgem9vbTogMTclO1xcbiAgdHJhbnNpdGlvbjogMzAwbXM7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB6b29tOiAxOCU7XFxufVxcblxcbi5kYXRlLWNvbnRhaW5lciB7XFxuICBib3JkZXItdG9wOiA1cHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDJweDtcXG4gIHdpZHRoOiAxMDAlO1xcblxcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGdhcDogNTBweDtcXG59XFxuXFxuLmRhdGUtY29udGFpbmVyICoge1xcbiAgZm9udC1mYW1pbHk6ICdFQiBHYXJhbW9uZCcsIHNlcmlmO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxufVxcblxcbi5jb250ZW50LWJhY2tncm91bmQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDMwcHggMDtcXG59XFxuXFxuLmNvbnRlbnQtY29udGFpbmVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMXB4O1xcbn1cXG5cXG4uY29udGVudC1jb250YWluZXIuZnVsbC12aWV3IHtcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xcblxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMjBweCwgMWZyKSk7XFxufVxcblxcbi5jb250ZW50LWNvbnRhaW5lci5uYXJyb3ctdmlldyB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZml0LCBtaW4tY29udGVudCk7XFxuXFxuICA+IC5kYXktZnJhbWUge1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgfVxcbn1cXG5cXG4uZGF5LWZyYW1lIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xcbiAgcGFkZGluZzogMCAzMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogMTVweDtcXG59XFxuXFxuLmRheS1mcmFtZS5uYXJyb3ctdmlldyB7XFxuICB3aWR0aDogMTAwJTtcXG5cXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBhdXRvO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG87XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzdHJldGNoO1xcbiAgZ2FwOiAxNXB4O1xcbn1cXG5cXG4udGl0bGUgaDMge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbi50ZW1wLFxcbi5kZXRhaWxzIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4udGVtcCBwOmZpcnN0LWNoaWxkIHtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG59XFxuXFxuLnRlbXAgcDpsYXN0LWNoaWxkIHtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLmRheS1mcmFtZSA6OmJlZm9yZSB7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbn1cXG5cXG4uZGV0YWlscyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxufVxcblxcbi5kZXRhaWxzIHA6Zmlyc3QtY2hpbGQ6OmJlZm9yZSB7XFxuICBjb250ZW50OiAncmFpbjogJztcXG59XFxuXFxuLmRldGFpbHMgcDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiAnd2luZDogJztcXG59XFxuXFxuLmRldGFpbHMgcDpsYXN0LWNoaWxkOjpiZWZvcmUge1xcbiAgY29udGVudDogJ2h1bWlkaXR5OiAnO1xcbn1cXG5cXG4uaW1nIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZpbHRlcjogZ3JheXNjYWxlKDAuNSk7XFxufVxcblxcbmltZyB7XFxuICB3aWR0aDogMTAwcHg7XFxufVxcblxcbmZvb3RlciB7XFxuICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgcGFkZGluZy10b3A6IDVweDtcXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5jcmVkaXRzIGEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlcy5jc3MnO1xuaW1wb3J0ICcuL2RhdGEnO1xuaW1wb3J0ICcuL2Zvcm1ET00nO1xuaW1wb3J0ICcuL2RhdGVET00nO1xuaW1wb3J0ICcuL3RvZ2dsZVRoZW1lRE9NJztcbmltcG9ydCAnLi90b2dnbGVVbml0RE9NJztcbmltcG9ydCAnLi92aWV3TW9kZURPTSc7XG4iXSwibmFtZXMiOlsiZ2V0VW5pdHMiLCJyZXR1cm5EYXRhIiwiY2xlYXJDb250ZW50IiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3VycmVudERhdGFBcnIiLCJnZW5lcmF0ZURheUNvbnRlbnQiLCJvYmoiLCJpbmRleCIsImZyYW1lIiwiZGF5UGFyYSIsImNvbmRpdGlvblBhcmEiLCJpbWciLCJtYXhUZW1wUGFyYSIsIm1pblRlbXBQYXJhIiwicHJlY2lwUGFyYSIsIndpbmRQYXJhIiwiaHVtaWRpdHlQYXJhIiwidW5pdHNUeXBlIiwidGVtcFVuaXQiLCJwcmVjaXBVbml0Iiwid2luZFVuaXQiLCJ0ZXh0Q29udGVudCIsImRhdGUiLCJjb25kaXRpb24iLCJtYXhUZW1wIiwibWluVGVtcCIsInRvdGFsUHJlY2lwIiwibWF4V2luZCIsImF2Z0h1bWlkaXR5Iiwic3JjIiwiaW1nVVJMIiwiZGlzcGxheVdlYXRoZXJDb250ZW50IiwiZm9yRWFjaCIsImtleSIsImZvcmVjYXN0VVJMIiwiY2l0eSIsInNldENpdHkiLCJzdHJpbmciLCJnZXRDaXR5IiwidW5pdHMiLCJzZXRVbml0cyIsImZldGNoRm9yZWNhc3QiLCJyZXNwb25zZSIsImZldGNoIiwibW9kZSIsImRhdGEiLCJqc29uIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzRGF0YSIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJkYXRhQXJyIiwiZGF5T2JqIiwiZGF5RGF0YSIsImRheSIsInNoYXJlZERhdGEiLCJ1bml0U3BlY2lmaWNEYXRhIiwidGV4dCIsImljb24iLCJhdmdodW1pZGl0eSIsIm1heHRlbXBfZiIsIm1pbnRlbXBfZiIsInRvdGFscHJlY2lwX2luIiwibWF4d2luZF9tcGgiLCJtYXh0ZW1wX2MiLCJtaW50ZW1wX2MiLCJ0b3RhbHByZWNpcF9tbSIsIm1heHdpbmRfa3BoIiwiTWF0aCIsInJvdW5kIiwicHVzaCIsIkRhdGUiLCJkYXlzIiwibW9udGhzIiwiZGF0ZVNwYW4iLCJkaXNwbGF5VG9kYXlzRGF0ZSIsImRheU9mVGhlV2VlayIsImdldERheSIsInRvVXBwZXJDYXNlIiwibW9udGgiLCJnZXRNb250aCIsImRheU9mVGhlTW9udGgiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwiZGlzcGxheUNpdHkiLCJmb3JtIiwiaW5wdXQiLCJzZWFyY2hCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwicmVzZXQiLCJhcHBlbmRDaGlsZHJlbiIsInBhcmVudE5vZGUiLCJjaGlsZHJlbkFyciIsImNoaWxkIiwiYXBwZW5kQ2hpbGQiLCJub2RlQXJyIiwibm9kZSIsImNoaWxkTm9kZSIsInRpdGxlQ29udGFpbmVyIiwidGhlbWVUb2dnbGUiLCJyb290IiwidG9nZ2xlVGhlbWUiLCJjaGVja2VkIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwidW5pdFRvZ2dsZSIsInRvZ2dsZVVuaXRzIiwibWVudUNvbnRhaW5lciIsImNvbnRlbnRDb250YWluZXIiLCJkYXlGcmFtZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwid2luZG93IiwiaW5uZXJXaWR0aCJdLCJzb3VyY2VSb290IjoiIn0=