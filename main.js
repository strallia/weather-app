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
  const unitsType = (0,_data__WEBPACK_IMPORTED_MODULE_0__.getUnits)();
  const tempUnit = unitsType === 'imperial' ? 'F' : 'C';
  const precipUnit = unitsType === 'imperial' ? 'in' : 'mm';
  const windUnit = unitsType === 'imperial' ? 'mph' : 'kph';
  conditionPara.textContent = obj.condition;
  maxTempPara.textContent = `${obj.maxTemp}°${tempUnit}`;
  minTempPara.textContent = `${obj.minTemp}°${tempUnit}`;
  precipPara.textContent = `${obj.totalPrecip} ${precipUnit}`;
  windPara.textContent = `${obj.maxWind} ${windUnit}`;
  humidityPara.textContent = `${obj.avgHumidity}%`;
  img.src = `https:${obj.imgURL}`;
};
const displayWeatherContent = async () => {
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

const forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=${_key__WEBPACK_IMPORTED_MODULE_0__.key}&days=4&q=`;

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
const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const forecastDayTitles = document.querySelectorAll('h3.forecast');
const displayForecastDayOfTheWeek = () => {
  const extendedDaysArr = [...daysArr, ...daysArr];
  const firstForcastDayIndex = date.getDay() + 1;
  const dayNames = extendedDaysArr.slice(firstForcastDayIndex, firstForcastDayIndex + 3);
  forecastDayTitles.forEach((title, index) => {
    const titleNode = title;
    titleNode.textContent = dayNames[index];
  });
};
displayForecastDayOfTheWeek();
const dateSpan = document.querySelector('.date');
const displayTodaysDate = () => {
  const dayOfTheWeek = daysArr[date.getDay()].toUpperCase();
  const month = monthsArr[date.getMonth()].toUpperCase();
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

const body = document.querySelector('body');
const menuContainer = document.querySelector('.menu-container');
const contentContainer = document.querySelector('.content-container');
const dayFrames = document.querySelectorAll('.day-frame');
const toggleViewMode = () => {
  if (window.innerWidth < 920) {
    [body, menuContainer, contentContainer, ...dayFrames].forEach(container => {
      container.classList.remove('full-view');
      container.classList.add('narrow-view');
    });
  } else {
    [body, menuContainer, contentContainer, ...dayFrames].forEach(container => {
      container.classList.add('full-view');
      container.classList.remove('narrow-view');
    });
  }
};
toggleViewMode();
window.addEventListener('resize', toggleViewMode);

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
  justify-content: center;
}

body.full-view {
  grid-template-columns: minmax(min-content, 1100px);
}

body.narrow-view {
  grid-template-columns: minmax(min-content, 600px);
  .title-container {
    font-size: 50px;
  }
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
  word-break: break-all;
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
  max-width: 400px;

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
  color: var(--contrast-color);

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
  align-items: center;
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
  margin: -30px 0;

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

  grid-template-columns: repeat(2, minmax(150px, 200px));
  grid-template-rows: auto auto;
  align-items: center;
  justify-content: center;
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
  padding: 5px 0;
  font-size: 0.8rem;
  letter-spacing: 0.2rem;

  display: flex;
  justify-content: space-between;
}

.credits a {
  font-family: inherit;
  color: inherit;
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAIA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,oCAAoC;EACpC,4BAA4B;AAC9B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,sCAAsC;EACtC,iCAAiC;EACjC,gDAAgD;AAClD;;AAEA;EACE,mCAAmC;EACnC,oCAAoC;EACpC,mDAAmD;AACrD;;AAEA;EACE,yCAAyC;EACzC,4BAA4B;;EAE5B,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,kDAAkD;AACpD;;AAEA;EACE,iDAAiD;EACjD;IACE,eAAe;EACjB;AACF;;AAEA;EACE,aAAa;EACb,eAAe;;EAEf,aAAa;EACb,0CAA0C;EAC1C,qBAAqB;AACvB;;AAEA;;;EAGE,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,sBAAsB;EACtB,kBAAkB;EAClB,qBAAqB;AACvB;;AAEA;;;EAGE,4BAA4B;AAC9B;;AAEA;EACE,oBAAoB;;EAEpB,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,qDAAqD;AACvD;;AAEA;EACE,8CAA8C;EAC9C,6BAA6B;EAC7B,gBAAgB;EAChB,aAAa;EACb,gBAAgB;;EAEhB;IACE,aAAa;EACf;EACA;IACE,gBAAgB;EAClB;EACA;IACE,aAAa;EACf;AACF;;AAEA;;EAEE,WAAW;EACX,2BAA2B;AAC7B;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;EACX,2BAA2B;AAC7B;;AAEA;EACE,WAAW;AACb;;AAEA;;EAEE,kBAAkB;EAClB,QAAQ;EACR,iBAAiB;EACjB,8BAA8B;EAC9B,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,uCAAuC;EACvC,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;EACX,YAAY;AACd;;AAEA;;EAEE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,eAAe;EACf,6BAA6B;AAC/B;;AAEA;EACE,uCAAuC;EACvC,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,iBAAiB;EACjB,eAAe;EACf,YAAY;AACd;;AAEA;EACE;IACE,0BAA0B;IAC1B,6BAA6B;IAC7B,mDAAmD;EACrD;EACA;IACE,WAAW;IACX,0BAA0B;EAC5B;AACF;;AAEA;EACE,WAAW;EACX,kBAAkB;;EAElB,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,2BAA2B;EAC3B,iBAAiB;EACjB,gDAAgD;EAChD,mBAAmB;EACnB,4BAA4B;;EAE5B,OAAO;AACT;;AAEA;EACE,YAAY;EACZ,iCAAiC;AACnC;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,YAAY;EACZ,kBAAkB;EAClB,WAAW;EACX,SAAS;EACT,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,SAAS;AACX;;AAEA;EACE,2CAA2C;EAC3C,8CAA8C;EAC9C,kBAAkB;EAClB,YAAY;EACZ,WAAW;;EAEX,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,iCAAiC;EACjC,sBAAsB;EACtB,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,uCAAuC;EACvC,WAAW;EACX,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,QAAQ;AACV;;AAEA;EACE,4CAA4C;EAC5C,6CAA6C;;EAE7C,2DAA2D;AAC7D;;AAEA;EACE,0BAA0B;EAC1B,iDAAiD;EACjD,eAAe;;EAEf;IACE,aAAa;EACf;AACF;;AAEA;EACE,yCAAyC;EACzC,eAAe;EACf,kBAAkB;EAClB,aAAa;EACb,SAAS;AACX;;AAEA;EACE,WAAW;;EAEX,sDAAsD;EACtD,6BAA6B;EAC7B,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,iBAAiB;AACnB;;AAEA;;EAEE,iBAAiB;AACnB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,QAAQ;AACV;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,sBAAsB;AACxB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,2CAA2C;EAC3C,cAAc;EACd,iBAAiB;EACjB,sBAAsB;;EAEtB,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,oBAAoB;EACpB,cAAc;AAChB","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Rufina:wght@700&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Rufina:wght@700&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap');\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: 'Open Sans', sans-serif;\n  /* outline: 1px solid red; */\n}\n\n:root {\n  font-size: 16px;\n}\n\n:root.light {\n  --background-color: rgb(245, 242, 232);\n  --contrast-color: rgb(26, 28, 26);\n  --search-background-color: rgba(26, 28, 26, 0.1);\n}\n\n:root.dark {\n  --background-color: rgb(26, 28, 26);\n  --contrast-color: rgb(245, 242, 232);\n  --search-background-color: rgba(245, 242, 232, 0.1);\n}\n\nbody {\n  background-color: var(--background-color);\n  color: var(--contrast-color);\n\n  display: grid;\n  justify-content: center;\n}\n\nbody.full-view {\n  grid-template-columns: minmax(min-content, 1100px);\n}\n\nbody.narrow-view {\n  grid-template-columns: minmax(min-content, 600px);\n  .title-container {\n    font-size: 50px;\n  }\n}\n\n.page-container {\n  height: 100vh;\n  padding: 0 10px;\n\n  display: grid;\n  grid-template-rows: repeat(5, min-content);\n  justify-items: center;\n}\n\n.title-container,\n.content-container,\nfooter {\n  user-select: none;\n}\n\n.title-container {\n  font-size: 5rem;\n  letter-spacing: 0.5rem;\n  text-align: center;\n  word-break: break-all;\n}\n\n.title-container,\nfooter *,\n.unit-toggle * {\n  font-family: 'Rufina', serif;\n}\n\n.menu-container {\n  padding-bottom: 10px;\n\n  display: grid;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.menu-container.full-view {\n  grid-template-columns: 140px minmax(200px, 30%) 140px;\n}\n\n.menu-container.narrow-view {\n  grid-template-columns: min-content min-content;\n  grid-template-rows: auto auto;\n  column-gap: 30px;\n  row-gap: 10px;\n  max-width: 400px;\n\n  > .theme-toggle {\n    grid-row: 2/3;\n  }\n  > form {\n    grid-column: 1/3;\n  }\n  > .unit-toggle {\n    grid-row: 2/3;\n  }\n}\n\n.menu-container,\nfooter {\n  width: 100%;\n  justify-self: space-between;\n}\n\n.theme-toggle.switch {\n  width: 57px;\n}\n\n.unit-toggle.switch {\n  width: 140px;\n}\n\n.theme-toggle.slider {\n  width: 22px;\n  background-color: goldenrod;\n}\n\n.unit-toggle.slider {\n  width: 70px;\n}\n\n.metric,\n.imperial {\n  position: absolute;\n  top: 6px;\n  font-size: 0.8rem;\n  color: var(--background-color);\n  user-select: none;\n  cursor: pointer;\n}\n\n.imperial {\n  left: 14px;\n}\n\n.metric {\n  right: 10px;\n}\n\n.switch {\n  border: 3px solid var(--contrast-color);\n  overflow: hidden;\n  position: relative;\n  margin: 3px;\n  height: 33px;\n}\n\n.switch,\n.slider {\n  border-radius: 30px;\n}\n\ninput[type='checkbox'] {\n  appearance: none;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  background-color: transparent;\n}\n\n.slider {\n  background-color: var(--contrast-color);\n  position: absolute;\n  top: 3px;\n  left: 4px;\n  transition: 300ms;\n  cursor: pointer;\n  height: 22px;\n}\n\ninput[type='checkbox']:checked {\n  + .theme-toggle.slider {\n    transform: translate(23px);\n    background-color: transparent;\n    box-shadow: inset -8px 0 0px 0px rgb(116, 154, 224);\n  }\n  + .unit-toggle.slider {\n    width: 55px;\n    transform: translate(73px);\n  }\n}\n\nform {\n  width: 100%;\n  position: relative;\n\n  display: flex;\n  align-items: center;\n}\n\ninput[type='text'] {\n  border: none;\n  background-color: lightgray;\n  padding: 7px 15px;\n  background-color: var(--search-background-color);\n  border-radius: 20px;\n  color: var(--contrast-color);\n\n  flex: 1;\n}\n\ninput[type='text']:focus {\n  border: none;\n  outline: 2px solid cornflowerblue;\n}\n\nform button {\n  padding: 20px;\n  background-color: transparent;\n  border: none;\n  position: absolute;\n  right: 35px;\n  zoom: 17%;\n  transition: 300ms;\n}\n\nbutton:hover {\n  cursor: pointer;\n  zoom: 18%;\n}\n\n.date-container {\n  border-top: 5px solid var(--contrast-color);\n  border-bottom: 3px solid var(--contrast-color);\n  text-align: center;\n  padding: 2px;\n  width: 100%;\n\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 50px;\n}\n\n.date-container * {\n  font-family: 'EB Garamond', serif;\n  letter-spacing: 0.2rem;\n  font-weight: bold;\n  font-size: 0.8rem;\n}\n\n.content-background {\n  background-color: var(--contrast-color);\n  width: 100%;\n  margin: 30px 0;\n}\n\n.content-container {\n  width: 100%;\n  display: grid;\n  align-items: center;\n  justify-content: center;\n  gap: 1px;\n}\n\n.content-container.full-view {\n  border-left: 1px solid var(--contrast-color);\n  border-right: 1px solid var(--contrast-color);\n\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n}\n\n.content-container.narrow-view {\n  grid-template-columns: 1fr;\n  grid-template-rows: repeat(auto-fit, min-content);\n  margin: -30px 0;\n\n  > .day-frame {\n    padding: 20px;\n  }\n}\n\n.day-frame {\n  background-color: var(--background-color);\n  padding: 0 30px;\n  text-align: center;\n  display: grid;\n  gap: 15px;\n}\n\n.day-frame.narrow-view {\n  width: 100%;\n\n  grid-template-columns: repeat(2, minmax(150px, 200px));\n  grid-template-rows: auto auto;\n  align-items: center;\n  justify-content: center;\n  gap: 15px;\n}\n\n.title h3 {\n  font-size: 1.5rem;\n}\n\n.temp,\n.details {\n  font-weight: bold;\n}\n\n.temp p:first-child {\n  font-size: 3rem;\n}\n\n.temp p:last-child {\n  font-weight: normal;\n  font-size: 1.5rem;\n}\n\n.day-frame ::before {\n  font-weight: normal;\n}\n\n.details {\n  display: grid;\n  gap: 3px;\n}\n\n.details p:first-child::before {\n  content: 'rain: ';\n}\n\n.details p:nth-child(2)::before {\n  content: 'wind: ';\n}\n\n.details p:last-child::before {\n  content: 'humidity: ';\n}\n\n.img {\n  display: flex;\n  justify-content: center;\n  filter: grayscale(0.5);\n}\n\nimg {\n  width: 100px;\n}\n\nfooter {\n  border-top: 2px solid var(--contrast-color);\n  padding: 5px 0;\n  font-size: 0.8rem;\n  letter-spacing: 0.2rem;\n\n  display: flex;\n  justify-content: space-between;\n}\n\n.credits a {\n  font-family: inherit;\n  color: inherit;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGlGQUFpRixVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxjQUFjLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxNQUFNLFVBQVUsTUFBTSxNQUFNLEtBQUssVUFBVSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sT0FBTyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sT0FBTyxZQUFZLE9BQU8sS0FBSyxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLGFBQWEsTUFBTSxVQUFVLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLEtBQUssTUFBTSxNQUFNLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sTUFBTSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sTUFBTSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLE1BQU0sS0FBSyxVQUFVLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsY0FBYyxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVks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Q0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBc0I7QUFDTjtBQUNHO0FBQ0E7QUFDTztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udGVudERPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RhdGVET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZm9ybURPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9rZXkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdGl0bGVET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdG9nZ2xlVGhlbWVET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdG9nZ2xlVW5pdERPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy92aWV3TW9kZURPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFVuaXRzLCByZXR1cm5EYXRhIH0gZnJvbSAnLi9kYXRhJztcblxubGV0IGN1cnJlbnREYXRhQXJyO1xuXG5jb25zdCBnZW5lcmF0ZURheUNvbnRlbnQgPSAob2JqLCBpbmRleCkgPT4ge1xuICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5kYXktZnJhbWVbZGF0YS1pZD1cIiR7aW5kZXh9XCJdYCk7XG4gIGNvbnN0IGRheVBhcmEgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgPiBoMycpO1xuICBjb25zdCBjb25kaXRpb25QYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLnRpdGxlID4gcCcpO1xuICBjb25zdCBpbWcgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgY29uc3QgbWF4VGVtcFBhcmEgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCcudGVtcCA+IHA6Zmlyc3QtY2hpbGQnKTtcbiAgY29uc3QgbWluVGVtcFBhcmEgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCcudGVtcCA+IHA6bGFzdC1jaGlsZCcpO1xuICBjb25zdCBwcmVjaXBQYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLmRldGFpbHMgPiBwOmZpcnN0LW9mLXR5cGUnKTtcbiAgY29uc3Qgd2luZFBhcmEgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscyA+IHA6bnRoLWNoaWxkKDIpJyk7XG4gIGNvbnN0IGh1bWlkaXR5UGFyYSA9IGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzID4gcDpsYXN0LW9mLXR5cGUnKTtcblxuICBjb25zdCB1bml0c1R5cGUgPSBnZXRVbml0cygpO1xuICBjb25zdCB0ZW1wVW5pdCA9IHVuaXRzVHlwZSA9PT0gJ2ltcGVyaWFsJyA/ICdGJyA6ICdDJztcbiAgY29uc3QgcHJlY2lwVW5pdCA9IHVuaXRzVHlwZSA9PT0gJ2ltcGVyaWFsJyA/ICdpbicgOiAnbW0nO1xuICBjb25zdCB3aW5kVW5pdCA9IHVuaXRzVHlwZSA9PT0gJ2ltcGVyaWFsJyA/ICdtcGgnIDogJ2twaCc7XG5cbiAgY29uZGl0aW9uUGFyYS50ZXh0Q29udGVudCA9IG9iai5jb25kaXRpb247XG4gIG1heFRlbXBQYXJhLnRleHRDb250ZW50ID0gYCR7b2JqLm1heFRlbXB9wrAke3RlbXBVbml0fWA7XG4gIG1pblRlbXBQYXJhLnRleHRDb250ZW50ID0gYCR7b2JqLm1pblRlbXB9wrAke3RlbXBVbml0fWA7XG4gIHByZWNpcFBhcmEudGV4dENvbnRlbnQgPSBgJHtvYmoudG90YWxQcmVjaXB9ICR7cHJlY2lwVW5pdH1gO1xuICB3aW5kUGFyYS50ZXh0Q29udGVudCA9IGAke29iai5tYXhXaW5kfSAke3dpbmRVbml0fWA7XG4gIGh1bWlkaXR5UGFyYS50ZXh0Q29udGVudCA9IGAke29iai5hdmdIdW1pZGl0eX0lYDtcblxuICBpbWcuc3JjID0gYGh0dHBzOiR7b2JqLmltZ1VSTH1gO1xufTtcblxuY29uc3QgZGlzcGxheVdlYXRoZXJDb250ZW50ID0gYXN5bmMgKCkgPT4ge1xuICBjdXJyZW50RGF0YUFyciA9IGF3YWl0IHJldHVybkRhdGEoKTtcbiAgY3VycmVudERhdGFBcnIuZm9yRWFjaCgob2JqLCBpbmRleCkgPT4gZ2VuZXJhdGVEYXlDb250ZW50KG9iaiwgaW5kZXgpKTtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlXZWF0aGVyQ29udGVudCB9O1xuIiwiaW1wb3J0IHsga2V5IH0gZnJvbSAnLi9rZXknO1xuXG5jb25zdCBmb3JlY2FzdFVSTCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke2tleX0mZGF5cz00JnE9YDtcblxuLy8gc3RhdGUgdmFyaWFibGVzXG5sZXQgY2l0eSA9ICdkYXZpcyc7XG5jb25zdCBzZXRDaXR5ID0gKHN0cmluZykgPT4ge1xuICBjaXR5ID0gc3RyaW5nO1xufTtcbmNvbnN0IGdldENpdHkgPSAoKSA9PiBjaXR5O1xuXG5sZXQgdW5pdHMgPSAnaW1wZXJpYWwnO1xuY29uc3Qgc2V0VW5pdHMgPSAoc3RyaW5nKSA9PiB7XG4gIHVuaXRzID0gc3RyaW5nO1xufTtcbmNvbnN0IGdldFVuaXRzID0gKCkgPT4gdW5pdHM7XG5cbi8vIEZvcmVjYXN0IEFQSSBjYWxsc1xuY29uc3QgZmV0Y2hGb3JlY2FzdCA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGZvcmVjYXN0VVJMICsgY2l0eSwgeyBtb2RlOiAnY29ycycgfSk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG59O1xuXG5jb25zdCBwcm9jZXNzRGF0YSA9IGFzeW5jIChkYXRhKSA9PiB7XG4gIGNvbnN0IGZvcmVjYXN0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcbiAgY29uc3QgZGF0YUFyciA9IFtdO1xuXG4gIGZvcmVjYXN0LmZvckVhY2goKGRheU9iaikgPT4ge1xuICAgIGNvbnN0IGRheURhdGEgPSBkYXlPYmouZGF5O1xuICAgIGxldCBzaGFyZWREYXRhID0ge307XG4gICAgbGV0IHVuaXRTcGVjaWZpY0RhdGEgPSB7fTtcblxuICAgIC8vIGdhdGhlciBzaGFyZWQgZGF0YVxuICAgIGNvbnN0IHtcbiAgICAgIGNvbmRpdGlvbjogeyB0ZXh0OiBjb25kaXRpb24gfSxcbiAgICAgIGNvbmRpdGlvbjogeyBpY29uOiBpbWdVUkwgfSxcbiAgICAgIGF2Z2h1bWlkaXR5OiBhdmdIdW1pZGl0eSxcbiAgICB9ID0gZGF5RGF0YTtcbiAgICBjb25zdCB7IGRhdGUgfSA9IGRheU9iajtcbiAgICBzaGFyZWREYXRhID0geyBjb25kaXRpb24sIGltZ1VSTCwgYXZnSHVtaWRpdHksIGRhdGUgfTtcblxuICAgIC8vIGdhdGhlciBkYXRhIGZpbHRlcmVkIGJ5IHVuaXRzXG4gICAgaWYgKHVuaXRzID09PSAnaW1wZXJpYWwnKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG1heHRlbXBfZjogbWF4VGVtcCxcbiAgICAgICAgbWludGVtcF9mOiBtaW5UZW1wLFxuICAgICAgICB0b3RhbHByZWNpcF9pbjogdG90YWxQcmVjaXAsXG4gICAgICAgIG1heHdpbmRfbXBoOiBtYXhXaW5kLFxuICAgICAgfSA9IGRheURhdGE7XG4gICAgICB1bml0U3BlY2lmaWNEYXRhID0geyBtYXhUZW1wLCBtaW5UZW1wLCB0b3RhbFByZWNpcCwgbWF4V2luZCB9O1xuICAgIH0gZWxzZSBpZiAodW5pdHMgPT09ICdtZXRyaWMnKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG1heHRlbXBfYzogbWF4VGVtcCxcbiAgICAgICAgbWludGVtcF9jOiBtaW5UZW1wLFxuICAgICAgICB0b3RhbHByZWNpcF9tbTogdG90YWxQcmVjaXAsXG4gICAgICAgIG1heHdpbmRfa3BoOiBtYXhXaW5kLFxuICAgICAgfSA9IGRheURhdGE7XG4gICAgICB1bml0U3BlY2lmaWNEYXRhID0geyBtYXhUZW1wLCBtaW5UZW1wLCB0b3RhbFByZWNpcCwgbWF4V2luZCB9O1xuICAgIH1cblxuICAgIC8vIHJvdW5kIHRlbXBlcmF0dXJlXG4gICAgdW5pdFNwZWNpZmljRGF0YS5tYXhUZW1wID0gTWF0aC5yb3VuZCh1bml0U3BlY2lmaWNEYXRhLm1heFRlbXApO1xuICAgIHVuaXRTcGVjaWZpY0RhdGEubWluVGVtcCA9IE1hdGgucm91bmQodW5pdFNwZWNpZmljRGF0YS5taW5UZW1wKTtcblxuICAgIGRhdGFBcnIucHVzaCh7IC4uLnNoYXJlZERhdGEsIC4uLnVuaXRTcGVjaWZpY0RhdGEgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhQXJyO1xufTtcblxuY29uc3QgcmV0dXJuRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEZvcmVjYXN0KCk7XG4gIGNvbnN0IGRhdGEgPSBwcm9jZXNzRGF0YShyZXNwb25zZSk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IHsgc2V0Q2l0eSwgZ2V0Q2l0eSwgZ2V0VW5pdHMsIHNldFVuaXRzLCByZXR1cm5EYXRhIH07XG4iLCJjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcblxuY29uc3QgZGF5c0FyciA9IFtcbiAgJ1N1bmRheScsXG4gICdNb25kYXknLFxuICAnVHVlc2RheScsXG4gICdXZWRuZXNkYXknLFxuICAnVGh1cnNkYXknLFxuICAnRnJpZGF5JyxcbiAgJ1NhdHVyZGF5Jyxcbl07XG5cbmNvbnN0IG1vbnRoc0FyciA9IFtcbiAgJ0phbnVhcnknLFxuICAnRmVicnVhcnknLFxuICAnTWFyY2gnLFxuICAnQXByaWwnLFxuICAnTWF5JyxcbiAgJ0p1bmUnLFxuICAnSnVseScsXG4gICdBdWd1c3QnLFxuICAnU2VwdGVtYmVyJyxcbiAgJ09jdG9iZXInLFxuICAnTm92ZW1iZXInLFxuICAnRGVjZW1iZXInLFxuXTtcblxuY29uc3QgZm9yZWNhc3REYXlUaXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdoMy5mb3JlY2FzdCcpO1xuXG5jb25zdCBkaXNwbGF5Rm9yZWNhc3REYXlPZlRoZVdlZWsgPSAoKSA9PiB7XG4gIGNvbnN0IGV4dGVuZGVkRGF5c0FyciA9IFsuLi5kYXlzQXJyLCAuLi5kYXlzQXJyXTtcbiAgY29uc3QgZmlyc3RGb3JjYXN0RGF5SW5kZXggPSBkYXRlLmdldERheSgpICsgMTtcbiAgY29uc3QgZGF5TmFtZXMgPSBleHRlbmRlZERheXNBcnIuc2xpY2UoXG4gICAgZmlyc3RGb3JjYXN0RGF5SW5kZXgsXG4gICAgZmlyc3RGb3JjYXN0RGF5SW5kZXggKyAzLFxuICApO1xuICBmb3JlY2FzdERheVRpdGxlcy5mb3JFYWNoKCh0aXRsZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCB0aXRsZU5vZGUgPSB0aXRsZTtcbiAgICB0aXRsZU5vZGUudGV4dENvbnRlbnQgPSBkYXlOYW1lc1tpbmRleF07XG4gIH0pO1xufTtcbmRpc3BsYXlGb3JlY2FzdERheU9mVGhlV2VlaygpO1xuXG5jb25zdCBkYXRlU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXRlJyk7XG5cbmNvbnN0IGRpc3BsYXlUb2RheXNEYXRlID0gKCkgPT4ge1xuICBjb25zdCBkYXlPZlRoZVdlZWsgPSBkYXlzQXJyW2RhdGUuZ2V0RGF5KCldLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG1vbnRoID0gbW9udGhzQXJyW2RhdGUuZ2V0TW9udGgoKV0udG9VcHBlckNhc2UoKTtcbiAgY29uc3QgZGF5T2ZUaGVNb250aCA9IGRhdGUuZ2V0RGF0ZSgpO1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGRhdGVTcGFuLnRleHRDb250ZW50ID0gYCR7ZGF5T2ZUaGVXZWVrfSwgJHttb250aH0gJHtkYXlPZlRoZU1vbnRofSwgJHt5ZWFyfWA7XG59O1xuZGlzcGxheVRvZGF5c0RhdGUoKTtcbiIsImltcG9ydCB7IHNldENpdHkgfSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0IHsgZGlzcGxheVdlYXRoZXJDb250ZW50IH0gZnJvbSAnLi9jb250ZW50RE9NJztcbmltcG9ydCB7IGRpc3BsYXlDaXR5IH0gZnJvbSAnLi90aXRsZURPTSc7XG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9dGV4dF0nKTtcbmNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuXG5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgc2V0Q2l0eShpbnB1dC52YWx1ZSk7XG4gIGRpc3BsYXlXZWF0aGVyQ29udGVudCgpO1xuICBkaXNwbGF5Q2l0eSgpO1xuICBmb3JtLnJlc2V0KCk7XG59KTtcblxuLy8gVE9ETzogcmVtb3ZlIHRoZXNlIGxpbmVzIGFmdGVyIHRlc3RpbmdcbmRpc3BsYXlXZWF0aGVyQ29udGVudCgpO1xuZGlzcGxheUNpdHkoKTtcbiIsImV4cG9ydCBjb25zdCBrZXkgPSAnMzlkMWJlMDAxZWY5NGQzZGJjMDQwNjQ4MjQzMTAxJztcbiIsImltcG9ydCB7IGdldENpdHkgfSBmcm9tICcuL2RhdGEnO1xuXG5jb25zdCB0aXRsZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS1jb250YWluZXInKTtcblxuY29uc3QgZGlzcGxheUNpdHkgPSAoKSA9PiB7XG4gIGNvbnN0IGNpdHkgPSBnZXRDaXR5KCk7XG4gIHRpdGxlQ29udGFpbmVyLnRleHRDb250ZW50ID0gY2l0eS50b1VwcGVyQ2FzZSgpO1xufTtcblxuZXhwb3J0IHsgZGlzcGxheUNpdHkgfTtcbiIsImNvbnN0IHRoZW1lVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQudGhlbWUtdG9nZ2xlJyk7XG5jb25zdCByb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKTtcblxuY29uc3QgdG9nZ2xlVGhlbWUgPSAoKSA9PiB7XG4gIGlmICh0aGVtZVRvZ2dsZS5jaGVja2VkKSB7XG4gICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKCdsaWdodCcpO1xuICAgIHJvb3QuY2xhc3NMaXN0LmFkZCgnZGFyaycpO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpO1xuICAgIHJvb3QuY2xhc3NMaXN0LmFkZCgnbGlnaHQnKTtcbiAgfVxufTtcblxudGhlbWVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVUaGVtZSk7XG4iLCJpbXBvcnQgeyBkaXNwbGF5V2VhdGhlckNvbnRlbnQgfSBmcm9tICcuL2NvbnRlbnRET00nO1xuaW1wb3J0IHsgc2V0VW5pdHMsIGdldFVuaXRzIH0gZnJvbSAnLi9kYXRhJztcblxuY29uc3QgdW5pdFRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LnVuaXQtdG9nZ2xlJyk7XG5cbmNvbnN0IHRvZ2dsZVVuaXRzID0gKCkgPT4ge1xuICBpZiAoZ2V0VW5pdHMoKSA9PT0gJ2ltcGVyaWFsJykge1xuICAgIHNldFVuaXRzKCdtZXRyaWMnKTtcbiAgfSBlbHNlIHtcbiAgICBzZXRVbml0cygnaW1wZXJpYWwnKTtcbiAgfVxuICBkaXNwbGF5V2VhdGhlckNvbnRlbnQoKTtcbn07XG5cbnVuaXRUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVVbml0cyk7XG4iLCJjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuY29uc3QgbWVudUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWNvbnRhaW5lcicpO1xuY29uc3QgY29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWNvbnRhaW5lcicpO1xuY29uc3QgZGF5RnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRheS1mcmFtZScpO1xuXG5jb25zdCB0b2dnbGVWaWV3TW9kZSA9ICgpID0+IHtcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgOTIwKSB7XG4gICAgW2JvZHksIG1lbnVDb250YWluZXIsIGNvbnRlbnRDb250YWluZXIsIC4uLmRheUZyYW1lc10uZm9yRWFjaChcbiAgICAgIChjb250YWluZXIpID0+IHtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Z1bGwtdmlldycpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbmFycm93LXZpZXcnKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBbYm9keSwgbWVudUNvbnRhaW5lciwgY29udGVudENvbnRhaW5lciwgLi4uZGF5RnJhbWVzXS5mb3JFYWNoKFxuICAgICAgKGNvbnRhaW5lcikgPT4ge1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZnVsbC12aWV3Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCduYXJyb3ctdmlldycpO1xuICAgICAgfSxcbiAgICApO1xuICB9XG59O1xudG9nZ2xlVmlld01vZGUoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRvZ2dsZVZpZXdNb2RlKTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RE0rU2VyaWYrRGlzcGxheSZmYW1pbHk9UnVmaW5hOndnaHRANzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU9wZW4rU2FucyZmYW1pbHk9UnVmaW5hOndnaHRANzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUVCK0dhcmFtb25kOndnaHRANTAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmO1xuICAvKiBvdXRsaW5lOiAxcHggc29saWQgcmVkOyAqL1xufVxuXG46cm9vdCB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuOnJvb3QubGlnaHQge1xuICAtLWJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0MiwgMjMyKTtcbiAgLS1jb250cmFzdC1jb2xvcjogcmdiKDI2LCAyOCwgMjYpO1xuICAtLXNlYXJjaC1iYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI2LCAyOCwgMjYsIDAuMSk7XG59XG5cbjpyb290LmRhcmsge1xuICAtLWJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDI2KTtcbiAgLS1jb250cmFzdC1jb2xvcjogcmdiKDI0NSwgMjQyLCAyMzIpO1xuICAtLXNlYXJjaC1iYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NSwgMjQyLCAyMzIsIDAuMSk7XG59XG5cbmJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcblxuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuYm9keS5mdWxsLXZpZXcge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heChtaW4tY29udGVudCwgMTEwMHB4KTtcbn1cblxuYm9keS5uYXJyb3ctdmlldyB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KG1pbi1jb250ZW50LCA2MDBweCk7XG4gIC50aXRsZS1jb250YWluZXIge1xuICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgfVxufVxuXG4ucGFnZS1jb250YWluZXIge1xuICBoZWlnaHQ6IDEwMHZoO1xuICBwYWRkaW5nOiAwIDEwcHg7XG5cbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgbWluLWNvbnRlbnQpO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG59XG5cbi50aXRsZS1jb250YWluZXIsXG4uY29udGVudC1jb250YWluZXIsXG5mb290ZXIge1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuLnRpdGxlLWNvbnRhaW5lciB7XG4gIGZvbnQtc2l6ZTogNXJlbTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XG59XG5cbi50aXRsZS1jb250YWluZXIsXG5mb290ZXIgKixcbi51bml0LXRvZ2dsZSAqIHtcbiAgZm9udC1mYW1pbHk6ICdSdWZpbmEnLCBzZXJpZjtcbn1cblxuLm1lbnUtY29udGFpbmVyIHtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG5cbiAgZGlzcGxheTogZ3JpZDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ubWVudS1jb250YWluZXIuZnVsbC12aWV3IHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxNDBweCBtaW5tYXgoMjAwcHgsIDMwJSkgMTQwcHg7XG59XG5cbi5tZW51LWNvbnRhaW5lci5uYXJyb3ctdmlldyB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgbWluLWNvbnRlbnQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byBhdXRvO1xuICBjb2x1bW4tZ2FwOiAzMHB4O1xuICByb3ctZ2FwOiAxMHB4O1xuICBtYXgtd2lkdGg6IDQwMHB4O1xuXG4gID4gLnRoZW1lLXRvZ2dsZSB7XG4gICAgZ3JpZC1yb3c6IDIvMztcbiAgfVxuICA+IGZvcm0ge1xuICAgIGdyaWQtY29sdW1uOiAxLzM7XG4gIH1cbiAgPiAudW5pdC10b2dnbGUge1xuICAgIGdyaWQtcm93OiAyLzM7XG4gIH1cbn1cblxuLm1lbnUtY29udGFpbmVyLFxuZm9vdGVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGp1c3RpZnktc2VsZjogc3BhY2UtYmV0d2Vlbjtcbn1cblxuLnRoZW1lLXRvZ2dsZS5zd2l0Y2gge1xuICB3aWR0aDogNTdweDtcbn1cblxuLnVuaXQtdG9nZ2xlLnN3aXRjaCB7XG4gIHdpZHRoOiAxNDBweDtcbn1cblxuLnRoZW1lLXRvZ2dsZS5zbGlkZXIge1xuICB3aWR0aDogMjJweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ29sZGVucm9kO1xufVxuXG4udW5pdC10b2dnbGUuc2xpZGVyIHtcbiAgd2lkdGg6IDcwcHg7XG59XG5cbi5tZXRyaWMsXG4uaW1wZXJpYWwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNnB4O1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uaW1wZXJpYWwge1xuICBsZWZ0OiAxNHB4O1xufVxuXG4ubWV0cmljIHtcbiAgcmlnaHQ6IDEwcHg7XG59XG5cbi5zd2l0Y2gge1xuICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luOiAzcHg7XG4gIGhlaWdodDogMzNweDtcbn1cblxuLnN3aXRjaCxcbi5zbGlkZXIge1xuICBib3JkZXItcmFkaXVzOiAzMHB4O1xufVxuXG5pbnB1dFt0eXBlPSdjaGVja2JveCddIHtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLnNsaWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDNweDtcbiAgbGVmdDogNHB4O1xuICB0cmFuc2l0aW9uOiAzMDBtcztcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDIycHg7XG59XG5cbmlucHV0W3R5cGU9J2NoZWNrYm94J106Y2hlY2tlZCB7XG4gICsgLnRoZW1lLXRvZ2dsZS5zbGlkZXIge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDIzcHgpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJveC1zaGFkb3c6IGluc2V0IC04cHggMCAwcHggMHB4IHJnYigxMTYsIDE1NCwgMjI0KTtcbiAgfVxuICArIC51bml0LXRvZ2dsZS5zbGlkZXIge1xuICAgIHdpZHRoOiA1NXB4O1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDczcHgpO1xuICB9XG59XG5cbmZvcm0ge1xuICB3aWR0aDogMTAwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmlucHV0W3R5cGU9J3RleHQnXSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xuICBwYWRkaW5nOiA3cHggMTVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2VhcmNoLWJhY2tncm91bmQtY29sb3IpO1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBjb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xuXG4gIGZsZXg6IDE7XG59XG5cbmlucHV0W3R5cGU9J3RleHQnXTpmb2N1cyB7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogMnB4IHNvbGlkIGNvcm5mbG93ZXJibHVlO1xufVxuXG5mb3JtIGJ1dHRvbiB7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDM1cHg7XG4gIHpvb206IDE3JTtcbiAgdHJhbnNpdGlvbjogMzAwbXM7XG59XG5cbmJ1dHRvbjpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgem9vbTogMTglO1xufVxuXG4uZGF0ZS1jb250YWluZXIge1xuICBib3JkZXItdG9wOiA1cHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDJweDtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDUwcHg7XG59XG5cbi5kYXRlLWNvbnRhaW5lciAqIHtcbiAgZm9udC1mYW1pbHk6ICdFQiBHYXJhbW9uZCcsIHNlcmlmO1xuICBsZXR0ZXItc3BhY2luZzogMC4ycmVtO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAwLjhyZW07XG59XG5cbi5jb250ZW50LWJhY2tncm91bmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb250cmFzdC1jb2xvcik7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDMwcHggMDtcbn1cblxuLmNvbnRlbnQtY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDFweDtcbn1cblxuLmNvbnRlbnQtY29udGFpbmVyLmZ1bGwtdmlldyB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XG5cbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMjBweCwgMWZyKSk7XG59XG5cbi5jb250ZW50LWNvbnRhaW5lci5uYXJyb3ctdmlldyB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdChhdXRvLWZpdCwgbWluLWNvbnRlbnQpO1xuICBtYXJnaW46IC0zMHB4IDA7XG5cbiAgPiAuZGF5LWZyYW1lIHtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICB9XG59XG5cbi5kYXktZnJhbWUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgcGFkZGluZzogMCAzMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTVweDtcbn1cblxuLmRheS1mcmFtZS5uYXJyb3ctdmlldyB7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgxNTBweCwgMjAwcHgpKTtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG87XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDE1cHg7XG59XG5cbi50aXRsZSBoMyB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuXG4udGVtcCxcbi5kZXRhaWxzIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi50ZW1wIHA6Zmlyc3QtY2hpbGQge1xuICBmb250LXNpemU6IDNyZW07XG59XG5cbi50ZW1wIHA6bGFzdC1jaGlsZCB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuXG4uZGF5LWZyYW1lIDo6YmVmb3JlIHtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cblxuLmRldGFpbHMge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDNweDtcbn1cblxuLmRldGFpbHMgcDpmaXJzdC1jaGlsZDo6YmVmb3JlIHtcbiAgY29udGVudDogJ3JhaW46ICc7XG59XG5cbi5kZXRhaWxzIHA6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xuICBjb250ZW50OiAnd2luZDogJztcbn1cblxuLmRldGFpbHMgcDpsYXN0LWNoaWxkOjpiZWZvcmUge1xuICBjb250ZW50OiAnaHVtaWRpdHk6ICc7XG59XG5cbi5pbWcge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmlsdGVyOiBncmF5c2NhbGUoMC41KTtcbn1cblxuaW1nIHtcbiAgd2lkdGg6IDEwMHB4O1xufVxuXG5mb290ZXIge1xuICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xuICBwYWRkaW5nOiA1cHggMDtcbiAgZm9udC1zaXplOiAwLjhyZW07XG4gIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XG5cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uY3JlZGl0cyBhIHtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFJQTtFQUNFLFNBQVM7RUFDVCxVQUFV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QUNFLHVDQUF1QztFQUN2QyxXQUFXO0VBQ1gsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSw0Q0FBNEM7RUFDNUMsNkNBQTZDOztFQUU3QywyREFBMkQ7QUFDN0Q7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsaURBQWlEO0VBQ2pELGVBQWU7O0VBRWY7SUFDRSxhQUFhO0VBQ2Y7QUFDRjs7QUFFQTtFQUNFLHlDQUF5QztFQUN6QyxlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxXQUFXOztFQUVYLHNEQUFzRDtFQUN0RCw2QkFBNkI7RUFDN0IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7O0VBRUUsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsUUFBUTtBQUNWOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSwyQ0FBMkM7RUFDM0MsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixzQkFBc0I7O0VBRXRCLGFBQWE7RUFDYiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsY0FBYztBQUNoQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1ETStTZXJpZitEaXNwbGF5JmZhbWlseT1SdWZpbmE6d2dodEA3MDAmZGlzcGxheT1zd2FwJyk7XFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3BlbitTYW5zJmZhbWlseT1SdWZpbmE6d2dodEA3MDAmZGlzcGxheT1zd2FwJyk7XFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RUIrR2FyYW1vbmQ6d2dodEA1MDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZjtcXG4gIC8qIG91dGxpbmU6IDFweCBzb2xpZCByZWQ7ICovXFxufVxcblxcbjpyb290IHtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG59XFxuXFxuOnJvb3QubGlnaHQge1xcbiAgLS1iYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAyNDIsIDIzMik7XFxuICAtLWNvbnRyYXN0LWNvbG9yOiByZ2IoMjYsIDI4LCAyNik7XFxuICAtLXNlYXJjaC1iYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI2LCAyOCwgMjYsIDAuMSk7XFxufVxcblxcbjpyb290LmRhcmsge1xcbiAgLS1iYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCAyNik7XFxuICAtLWNvbnRyYXN0LWNvbG9yOiByZ2IoMjQ1LCAyNDIsIDIzMik7XFxuICAtLXNlYXJjaC1iYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NSwgMjQyLCAyMzIsIDAuMSk7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XFxuICBjb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xcblxcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5ib2R5LmZ1bGwtdmlldyB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heChtaW4tY29udGVudCwgMTEwMHB4KTtcXG59XFxuXFxuYm9keS5uYXJyb3ctdmlldyB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heChtaW4tY29udGVudCwgNjAwcHgpO1xcbiAgLnRpdGxlLWNvbnRhaW5lciB7XFxuICAgIGZvbnQtc2l6ZTogNTBweDtcXG4gIH1cXG59XFxuXFxuLnBhZ2UtY29udGFpbmVyIHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxuXFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgbWluLWNvbnRlbnQpO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4udGl0bGUtY29udGFpbmVyLFxcbi5jb250ZW50LWNvbnRhaW5lcixcXG5mb290ZXIge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbi50aXRsZS1jb250YWluZXIge1xcbiAgZm9udC1zaXplOiA1cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcXG59XFxuXFxuLnRpdGxlLWNvbnRhaW5lcixcXG5mb290ZXIgKixcXG4udW5pdC10b2dnbGUgKiB7XFxuICBmb250LWZhbWlseTogJ1J1ZmluYScsIHNlcmlmO1xcbn1cXG5cXG4ubWVudS1jb250YWluZXIge1xcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XFxuXFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLm1lbnUtY29udGFpbmVyLmZ1bGwtdmlldyB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDE0MHB4IG1pbm1heCgyMDBweCwgMzAlKSAxNDBweDtcXG59XFxuXFxuLm1lbnUtY29udGFpbmVyLm5hcnJvdy12aWV3IHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWluLWNvbnRlbnQgbWluLWNvbnRlbnQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gYXV0bztcXG4gIGNvbHVtbi1nYXA6IDMwcHg7XFxuICByb3ctZ2FwOiAxMHB4O1xcbiAgbWF4LXdpZHRoOiA0MDBweDtcXG5cXG4gID4gLnRoZW1lLXRvZ2dsZSB7XFxuICAgIGdyaWQtcm93OiAyLzM7XFxuICB9XFxuICA+IGZvcm0ge1xcbiAgICBncmlkLWNvbHVtbjogMS8zO1xcbiAgfVxcbiAgPiAudW5pdC10b2dnbGUge1xcbiAgICBncmlkLXJvdzogMi8zO1xcbiAgfVxcbn1cXG5cXG4ubWVudS1jb250YWluZXIsXFxuZm9vdGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAganVzdGlmeS1zZWxmOiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4udGhlbWUtdG9nZ2xlLnN3aXRjaCB7XFxuICB3aWR0aDogNTdweDtcXG59XFxuXFxuLnVuaXQtdG9nZ2xlLnN3aXRjaCB7XFxuICB3aWR0aDogMTQwcHg7XFxufVxcblxcbi50aGVtZS10b2dnbGUuc2xpZGVyIHtcXG4gIHdpZHRoOiAyMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ29sZGVucm9kO1xcbn1cXG5cXG4udW5pdC10b2dnbGUuc2xpZGVyIHtcXG4gIHdpZHRoOiA3MHB4O1xcbn1cXG5cXG4ubWV0cmljLFxcbi5pbXBlcmlhbCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDZweDtcXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xcbiAgY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5pbXBlcmlhbCB7XFxuICBsZWZ0OiAxNHB4O1xcbn1cXG5cXG4ubWV0cmljIHtcXG4gIHJpZ2h0OiAxMHB4O1xcbn1cXG5cXG4uc3dpdGNoIHtcXG4gIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW46IDNweDtcXG4gIGhlaWdodDogMzNweDtcXG59XFxuXFxuLnN3aXRjaCxcXG4uc2xpZGVyIHtcXG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxufVxcblxcbmlucHV0W3R5cGU9J2NoZWNrYm94J10ge1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi5zbGlkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAzcHg7XFxuICBsZWZ0OiA0cHg7XFxuICB0cmFuc2l0aW9uOiAzMDBtcztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGhlaWdodDogMjJweDtcXG59XFxuXFxuaW5wdXRbdHlwZT0nY2hlY2tib3gnXTpjaGVja2VkIHtcXG4gICsgLnRoZW1lLXRvZ2dsZS5zbGlkZXIge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgyM3B4KTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IC04cHggMCAwcHggMHB4IHJnYigxMTYsIDE1NCwgMjI0KTtcXG4gIH1cXG4gICsgLnVuaXQtdG9nZ2xlLnNsaWRlciB7XFxuICAgIHdpZHRoOiA1NXB4O1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSg3M3B4KTtcXG4gIH1cXG59XFxuXFxuZm9ybSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5pbnB1dFt0eXBlPSd0ZXh0J10ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xcbiAgcGFkZGluZzogN3B4IDE1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zZWFyY2gtYmFja2dyb3VuZC1jb2xvcik7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG5cXG4gIGZsZXg6IDE7XFxufVxcblxcbmlucHV0W3R5cGU9J3RleHQnXTpmb2N1cyB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBvdXRsaW5lOiAycHggc29saWQgY29ybmZsb3dlcmJsdWU7XFxufVxcblxcbmZvcm0gYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAzNXB4O1xcbiAgem9vbTogMTclO1xcbiAgdHJhbnNpdGlvbjogMzAwbXM7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB6b29tOiAxOCU7XFxufVxcblxcbi5kYXRlLWNvbnRhaW5lciB7XFxuICBib3JkZXItdG9wOiA1cHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDJweDtcXG4gIHdpZHRoOiAxMDAlO1xcblxcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDUwcHg7XFxufVxcblxcbi5kYXRlLWNvbnRhaW5lciAqIHtcXG4gIGZvbnQtZmFtaWx5OiAnRUIgR2FyYW1vbmQnLCBzZXJpZjtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xcbn1cXG5cXG4uY29udGVudC1iYWNrZ3JvdW5kIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiAzMHB4IDA7XFxufVxcblxcbi5jb250ZW50LWNvbnRhaW5lciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDFweDtcXG59XFxuXFxuLmNvbnRlbnQtY29udGFpbmVyLmZ1bGwtdmlldyB7XFxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG5cXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjIwcHgsIDFmcikpO1xcbn1cXG5cXG4uY29udGVudC1jb250YWluZXIubmFycm93LXZpZXcge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdChhdXRvLWZpdCwgbWluLWNvbnRlbnQpO1xcbiAgbWFyZ2luOiAtMzBweCAwO1xcblxcbiAgPiAuZGF5LWZyYW1lIHtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gIH1cXG59XFxuXFxuLmRheS1mcmFtZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcXG4gIHBhZGRpbmc6IDAgMzBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDE1cHg7XFxufVxcblxcbi5kYXktZnJhbWUubmFycm93LXZpZXcge1xcbiAgd2lkdGg6IDEwMCU7XFxuXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW5tYXgoMTUwcHgsIDIwMHB4KSk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gYXV0bztcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMTVweDtcXG59XFxuXFxuLnRpdGxlIGgzIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4udGVtcCxcXG4uZGV0YWlscyB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLnRlbXAgcDpmaXJzdC1jaGlsZCB7XFxuICBmb250LXNpemU6IDNyZW07XFxufVxcblxcbi50ZW1wIHA6bGFzdC1jaGlsZCB7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbi5kYXktZnJhbWUgOjpiZWZvcmUge1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuXFxuLmRldGFpbHMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogM3B4O1xcbn1cXG5cXG4uZGV0YWlscyBwOmZpcnN0LWNoaWxkOjpiZWZvcmUge1xcbiAgY29udGVudDogJ3JhaW46ICc7XFxufVxcblxcbi5kZXRhaWxzIHA6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcbiAgY29udGVudDogJ3dpbmQ6ICc7XFxufVxcblxcbi5kZXRhaWxzIHA6bGFzdC1jaGlsZDo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdodW1pZGl0eTogJztcXG59XFxuXFxuLmltZyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmaWx0ZXI6IGdyYXlzY2FsZSgwLjUpO1xcbn1cXG5cXG5pbWcge1xcbiAgd2lkdGg6IDEwMHB4O1xcbn1cXG5cXG5mb290ZXIge1xcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG4gIHBhZGRpbmc6IDVweCAwO1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxuICBsZXR0ZXItc3BhY2luZzogMC4ycmVtO1xcblxcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLmNyZWRpdHMgYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGVzLmNzcyc7XG5pbXBvcnQgJy4vZGF0YSc7XG5pbXBvcnQgJy4vZm9ybURPTSc7XG5pbXBvcnQgJy4vZGF0ZURPTSc7XG5pbXBvcnQgJy4vdG9nZ2xlVGhlbWVET00nO1xuaW1wb3J0ICcuL3RvZ2dsZVVuaXRET00nO1xuaW1wb3J0ICcuL3ZpZXdNb2RlRE9NJztcbiJdLCJuYW1lcyI6WyJnZXRVbml0cyIsInJldHVybkRhdGEiLCJjdXJyZW50RGF0YUFyciIsImdlbmVyYXRlRGF5Q29udGVudCIsIm9iaiIsImluZGV4IiwiZnJhbWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkYXlQYXJhIiwiY29uZGl0aW9uUGFyYSIsImltZyIsIm1heFRlbXBQYXJhIiwibWluVGVtcFBhcmEiLCJwcmVjaXBQYXJhIiwid2luZFBhcmEiLCJodW1pZGl0eVBhcmEiLCJ1bml0c1R5cGUiLCJ0ZW1wVW5pdCIsInByZWNpcFVuaXQiLCJ3aW5kVW5pdCIsInRleHRDb250ZW50IiwiY29uZGl0aW9uIiwibWF4VGVtcCIsIm1pblRlbXAiLCJ0b3RhbFByZWNpcCIsIm1heFdpbmQiLCJhdmdIdW1pZGl0eSIsInNyYyIsImltZ1VSTCIsImRpc3BsYXlXZWF0aGVyQ29udGVudCIsImZvckVhY2giLCJrZXkiLCJmb3JlY2FzdFVSTCIsImNpdHkiLCJzZXRDaXR5Iiwic3RyaW5nIiwiZ2V0Q2l0eSIsInVuaXRzIiwic2V0VW5pdHMiLCJmZXRjaEZvcmVjYXN0IiwicmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJkYXRhIiwianNvbiIsImUiLCJjb25zb2xlIiwibG9nIiwicHJvY2Vzc0RhdGEiLCJmb3JlY2FzdCIsImZvcmVjYXN0ZGF5IiwiZGF0YUFyciIsImRheU9iaiIsImRheURhdGEiLCJkYXkiLCJzaGFyZWREYXRhIiwidW5pdFNwZWNpZmljRGF0YSIsInRleHQiLCJpY29uIiwiYXZnaHVtaWRpdHkiLCJkYXRlIiwibWF4dGVtcF9mIiwibWludGVtcF9mIiwidG90YWxwcmVjaXBfaW4iLCJtYXh3aW5kX21waCIsIm1heHRlbXBfYyIsIm1pbnRlbXBfYyIsInRvdGFscHJlY2lwX21tIiwibWF4d2luZF9rcGgiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwiRGF0ZSIsImRheXNBcnIiLCJtb250aHNBcnIiLCJmb3JlY2FzdERheVRpdGxlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkaXNwbGF5Rm9yZWNhc3REYXlPZlRoZVdlZWsiLCJleHRlbmRlZERheXNBcnIiLCJmaXJzdEZvcmNhc3REYXlJbmRleCIsImdldERheSIsImRheU5hbWVzIiwic2xpY2UiLCJ0aXRsZSIsInRpdGxlTm9kZSIsImRhdGVTcGFuIiwiZGlzcGxheVRvZGF5c0RhdGUiLCJkYXlPZlRoZVdlZWsiLCJ0b1VwcGVyQ2FzZSIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXlPZlRoZU1vbnRoIiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImRpc3BsYXlDaXR5IiwiZm9ybSIsImlucHV0Iiwic2VhcmNoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsInJlc2V0IiwidGl0bGVDb250YWluZXIiLCJ0aGVtZVRvZ2dsZSIsInJvb3QiLCJ0b2dnbGVUaGVtZSIsImNoZWNrZWQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJ1bml0VG9nZ2xlIiwidG9nZ2xlVW5pdHMiLCJib2R5IiwibWVudUNvbnRhaW5lciIsImNvbnRlbnRDb250YWluZXIiLCJkYXlGcmFtZXMiLCJ0b2dnbGVWaWV3TW9kZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJjb250YWluZXIiXSwic291cmNlUm9vdCI6IiJ9