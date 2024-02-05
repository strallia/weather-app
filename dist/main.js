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
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Rufina:wght@700&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Rufina:wght@700&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap');\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: 'Open Sans', sans-serif;\n  /* outline: 1px solid red; */\n}\n\n:root {\n  font-size: 16px;\n}\n\n:root.light {\n  --background-color: rgb(245, 242, 232);\n  --contrast-color: rgb(26, 28, 26);\n  --search-background-color: rgba(26, 28, 26, 0.1);\n}\n\n:root.dark {\n  --background-color: rgb(26, 28, 26);\n  --contrast-color: rgb(245, 242, 232);\n  --search-background-color: rgba(245, 242, 232, 0.1);\n}\n\nbody {\n  background-color: var(--background-color);\n  color: var(--contrast-color);\n\n  display: grid;\n  justify-content: center;\n}\n\nbody.full-view {\n  grid-template-columns: minmax(min-content, 1100px);\n}\n\nbody.narrow-view {\n  grid-template-columns: minmax(min-content, 600px);\n  .title-container {\n    font-size: 50px;\n  }\n}\n\n.page-container {\n  height: 100vh;\n  padding: 0 10px;\n\n  display: grid;\n  grid-template-rows: repeat(5, min-content);\n  justify-items: center;\n}\n\n.title-container,\n.content-container,\nfooter {\n  user-select: none;\n}\n\n.title-container {\n  font-size: 5rem;\n  letter-spacing: 0.5rem;\n  text-align: center;\n  word-break: break-all;\n}\n\n.title-container,\nfooter *,\n.unit-toggle * {\n  font-family: 'Rufina', serif;\n}\n\n.menu-container {\n  padding-bottom: 10px;\n\n  display: grid;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.menu-container.full-view {\n  grid-template-columns: 140px minmax(200px, 30%) 140px;\n}\n\n.menu-container.narrow-view {\n  grid-template-columns: min-content min-content;\n  grid-template-rows: auto auto;\n  column-gap: 30px;\n  row-gap: 10px;\n  max-width: 400px;\n\n  > .theme-toggle {\n    grid-row: 2/3;\n  }\n  > form {\n    grid-column: 1/3;\n  }\n  > .unit-toggle {\n    grid-row: 2/3;\n  }\n}\n\n.menu-container,\nfooter {\n  width: 100%;\n  justify-self: space-between;\n}\n\n.theme-toggle.switch {\n  width: 57px;\n}\n\n.unit-toggle.switch {\n  width: 140px;\n}\n\n.theme-toggle.slider {\n  width: 22px;\n  background-color: goldenrod;\n}\n\n.unit-toggle.slider {\n  width: 70px;\n}\n\n.metric,\n.imperial {\n  position: absolute;\n  top: 6px;\n  font-size: 0.8rem;\n  color: var(--background-color);\n  user-select: none;\n  cursor: pointer;\n}\n\n.imperial {\n  left: 14px;\n}\n\n.metric {\n  right: 10px;\n}\n\n.switch {\n  border: 3px solid var(--contrast-color);\n  overflow: hidden;\n  position: relative;\n  margin: 3px;\n  height: 33px;\n}\n\n.switch,\n.slider {\n  border-radius: 30px;\n}\n\ninput[type='checkbox'] {\n  appearance: none;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  background-color: transparent;\n}\n\n.slider {\n  background-color: var(--contrast-color);\n  position: absolute;\n  top: 3px;\n  left: 4px;\n  transition: 300ms;\n  cursor: pointer;\n  height: 22px;\n}\n\ninput[type='checkbox']:checked {\n  + .theme-toggle.slider {\n    transform: translate(23px);\n    background-color: transparent;\n    box-shadow: inset -8px 0 0px 0px rgb(116, 154, 224);\n  }\n  + .unit-toggle.slider {\n    width: 55px;\n    transform: translate(73px);\n  }\n}\n\nform {\n  width: 100%;\n  position: relative;\n\n  display: flex;\n  align-items: center;\n}\n\ninput[type='text'] {\n  border: none;\n  background-color: lightgray;\n  padding: 7px 15px;\n  background-color: var(--search-background-color);\n  border-radius: 20px;\n  color: var(--contrast-color);\n\n  flex: 1;\n}\n\ninput[type='text']:focus {\n  border: none;\n  outline: 2px solid cornflowerblue;\n}\n\nform button {\n  padding: 20px;\n  background-color: transparent;\n  border: none;\n  position: absolute;\n  right: 35px;\n  zoom: 17%;\n  transition: 300ms;\n}\n\nbutton:hover {\n  cursor: pointer;\n  zoom: 18%;\n}\n\n.date-container {\n  border-top: 5px solid var(--contrast-color);\n  border-bottom: 3px solid var(--contrast-color);\n  text-align: center;\n  padding: 2px;\n  width: 100%;\n\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 50px;\n}\n\n.date-container * {\n  font-family: 'EB Garamond', serif;\n  letter-spacing: 0.2rem;\n  font-weight: bold;\n  font-size: 0.8rem;\n}\n\n.content-background {\n  background-color: var(--contrast-color);\n  width: 100%;\n  margin: 30px 0;\n}\n\n.content-container {\n  width: 100%;\n  display: grid;\n  align-items: center;\n  justify-content: center;\n  gap: 1px;\n}\n\n.content-container.full-view {\n  border-left: 1px solid var(--contrast-color);\n  border-right: 1px solid var(--contrast-color);\n\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n}\n\n.content-container.narrow-view {\n  grid-template-columns: 1fr;\n  grid-template-rows: repeat(auto-fit, min-content);\n  margin: -30px 0;\n\n  > .day-frame {\n    padding: 20px;\n  }\n}\n\n.day-frame {\n  background-color: var(--background-color);\n  padding: 0 30px;\n  text-align: center;\n  display: grid;\n  gap: 15px;\n}\n\n.day-frame.narrow-view {\n  width: 100%;\n\n  grid-template-columns: repeat(2, minmax(150px, 200px));\n  grid-template-rows: auto auto;\n  align-items: center;\n  justify-content: center;\n  gap: 15px;\n}\n\n.title h3 {\n  font-size: 1.5rem;\n}\n\n.temp,\n.details {\n  font-weight: bold;\n}\n\n.temp p:first-child {\n  font-size: 3rem;\n}\n\n.temp p:last-child {\n  font-weight: normal;\n  font-size: 1.5rem;\n}\n\n.day-frame ::before {\n  font-weight: normal;\n}\n\n.details {\n  display: grid;\n  gap: 3px;\n}\n\n.details p:first-child::before {\n  content: 'rain: ';\n}\n\n.details p:nth-child(2)::before {\n  content: 'wind: ';\n}\n\n.details p:last-child::before {\n  content: 'humidity: ';\n}\n\n.img {\n  display: flex;\n  justify-content: center;\n  filter: grayscale(0.5);\n}\n\nimg {\n  width: 100px;\n}\n\nfooter {\n  border-top: 2px solid var(--contrast-color);\n  padding: 5px 0;\n  font-size: 0.8rem;\n  letter-spacing: 0.2rem;\n\n  display: flex;\n  justify-content: space-between;\n}\n\n.credits a {\n  font-family: inherit;\n  color: inherit;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGlGQUFpRixVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxjQUFjLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxNQUFNLFVBQVUsTUFBTSxNQUFNLEtBQUssVUFBVSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sT0FBTyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sT0FBTyxZQUFZLE9BQU8sS0FBSyxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLGFBQWEsTUFBTSxVQUFVLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLEtBQUssTUFBTSxNQUFNLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sTUFBTSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sTUFBTSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLE1BQU0sS0FBSyxVQUFVLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsY0FBYyxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksY0FBYyxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsWUFBWSxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLE1BQU0sWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxjQUFjLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLHVJQUF1SSx3R0FBd0csNEZBQTRGLE9BQU8sY0FBYyxlQUFlLDJCQUEyQix5Q0FBeUMsK0JBQStCLEtBQUssV0FBVyxvQkFBb0IsR0FBRyxpQkFBaUIsMkNBQTJDLHNDQUFzQyxxREFBcUQsR0FBRyxnQkFBZ0Isd0NBQXdDLHlDQUF5Qyx3REFBd0QsR0FBRyxVQUFVLDhDQUE4QyxpQ0FBaUMsb0JBQW9CLDRCQUE0QixHQUFHLG9CQUFvQix1REFBdUQsR0FBRyxzQkFBc0Isc0RBQXNELHNCQUFzQixzQkFBc0IsS0FBSyxHQUFHLHFCQUFxQixrQkFBa0Isb0JBQW9CLG9CQUFvQiwrQ0FBK0MsMEJBQTBCLEdBQUcsb0RBQW9ELHNCQUFzQixHQUFHLHNCQUFzQixvQkFBb0IsMkJBQTJCLHVCQUF1QiwwQkFBMEIsR0FBRyxrREFBa0QsaUNBQWlDLEdBQUcscUJBQXFCLHlCQUF5QixvQkFBb0IsbUNBQW1DLHdCQUF3QixHQUFHLCtCQUErQiwwREFBMEQsR0FBRyxpQ0FBaUMsbURBQW1ELGtDQUFrQyxxQkFBcUIsa0JBQWtCLHFCQUFxQix1QkFBdUIsb0JBQW9CLEtBQUssWUFBWSx1QkFBdUIsS0FBSyxvQkFBb0Isb0JBQW9CLEtBQUssR0FBRyw4QkFBOEIsZ0JBQWdCLGdDQUFnQyxHQUFHLDBCQUEwQixnQkFBZ0IsR0FBRyx5QkFBeUIsaUJBQWlCLEdBQUcsMEJBQTBCLGdCQUFnQixnQ0FBZ0MsR0FBRyx5QkFBeUIsZ0JBQWdCLEdBQUcseUJBQXlCLHVCQUF1QixhQUFhLHNCQUFzQixtQ0FBbUMsc0JBQXNCLG9CQUFvQixHQUFHLGVBQWUsZUFBZSxHQUFHLGFBQWEsZ0JBQWdCLEdBQUcsYUFBYSw0Q0FBNEMscUJBQXFCLHVCQUF1QixnQkFBZ0IsaUJBQWlCLEdBQUcsdUJBQXVCLHdCQUF3QixHQUFHLDRCQUE0QixxQkFBcUIsZ0JBQWdCLGlCQUFpQixvQkFBb0Isa0NBQWtDLEdBQUcsYUFBYSw0Q0FBNEMsdUJBQXVCLGFBQWEsY0FBYyxzQkFBc0Isb0JBQW9CLGlCQUFpQixHQUFHLG9DQUFvQyw0QkFBNEIsaUNBQWlDLG9DQUFvQywwREFBMEQsS0FBSywyQkFBMkIsa0JBQWtCLGlDQUFpQyxLQUFLLEdBQUcsVUFBVSxnQkFBZ0IsdUJBQXVCLG9CQUFvQix3QkFBd0IsR0FBRyx3QkFBd0IsaUJBQWlCLGdDQUFnQyxzQkFBc0IscURBQXFELHdCQUF3QixpQ0FBaUMsY0FBYyxHQUFHLDhCQUE4QixpQkFBaUIsc0NBQXNDLEdBQUcsaUJBQWlCLGtCQUFrQixrQ0FBa0MsaUJBQWlCLHVCQUF1QixnQkFBZ0IsY0FBYyxzQkFBc0IsR0FBRyxrQkFBa0Isb0JBQW9CLGNBQWMsR0FBRyxxQkFBcUIsZ0RBQWdELG1EQUFtRCx1QkFBdUIsaUJBQWlCLGdCQUFnQixvQkFBb0IsbUNBQW1DLHdCQUF3QixjQUFjLEdBQUcsdUJBQXVCLHNDQUFzQywyQkFBMkIsc0JBQXNCLHNCQUFzQixHQUFHLHlCQUF5Qiw0Q0FBNEMsZ0JBQWdCLG1CQUFtQixHQUFHLHdCQUF3QixnQkFBZ0Isa0JBQWtCLHdCQUF3Qiw0QkFBNEIsYUFBYSxHQUFHLGtDQUFrQyxpREFBaUQsa0RBQWtELGtFQUFrRSxHQUFHLG9DQUFvQywrQkFBK0Isc0RBQXNELG9CQUFvQixvQkFBb0Isb0JBQW9CLEtBQUssR0FBRyxnQkFBZ0IsOENBQThDLG9CQUFvQix1QkFBdUIsa0JBQWtCLGNBQWMsR0FBRyw0QkFBNEIsZ0JBQWdCLDZEQUE2RCxrQ0FBa0Msd0JBQXdCLDRCQUE0QixjQUFjLEdBQUcsZUFBZSxzQkFBc0IsR0FBRyxzQkFBc0Isc0JBQXNCLEdBQUcseUJBQXlCLG9CQUFvQixHQUFHLHdCQUF3Qix3QkFBd0Isc0JBQXNCLEdBQUcseUJBQXlCLHdCQUF3QixHQUFHLGNBQWMsa0JBQWtCLGFBQWEsR0FBRyxvQ0FBb0Msc0JBQXNCLEdBQUcscUNBQXFDLHNCQUFzQixHQUFHLG1DQUFtQywwQkFBMEIsR0FBRyxVQUFVLGtCQUFrQiw0QkFBNEIsMkJBQTJCLEdBQUcsU0FBUyxpQkFBaUIsR0FBRyxZQUFZLGdEQUFnRCxtQkFBbUIsc0JBQXNCLDJCQUEyQixvQkFBb0IsbUNBQW1DLEdBQUcsZ0JBQWdCLHlCQUF5QixtQkFBbUIsR0FBRyxxQkFBcUI7QUFDcnpSO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7OztBQzlXMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBb0c7QUFDcEc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyx1RkFBTzs7OztBQUk4QztBQUN0RSxPQUFPLGlFQUFlLHVGQUFPLElBQUksdUZBQU8sVUFBVSx1RkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBc0I7QUFDTjtBQUNHO0FBQ0E7QUFDTztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udGVudERPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RhdGVET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZm9ybURPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9rZXkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdGl0bGVET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdG9nZ2xlVGhlbWVET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdG9nZ2xlVW5pdERPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy92aWV3TW9kZURPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFVuaXRzLCByZXR1cm5EYXRhIH0gZnJvbSAnLi9kYXRhJztcblxubGV0IGN1cnJlbnREYXRhQXJyO1xuXG5jb25zdCBnZW5lcmF0ZURheUNvbnRlbnQgPSAob2JqLCBpbmRleCkgPT4ge1xuICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5kYXktZnJhbWVbZGF0YS1pZD1cIiR7aW5kZXh9XCJdYCk7XG4gIGNvbnN0IGRheVBhcmEgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCcudGl0bGUgPiBoMycpO1xuICBjb25zdCBjb25kaXRpb25QYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLnRpdGxlID4gcCcpO1xuICBjb25zdCBpbWcgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgY29uc3QgbWF4VGVtcFBhcmEgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCcudGVtcCA+IHA6Zmlyc3QtY2hpbGQnKTtcbiAgY29uc3QgbWluVGVtcFBhcmEgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCcudGVtcCA+IHA6bGFzdC1jaGlsZCcpO1xuICBjb25zdCBwcmVjaXBQYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLmRldGFpbHMgPiBwOmZpcnN0LW9mLXR5cGUnKTtcbiAgY29uc3Qgd2luZFBhcmEgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscyA+IHA6bnRoLWNoaWxkKDIpJyk7XG4gIGNvbnN0IGh1bWlkaXR5UGFyYSA9IGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzID4gcDpsYXN0LW9mLXR5cGUnKTtcblxuICBjb25zdCB1bml0c1R5cGUgPSBnZXRVbml0cygpO1xuICBjb25zdCB0ZW1wVW5pdCA9IHVuaXRzVHlwZSA9PT0gJ2ltcGVyaWFsJyA/ICdGJyA6ICdDJztcbiAgY29uc3QgcHJlY2lwVW5pdCA9IHVuaXRzVHlwZSA9PT0gJ2ltcGVyaWFsJyA/ICdpbicgOiAnbW0nO1xuICBjb25zdCB3aW5kVW5pdCA9IHVuaXRzVHlwZSA9PT0gJ2ltcGVyaWFsJyA/ICdtcGgnIDogJ2twaCc7XG5cbiAgY29uZGl0aW9uUGFyYS50ZXh0Q29udGVudCA9IG9iai5jb25kaXRpb247XG4gIG1heFRlbXBQYXJhLnRleHRDb250ZW50ID0gYCR7b2JqLm1heFRlbXB9wrAke3RlbXBVbml0fWA7XG4gIG1pblRlbXBQYXJhLnRleHRDb250ZW50ID0gYCR7b2JqLm1pblRlbXB9wrAke3RlbXBVbml0fWA7XG4gIHByZWNpcFBhcmEudGV4dENvbnRlbnQgPSBgJHtvYmoudG90YWxQcmVjaXB9ICR7cHJlY2lwVW5pdH1gO1xuICB3aW5kUGFyYS50ZXh0Q29udGVudCA9IGAke29iai5tYXhXaW5kfSAke3dpbmRVbml0fWA7XG4gIGh1bWlkaXR5UGFyYS50ZXh0Q29udGVudCA9IGAke29iai5hdmdIdW1pZGl0eX0lYDtcblxuICBpbWcuc3JjID0gYGh0dHBzOiR7b2JqLmltZ1VSTH1gO1xufTtcblxuY29uc3QgZGlzcGxheVdlYXRoZXJDb250ZW50ID0gYXN5bmMgKCkgPT4ge1xuICBjdXJyZW50RGF0YUFyciA9IGF3YWl0IHJldHVybkRhdGEoKTtcbiAgY3VycmVudERhdGFBcnIuZm9yRWFjaCgob2JqLCBpbmRleCkgPT4gZ2VuZXJhdGVEYXlDb250ZW50KG9iaiwgaW5kZXgpKTtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlXZWF0aGVyQ29udGVudCB9O1xuIiwiaW1wb3J0IHsga2V5IH0gZnJvbSAnLi9rZXknO1xuXG5jb25zdCBmb3JlY2FzdFVSTCA9IGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7a2V5fSZkYXlzPTQmcT1gO1xuXG4vLyBzdGF0ZSB2YXJpYWJsZXNcbmxldCBjaXR5ID0gJ2RhdmlzJztcbmNvbnN0IHNldENpdHkgPSAoc3RyaW5nKSA9PiB7XG4gIGNpdHkgPSBzdHJpbmc7XG59O1xuY29uc3QgZ2V0Q2l0eSA9ICgpID0+IGNpdHk7XG5cbmxldCB1bml0cyA9ICdpbXBlcmlhbCc7XG5jb25zdCBzZXRVbml0cyA9IChzdHJpbmcpID0+IHtcbiAgdW5pdHMgPSBzdHJpbmc7XG59O1xuY29uc3QgZ2V0VW5pdHMgPSAoKSA9PiB1bml0cztcblxuLy8gRm9yZWNhc3QgQVBJIGNhbGxzXG5jb25zdCBmZXRjaEZvcmVjYXN0ID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZm9yZWNhc3RVUkwgKyBjaXR5LCB7IG1vZGU6ICdjb3JzJyB9KTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cbn07XG5cbmNvbnN0IHByb2Nlc3NEYXRhID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgY29uc3QgZm9yZWNhc3QgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5O1xuICBjb25zdCBkYXRhQXJyID0gW107XG5cbiAgZm9yZWNhc3QuZm9yRWFjaCgoZGF5T2JqKSA9PiB7XG4gICAgY29uc3QgZGF5RGF0YSA9IGRheU9iai5kYXk7XG4gICAgbGV0IHNoYXJlZERhdGEgPSB7fTtcbiAgICBsZXQgdW5pdFNwZWNpZmljRGF0YSA9IHt9O1xuXG4gICAgLy8gZ2F0aGVyIHNoYXJlZCBkYXRhXG4gICAgY29uc3Qge1xuICAgICAgY29uZGl0aW9uOiB7IHRleHQ6IGNvbmRpdGlvbiB9LFxuICAgICAgY29uZGl0aW9uOiB7IGljb246IGltZ1VSTCB9LFxuICAgICAgYXZnaHVtaWRpdHk6IGF2Z0h1bWlkaXR5LFxuICAgIH0gPSBkYXlEYXRhO1xuICAgIGNvbnN0IHsgZGF0ZSB9ID0gZGF5T2JqO1xuICAgIHNoYXJlZERhdGEgPSB7IGNvbmRpdGlvbiwgaW1nVVJMLCBhdmdIdW1pZGl0eSwgZGF0ZSB9O1xuXG4gICAgLy8gZ2F0aGVyIGRhdGEgZmlsdGVyZWQgYnkgdW5pdHNcbiAgICBpZiAodW5pdHMgPT09ICdpbXBlcmlhbCcpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWF4dGVtcF9mOiBtYXhUZW1wLFxuICAgICAgICBtaW50ZW1wX2Y6IG1pblRlbXAsXG4gICAgICAgIHRvdGFscHJlY2lwX2luOiB0b3RhbFByZWNpcCxcbiAgICAgICAgbWF4d2luZF9tcGg6IG1heFdpbmQsXG4gICAgICB9ID0gZGF5RGF0YTtcbiAgICAgIHVuaXRTcGVjaWZpY0RhdGEgPSB7IG1heFRlbXAsIG1pblRlbXAsIHRvdGFsUHJlY2lwLCBtYXhXaW5kIH07XG4gICAgfSBlbHNlIGlmICh1bml0cyA9PT0gJ21ldHJpYycpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWF4dGVtcF9jOiBtYXhUZW1wLFxuICAgICAgICBtaW50ZW1wX2M6IG1pblRlbXAsXG4gICAgICAgIHRvdGFscHJlY2lwX21tOiB0b3RhbFByZWNpcCxcbiAgICAgICAgbWF4d2luZF9rcGg6IG1heFdpbmQsXG4gICAgICB9ID0gZGF5RGF0YTtcbiAgICAgIHVuaXRTcGVjaWZpY0RhdGEgPSB7IG1heFRlbXAsIG1pblRlbXAsIHRvdGFsUHJlY2lwLCBtYXhXaW5kIH07XG4gICAgfVxuXG4gICAgLy8gcm91bmQgdGVtcGVyYXR1cmVcbiAgICB1bml0U3BlY2lmaWNEYXRhLm1heFRlbXAgPSBNYXRoLnJvdW5kKHVuaXRTcGVjaWZpY0RhdGEubWF4VGVtcCk7XG4gICAgdW5pdFNwZWNpZmljRGF0YS5taW5UZW1wID0gTWF0aC5yb3VuZCh1bml0U3BlY2lmaWNEYXRhLm1pblRlbXApO1xuXG4gICAgZGF0YUFyci5wdXNoKHsgLi4uc2hhcmVkRGF0YSwgLi4udW5pdFNwZWNpZmljRGF0YSB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGFBcnI7XG59O1xuXG5jb25zdCByZXR1cm5EYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRm9yZWNhc3QoKTtcbiAgY29uc3QgZGF0YSA9IHByb2Nlc3NEYXRhKHJlc3BvbnNlKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgeyBzZXRDaXR5LCBnZXRDaXR5LCBnZXRVbml0cywgc2V0VW5pdHMsIHJldHVybkRhdGEgfTtcbiIsImNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuXG5jb25zdCBkYXlzQXJyID0gW1xuICAnU3VuZGF5JyxcbiAgJ01vbmRheScsXG4gICdUdWVzZGF5JyxcbiAgJ1dlZG5lc2RheScsXG4gICdUaHVyc2RheScsXG4gICdGcmlkYXknLFxuICAnU2F0dXJkYXknLFxuXTtcblxuY29uc3QgbW9udGhzQXJyID0gW1xuICAnSmFudWFyeScsXG4gICdGZWJydWFyeScsXG4gICdNYXJjaCcsXG4gICdBcHJpbCcsXG4gICdNYXknLFxuICAnSnVuZScsXG4gICdKdWx5JyxcbiAgJ0F1Z3VzdCcsXG4gICdTZXB0ZW1iZXInLFxuICAnT2N0b2JlcicsXG4gICdOb3ZlbWJlcicsXG4gICdEZWNlbWJlcicsXG5dO1xuXG5jb25zdCBmb3JlY2FzdERheVRpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2gzLmZvcmVjYXN0Jyk7XG5cbmNvbnN0IGRpc3BsYXlGb3JlY2FzdERheU9mVGhlV2VlayA9ICgpID0+IHtcbiAgY29uc3QgZXh0ZW5kZWREYXlzQXJyID0gWy4uLmRheXNBcnIsIC4uLmRheXNBcnJdO1xuICBjb25zdCBmaXJzdEZvcmNhc3REYXlJbmRleCA9IGRhdGUuZ2V0RGF5KCkgKyAxO1xuICBjb25zdCBkYXlOYW1lcyA9IGV4dGVuZGVkRGF5c0Fyci5zbGljZShcbiAgICBmaXJzdEZvcmNhc3REYXlJbmRleCxcbiAgICBmaXJzdEZvcmNhc3REYXlJbmRleCArIDMsXG4gICk7XG4gIGZvcmVjYXN0RGF5VGl0bGVzLmZvckVhY2goKHRpdGxlLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlTm9kZSA9IHRpdGxlO1xuICAgIHRpdGxlTm9kZS50ZXh0Q29udGVudCA9IGRheU5hbWVzW2luZGV4XTtcbiAgfSk7XG59O1xuZGlzcGxheUZvcmVjYXN0RGF5T2ZUaGVXZWVrKCk7XG5cbmNvbnN0IGRhdGVTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhdGUnKTtcblxuY29uc3QgZGlzcGxheVRvZGF5c0RhdGUgPSAoKSA9PiB7XG4gIGNvbnN0IGRheU9mVGhlV2VlayA9IGRheXNBcnJbZGF0ZS5nZXREYXkoKV0udG9VcHBlckNhc2UoKTtcbiAgY29uc3QgbW9udGggPSBtb250aHNBcnJbZGF0ZS5nZXRNb250aCgpXS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBkYXlPZlRoZU1vbnRoID0gZGF0ZS5nZXREYXRlKCk7XG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgZGF0ZVNwYW4udGV4dENvbnRlbnQgPSBgJHtkYXlPZlRoZVdlZWt9LCAke21vbnRofSAke2RheU9mVGhlTW9udGh9LCAke3llYXJ9YDtcbn07XG5kaXNwbGF5VG9kYXlzRGF0ZSgpO1xuIiwiaW1wb3J0IHsgc2V0Q2l0eSB9IGZyb20gJy4vZGF0YSc7XG5pbXBvcnQgeyBkaXNwbGF5V2VhdGhlckNvbnRlbnQgfSBmcm9tICcuL2NvbnRlbnRET00nO1xuaW1wb3J0IHsgZGlzcGxheUNpdHkgfSBmcm9tICcuL3RpdGxlRE9NJztcblxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpO1xuY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG5cbnNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBzZXRDaXR5KGlucHV0LnZhbHVlKTtcbiAgZGlzcGxheVdlYXRoZXJDb250ZW50KCk7XG4gIGRpc3BsYXlDaXR5KCk7XG4gIGZvcm0ucmVzZXQoKTtcbn0pO1xuXG4vLyBUT0RPOiByZW1vdmUgdGhlc2UgbGluZXMgYWZ0ZXIgdGVzdGluZ1xuZGlzcGxheVdlYXRoZXJDb250ZW50KCk7XG5kaXNwbGF5Q2l0eSgpO1xuIiwiZXhwb3J0IGNvbnN0IGtleSA9ICczOWQxYmUwMDFlZjk0ZDNkYmMwNDA2NDgyNDMxMDEnO1xuIiwiaW1wb3J0IHsgZ2V0Q2l0eSB9IGZyb20gJy4vZGF0YSc7XG5cbmNvbnN0IHRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlLWNvbnRhaW5lcicpO1xuXG5jb25zdCBkaXNwbGF5Q2l0eSA9ICgpID0+IHtcbiAgY29uc3QgY2l0eSA9IGdldENpdHkoKTtcbiAgdGl0bGVDb250YWluZXIudGV4dENvbnRlbnQgPSBjaXR5LnRvVXBwZXJDYXNlKCk7XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5Q2l0eSB9O1xuIiwiY29uc3QgdGhlbWVUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dC50aGVtZS10b2dnbGUnKTtcbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpO1xuXG5jb25zdCB0b2dnbGVUaGVtZSA9ICgpID0+IHtcbiAgaWYgKHRoZW1lVG9nZ2xlLmNoZWNrZWQpIHtcbiAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoJ2xpZ2h0Jyk7XG4gICAgcm9vdC5jbGFzc0xpc3QuYWRkKCdkYXJrJyk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrJyk7XG4gICAgcm9vdC5jbGFzc0xpc3QuYWRkKCdsaWdodCcpO1xuICB9XG59O1xuXG50aGVtZVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVRoZW1lKTtcbiIsImltcG9ydCB7IGRpc3BsYXlXZWF0aGVyQ29udGVudCB9IGZyb20gJy4vY29udGVudERPTSc7XG5pbXBvcnQgeyBzZXRVbml0cywgZ2V0VW5pdHMgfSBmcm9tICcuL2RhdGEnO1xuXG5jb25zdCB1bml0VG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQudW5pdC10b2dnbGUnKTtcblxuY29uc3QgdG9nZ2xlVW5pdHMgPSAoKSA9PiB7XG4gIGlmIChnZXRVbml0cygpID09PSAnaW1wZXJpYWwnKSB7XG4gICAgc2V0VW5pdHMoJ21ldHJpYycpO1xuICB9IGVsc2Uge1xuICAgIHNldFVuaXRzKCdpbXBlcmlhbCcpO1xuICB9XG4gIGRpc3BsYXlXZWF0aGVyQ29udGVudCgpO1xufTtcblxudW5pdFRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVVuaXRzKTtcbiIsImNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5jb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtY29udGFpbmVyJyk7XG5jb25zdCBjb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtY29udGFpbmVyJyk7XG5jb25zdCBkYXlGcmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGF5LWZyYW1lJyk7XG5cbmNvbnN0IHRvZ2dsZVZpZXdNb2RlID0gKCkgPT4ge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPCA5MjApIHtcbiAgICBbYm9keSwgbWVudUNvbnRhaW5lciwgY29udGVudENvbnRhaW5lciwgLi4uZGF5RnJhbWVzXS5mb3JFYWNoKFxuICAgICAgKGNvbnRhaW5lcikgPT4ge1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZnVsbC12aWV3Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCduYXJyb3ctdmlldycpO1xuICAgICAgfSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIFtib2R5LCBtZW51Q29udGFpbmVyLCBjb250ZW50Q29udGFpbmVyLCAuLi5kYXlGcmFtZXNdLmZvckVhY2goXG4gICAgICAoY29udGFpbmVyKSA9PiB7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmdWxsLXZpZXcnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ25hcnJvdy12aWV3Jyk7XG4gICAgICB9LFxuICAgICk7XG4gIH1cbn07XG50b2dnbGVWaWV3TW9kZSgpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdG9nZ2xlVmlld01vZGUpO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1ETStTZXJpZitEaXNwbGF5JmZhbWlseT1SdWZpbmE6d2dodEA3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9T3BlbitTYW5zJmZhbWlseT1SdWZpbmE6d2dodEA3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RUIrR2FyYW1vbmQ6d2dodEA1MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XG4gIC8qIG91dGxpbmU6IDFweCBzb2xpZCByZWQ7ICovXG59XG5cbjpyb290IHtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG46cm9vdC5saWdodCB7XG4gIC0tYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQyLCAyMzIpO1xuICAtLWNvbnRyYXN0LWNvbG9yOiByZ2IoMjYsIDI4LCAyNik7XG4gIC0tc2VhcmNoLWJhY2tncm91bmQtY29sb3I6IHJnYmEoMjYsIDI4LCAyNiwgMC4xKTtcbn1cblxuOnJvb3QuZGFyayB7XG4gIC0tYmFja2dyb3VuZC1jb2xvcjogcmdiKDI2LCAyOCwgMjYpO1xuICAtLWNvbnRyYXN0LWNvbG9yOiByZ2IoMjQ1LCAyNDIsIDIzMik7XG4gIC0tc2VhcmNoLWJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ1LCAyNDIsIDIzMiwgMC4xKTtcbn1cblxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xuICBjb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xuXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5ib2R5LmZ1bGwtdmlldyB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KG1pbi1jb250ZW50LCAxMTAwcHgpO1xufVxuXG5ib2R5Lm5hcnJvdy12aWV3IHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgobWluLWNvbnRlbnQsIDYwMHB4KTtcbiAgLnRpdGxlLWNvbnRhaW5lciB7XG4gICAgZm9udC1zaXplOiA1MHB4O1xuICB9XG59XG5cbi5wYWdlLWNvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwdmg7XG4gIHBhZGRpbmc6IDAgMTBweDtcblxuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCBtaW4tY29udGVudCk7XG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbn1cblxuLnRpdGxlLWNvbnRhaW5lcixcbi5jb250ZW50LWNvbnRhaW5lcixcbmZvb3RlciB7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4udGl0bGUtY29udGFpbmVyIHtcbiAgZm9udC1zaXplOiA1cmVtO1xuICBsZXR0ZXItc3BhY2luZzogMC41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbn1cblxuLnRpdGxlLWNvbnRhaW5lcixcbmZvb3RlciAqLFxuLnVuaXQtdG9nZ2xlICoge1xuICBmb250LWZhbWlseTogJ1J1ZmluYScsIHNlcmlmO1xufVxuXG4ubWVudS1jb250YWluZXIge1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcblxuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5tZW51LWNvbnRhaW5lci5mdWxsLXZpZXcge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDE0MHB4IG1pbm1heCgyMDBweCwgMzAlKSAxNDBweDtcbn1cblxuLm1lbnUtY29udGFpbmVyLm5hcnJvdy12aWV3IHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCBtaW4tY29udGVudDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG87XG4gIGNvbHVtbi1nYXA6IDMwcHg7XG4gIHJvdy1nYXA6IDEwcHg7XG4gIG1heC13aWR0aDogNDAwcHg7XG5cbiAgPiAudGhlbWUtdG9nZ2xlIHtcbiAgICBncmlkLXJvdzogMi8zO1xuICB9XG4gID4gZm9ybSB7XG4gICAgZ3JpZC1jb2x1bW46IDEvMztcbiAgfVxuICA+IC51bml0LXRvZ2dsZSB7XG4gICAgZ3JpZC1yb3c6IDIvMztcbiAgfVxufVxuXG4ubWVudS1jb250YWluZXIsXG5mb290ZXIge1xuICB3aWR0aDogMTAwJTtcbiAganVzdGlmeS1zZWxmOiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4udGhlbWUtdG9nZ2xlLnN3aXRjaCB7XG4gIHdpZHRoOiA1N3B4O1xufVxuXG4udW5pdC10b2dnbGUuc3dpdGNoIHtcbiAgd2lkdGg6IDE0MHB4O1xufVxuXG4udGhlbWUtdG9nZ2xlLnNsaWRlciB7XG4gIHdpZHRoOiAyMnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBnb2xkZW5yb2Q7XG59XG5cbi51bml0LXRvZ2dsZS5zbGlkZXIge1xuICB3aWR0aDogNzBweDtcbn1cblxuLm1ldHJpYyxcbi5pbXBlcmlhbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA2cHg7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5pbXBlcmlhbCB7XG4gIGxlZnQ6IDE0cHg7XG59XG5cbi5tZXRyaWMge1xuICByaWdodDogMTBweDtcbn1cblxuLnN3aXRjaCB7XG4gIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW46IDNweDtcbiAgaGVpZ2h0OiAzM3B4O1xufVxuXG4uc3dpdGNoLFxuLnNsaWRlciB7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG59XG5cbmlucHV0W3R5cGU9J2NoZWNrYm94J10ge1xuICBhcHBlYXJhbmNlOiBub25lO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4uc2xpZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogM3B4O1xuICBsZWZ0OiA0cHg7XG4gIHRyYW5zaXRpb246IDMwMG1zO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGhlaWdodDogMjJweDtcbn1cblxuaW5wdXRbdHlwZT0nY2hlY2tib3gnXTpjaGVja2VkIHtcbiAgKyAudGhlbWUtdG9nZ2xlLnNsaWRlciB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMjNweCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgYm94LXNoYWRvdzogaW5zZXQgLThweCAwIDBweCAwcHggcmdiKDExNiwgMTU0LCAyMjQpO1xuICB9XG4gICsgLnVuaXQtdG9nZ2xlLnNsaWRlciB7XG4gICAgd2lkdGg6IDU1cHg7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNzNweCk7XG4gIH1cbn1cblxuZm9ybSB7XG4gIHdpZHRoOiAxMDAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuaW5wdXRbdHlwZT0ndGV4dCddIHtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7XG4gIHBhZGRpbmc6IDdweCAxNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zZWFyY2gtYmFja2dyb3VuZC1jb2xvcik7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGNvbG9yOiB2YXIoLS1jb250cmFzdC1jb2xvcik7XG5cbiAgZmxleDogMTtcbn1cblxuaW5wdXRbdHlwZT0ndGV4dCddOmZvY3VzIHtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiAycHggc29saWQgY29ybmZsb3dlcmJsdWU7XG59XG5cbmZvcm0gYnV0dG9uIHtcbiAgcGFkZGluZzogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMzVweDtcbiAgem9vbTogMTclO1xuICB0cmFuc2l0aW9uOiAzMDBtcztcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB6b29tOiAxOCU7XG59XG5cbi5kYXRlLWNvbnRhaW5lciB7XG4gIGJvcmRlci10b3A6IDVweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMnB4O1xuICB3aWR0aDogMTAwJTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNTBweDtcbn1cblxuLmRhdGUtY29udGFpbmVyICoge1xuICBmb250LWZhbWlseTogJ0VCIEdhcmFtb25kJywgc2VyaWY7XG4gIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDAuOHJlbTtcbn1cblxuLmNvbnRlbnQtYmFja2dyb3VuZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMzBweCAwO1xufVxuXG4uY29udGVudC1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMXB4O1xufVxuXG4uY29udGVudC1jb250YWluZXIuZnVsbC12aWV3IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcblxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIyMHB4LCAxZnIpKTtcbn1cblxuLmNvbnRlbnQtY29udGFpbmVyLm5hcnJvdy12aWV3IHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZml0LCBtaW4tY29udGVudCk7XG4gIG1hcmdpbjogLTMwcHggMDtcblxuICA+IC5kYXktZnJhbWUge1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gIH1cbn1cblxuLmRheS1mcmFtZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xuICBwYWRkaW5nOiAwIDMwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiAxNXB4O1xufVxuXG4uZGF5LWZyYW1lLm5hcnJvdy12aWV3IHtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDE1MHB4LCAyMDBweCkpO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gYXV0bztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMTVweDtcbn1cblxuLnRpdGxlIGgzIHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG59XG5cbi50ZW1wLFxuLmRldGFpbHMge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnRlbXAgcDpmaXJzdC1jaGlsZCB7XG4gIGZvbnQtc2l6ZTogM3JlbTtcbn1cblxuLnRlbXAgcDpsYXN0LWNoaWxkIHtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAxLjVyZW07XG59XG5cbi5kYXktZnJhbWUgOjpiZWZvcmUge1xuICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuXG4uZGV0YWlscyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogM3B4O1xufVxuXG4uZGV0YWlscyBwOmZpcnN0LWNoaWxkOjpiZWZvcmUge1xuICBjb250ZW50OiAncmFpbjogJztcbn1cblxuLmRldGFpbHMgcDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICd3aW5kOiAnO1xufVxuXG4uZGV0YWlscyBwOmxhc3QtY2hpbGQ6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICdodW1pZGl0eTogJztcbn1cblxuLmltZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmaWx0ZXI6IGdyYXlzY2FsZSgwLjUpO1xufVxuXG5pbWcge1xuICB3aWR0aDogMTAwcHg7XG59XG5cbmZvb3RlciB7XG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XG4gIHBhZGRpbmc6IDVweCAwO1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5jcmVkaXRzIGEge1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgY29sb3I6IGluaGVyaXQ7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUlBO0VBQ0UsU0FBUztFQUNULFVBQVU7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Q0UsdUNBQXVDO0VBQ3ZDLFdBQVc7RUFDWCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFFBQVE7QUFDVjs7QUFFQTtFQUNFLDRDQUE0QztFQUM1Qyw2Q0FBNkM7O0VBRTdDLDJEQUEyRDtBQUM3RDs7QUFFQTtFQUNFLDBCQUEwQjtFQUMxQixpREFBaUQ7RUFDakQsZUFBZTs7RUFFZjtJQUNFLGFBQWE7RUFDZjtBQUNGOztBQUVBO0VBQ0UseUNBQXlDO0VBQ3pDLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7O0VBRVgsc0RBQXNEO0VBQ3RELDZCQUE2QjtFQUM3QixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTs7RUFFRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDJDQUEyQztFQUMzQyxjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLHNCQUFzQjs7RUFFdEIsYUFBYTtFQUNiLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixjQUFjO0FBQ2hCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PURNK1NlcmlmK0Rpc3BsYXkmZmFtaWx5PVJ1ZmluYTp3Z2h0QDcwMCZkaXNwbGF5PXN3YXAnKTtcXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1PcGVuK1NhbnMmZmFtaWx5PVJ1ZmluYTp3Z2h0QDcwMCZkaXNwbGF5PXN3YXAnKTtcXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1FQitHYXJhbW9uZDp3Z2h0QDUwMCZkaXNwbGF5PXN3YXAnKTtcXG5cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBzYW5zLXNlcmlmO1xcbiAgLyogb3V0bGluZTogMXB4IHNvbGlkIHJlZDsgKi9cXG59XFxuXFxuOnJvb3Qge1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbn1cXG5cXG46cm9vdC5saWdodCB7XFxuICAtLWJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDI0MiwgMjMyKTtcXG4gIC0tY29udHJhc3QtY29sb3I6IHJnYigyNiwgMjgsIDI2KTtcXG4gIC0tc2VhcmNoLWJhY2tncm91bmQtY29sb3I6IHJnYmEoMjYsIDI4LCAyNiwgMC4xKTtcXG59XFxuXFxuOnJvb3QuZGFyayB7XFxuICAtLWJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDI2KTtcXG4gIC0tY29udHJhc3QtY29sb3I6IHJnYigyNDUsIDI0MiwgMjMyKTtcXG4gIC0tc2VhcmNoLWJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ1LCAyNDIsIDIzMiwgMC4xKTtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcXG4gIGNvbG9yOiB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuXFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmJvZHkuZnVsbC12aWV3IHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KG1pbi1jb250ZW50LCAxMTAwcHgpO1xcbn1cXG5cXG5ib2R5Lm5hcnJvdy12aWV3IHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KG1pbi1jb250ZW50LCA2MDBweCk7XFxuICAudGl0bGUtY29udGFpbmVyIHtcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcbiAgfVxcbn1cXG5cXG4ucGFnZS1jb250YWluZXIge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDAgMTBweDtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCBtaW4tY29udGVudCk7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi50aXRsZS1jb250YWluZXIsXFxuLmNvbnRlbnQtY29udGFpbmVyLFxcbmZvb3RlciB7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXFxuLnRpdGxlLWNvbnRhaW5lciB7XFxuICBmb250LXNpemU6IDVyZW07XFxuICBsZXR0ZXItc3BhY2luZzogMC41cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xcbn1cXG5cXG4udGl0bGUtY29udGFpbmVyLFxcbmZvb3RlciAqLFxcbi51bml0LXRvZ2dsZSAqIHtcXG4gIGZvbnQtZmFtaWx5OiAnUnVmaW5hJywgc2VyaWY7XFxufVxcblxcbi5tZW51LWNvbnRhaW5lciB7XFxuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubWVudS1jb250YWluZXIuZnVsbC12aWV3IHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMTQwcHggbWlubWF4KDIwMHB4LCAzMCUpIDE0MHB4O1xcbn1cXG5cXG4ubWVudS1jb250YWluZXIubmFycm93LXZpZXcge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW4tY29udGVudCBtaW4tY29udGVudDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byBhdXRvO1xcbiAgY29sdW1uLWdhcDogMzBweDtcXG4gIHJvdy1nYXA6IDEwcHg7XFxuICBtYXgtd2lkdGg6IDQwMHB4O1xcblxcbiAgPiAudGhlbWUtdG9nZ2xlIHtcXG4gICAgZ3JpZC1yb3c6IDIvMztcXG4gIH1cXG4gID4gZm9ybSB7XFxuICAgIGdyaWQtY29sdW1uOiAxLzM7XFxuICB9XFxuICA+IC51bml0LXRvZ2dsZSB7XFxuICAgIGdyaWQtcm93OiAyLzM7XFxuICB9XFxufVxcblxcbi5tZW51LWNvbnRhaW5lcixcXG5mb290ZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBqdXN0aWZ5LXNlbGY6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi50aGVtZS10b2dnbGUuc3dpdGNoIHtcXG4gIHdpZHRoOiA1N3B4O1xcbn1cXG5cXG4udW5pdC10b2dnbGUuc3dpdGNoIHtcXG4gIHdpZHRoOiAxNDBweDtcXG59XFxuXFxuLnRoZW1lLXRvZ2dsZS5zbGlkZXIge1xcbiAgd2lkdGg6IDIycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBnb2xkZW5yb2Q7XFxufVxcblxcbi51bml0LXRvZ2dsZS5zbGlkZXIge1xcbiAgd2lkdGg6IDcwcHg7XFxufVxcblxcbi5tZXRyaWMsXFxuLmltcGVyaWFsIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNnB4O1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxuICBjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmltcGVyaWFsIHtcXG4gIGxlZnQ6IDE0cHg7XFxufVxcblxcbi5tZXRyaWMge1xcbiAgcmlnaHQ6IDEwcHg7XFxufVxcblxcbi5zd2l0Y2gge1xcbiAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbjogM3B4O1xcbiAgaGVpZ2h0OiAzM3B4O1xcbn1cXG5cXG4uc3dpdGNoLFxcbi5zbGlkZXIge1xcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcXG59XFxuXFxuaW5wdXRbdHlwZT0nY2hlY2tib3gnXSB7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLnNsaWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDNweDtcXG4gIGxlZnQ6IDRweDtcXG4gIHRyYW5zaXRpb246IDMwMG1zO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgaGVpZ2h0OiAyMnB4O1xcbn1cXG5cXG5pbnB1dFt0eXBlPSdjaGVja2JveCddOmNoZWNrZWQge1xcbiAgKyAudGhlbWUtdG9nZ2xlLnNsaWRlciB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDIzcHgpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgLThweCAwIDBweCAwcHggcmdiKDExNiwgMTU0LCAyMjQpO1xcbiAgfVxcbiAgKyAudW5pdC10b2dnbGUuc2xpZGVyIHtcXG4gICAgd2lkdGg6IDU1cHg7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDczcHgpO1xcbiAgfVxcbn1cXG5cXG5mb3JtIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcblxcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmlucHV0W3R5cGU9J3RleHQnXSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7XFxuICBwYWRkaW5nOiA3cHggMTVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNlYXJjaC1iYWNrZ3JvdW5kLWNvbG9yKTtcXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICBjb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xcblxcbiAgZmxleDogMTtcXG59XFxuXFxuaW5wdXRbdHlwZT0ndGV4dCddOmZvY3VzIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG91dGxpbmU6IDJweCBzb2xpZCBjb3JuZmxvd2VyYmx1ZTtcXG59XFxuXFxuZm9ybSBidXR0b24ge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDM1cHg7XFxuICB6b29tOiAxNyU7XFxuICB0cmFuc2l0aW9uOiAzMDBtcztcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHpvb206IDE4JTtcXG59XFxuXFxuLmRhdGUtY29udGFpbmVyIHtcXG4gIGJvcmRlci10b3A6IDVweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMnB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuXFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogNTBweDtcXG59XFxuXFxuLmRhdGUtY29udGFpbmVyICoge1xcbiAgZm9udC1mYW1pbHk6ICdFQiBHYXJhbW9uZCcsIHNlcmlmO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAwLjhyZW07XFxufVxcblxcbi5jb250ZW50LWJhY2tncm91bmQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDMwcHggMDtcXG59XFxuXFxuLmNvbnRlbnQtY29udGFpbmVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMXB4O1xcbn1cXG5cXG4uY29udGVudC1jb250YWluZXIuZnVsbC12aWV3IHtcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xcblxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMjBweCwgMWZyKSk7XFxufVxcblxcbi5jb250ZW50LWNvbnRhaW5lci5uYXJyb3ctdmlldyB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZml0LCBtaW4tY29udGVudCk7XFxuICBtYXJnaW46IC0zMHB4IDA7XFxuXFxuICA+IC5kYXktZnJhbWUge1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgfVxcbn1cXG5cXG4uZGF5LWZyYW1lIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xcbiAgcGFkZGluZzogMCAzMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogMTVweDtcXG59XFxuXFxuLmRheS1mcmFtZS5uYXJyb3ctdmlldyB7XFxuICB3aWR0aDogMTAwJTtcXG5cXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgxNTBweCwgMjAwcHgpKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byBhdXRvO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxNXB4O1xcbn1cXG5cXG4udGl0bGUgaDMge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbi50ZW1wLFxcbi5kZXRhaWxzIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4udGVtcCBwOmZpcnN0LWNoaWxkIHtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG59XFxuXFxuLnRlbXAgcDpsYXN0LWNoaWxkIHtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLmRheS1mcmFtZSA6OmJlZm9yZSB7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbn1cXG5cXG4uZGV0YWlscyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAzcHg7XFxufVxcblxcbi5kZXRhaWxzIHA6Zmlyc3QtY2hpbGQ6OmJlZm9yZSB7XFxuICBjb250ZW50OiAncmFpbjogJztcXG59XFxuXFxuLmRldGFpbHMgcDpudGgtY2hpbGQoMik6OmJlZm9yZSB7XFxuICBjb250ZW50OiAnd2luZDogJztcXG59XFxuXFxuLmRldGFpbHMgcDpsYXN0LWNoaWxkOjpiZWZvcmUge1xcbiAgY29udGVudDogJ2h1bWlkaXR5OiAnO1xcbn1cXG5cXG4uaW1nIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZpbHRlcjogZ3JheXNjYWxlKDAuNSk7XFxufVxcblxcbmltZyB7XFxuICB3aWR0aDogMTAwcHg7XFxufVxcblxcbmZvb3RlciB7XFxuICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xcbiAgcGFkZGluZzogNXB4IDA7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XFxuXFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uY3JlZGl0cyBhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZXMuY3NzJztcbmltcG9ydCAnLi9kYXRhJztcbmltcG9ydCAnLi9mb3JtRE9NJztcbmltcG9ydCAnLi9kYXRlRE9NJztcbmltcG9ydCAnLi90b2dnbGVUaGVtZURPTSc7XG5pbXBvcnQgJy4vdG9nZ2xlVW5pdERPTSc7XG5pbXBvcnQgJy4vdmlld01vZGVET00nO1xuIl0sIm5hbWVzIjpbImdldFVuaXRzIiwicmV0dXJuRGF0YSIsImN1cnJlbnREYXRhQXJyIiwiZ2VuZXJhdGVEYXlDb250ZW50Iiwib2JqIiwiaW5kZXgiLCJmcmFtZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImRheVBhcmEiLCJjb25kaXRpb25QYXJhIiwiaW1nIiwibWF4VGVtcFBhcmEiLCJtaW5UZW1wUGFyYSIsInByZWNpcFBhcmEiLCJ3aW5kUGFyYSIsImh1bWlkaXR5UGFyYSIsInVuaXRzVHlwZSIsInRlbXBVbml0IiwicHJlY2lwVW5pdCIsIndpbmRVbml0IiwidGV4dENvbnRlbnQiLCJjb25kaXRpb24iLCJtYXhUZW1wIiwibWluVGVtcCIsInRvdGFsUHJlY2lwIiwibWF4V2luZCIsImF2Z0h1bWlkaXR5Iiwic3JjIiwiaW1nVVJMIiwiZGlzcGxheVdlYXRoZXJDb250ZW50IiwiZm9yRWFjaCIsImtleSIsImZvcmVjYXN0VVJMIiwiY2l0eSIsInNldENpdHkiLCJzdHJpbmciLCJnZXRDaXR5IiwidW5pdHMiLCJzZXRVbml0cyIsImZldGNoRm9yZWNhc3QiLCJyZXNwb25zZSIsImZldGNoIiwibW9kZSIsImRhdGEiLCJqc29uIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzRGF0YSIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJkYXRhQXJyIiwiZGF5T2JqIiwiZGF5RGF0YSIsImRheSIsInNoYXJlZERhdGEiLCJ1bml0U3BlY2lmaWNEYXRhIiwidGV4dCIsImljb24iLCJhdmdodW1pZGl0eSIsImRhdGUiLCJtYXh0ZW1wX2YiLCJtaW50ZW1wX2YiLCJ0b3RhbHByZWNpcF9pbiIsIm1heHdpbmRfbXBoIiwibWF4dGVtcF9jIiwibWludGVtcF9jIiwidG90YWxwcmVjaXBfbW0iLCJtYXh3aW5kX2twaCIsIk1hdGgiLCJyb3VuZCIsInB1c2giLCJEYXRlIiwiZGF5c0FyciIsIm1vbnRoc0FyciIsImZvcmVjYXN0RGF5VGl0bGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImRpc3BsYXlGb3JlY2FzdERheU9mVGhlV2VlayIsImV4dGVuZGVkRGF5c0FyciIsImZpcnN0Rm9yY2FzdERheUluZGV4IiwiZ2V0RGF5IiwiZGF5TmFtZXMiLCJzbGljZSIsInRpdGxlIiwidGl0bGVOb2RlIiwiZGF0ZVNwYW4iLCJkaXNwbGF5VG9kYXlzRGF0ZSIsImRheU9mVGhlV2VlayIsInRvVXBwZXJDYXNlIiwibW9udGgiLCJnZXRNb250aCIsImRheU9mVGhlTW9udGgiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwiZGlzcGxheUNpdHkiLCJmb3JtIiwiaW5wdXQiLCJzZWFyY2hCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwicmVzZXQiLCJ0aXRsZUNvbnRhaW5lciIsInRoZW1lVG9nZ2xlIiwicm9vdCIsInRvZ2dsZVRoZW1lIiwiY2hlY2tlZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInVuaXRUb2dnbGUiLCJ0b2dnbGVVbml0cyIsImJvZHkiLCJtZW51Q29udGFpbmVyIiwiY29udGVudENvbnRhaW5lciIsImRheUZyYW1lcyIsInRvZ2dsZVZpZXdNb2RlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImNvbnRhaW5lciJdLCJzb3VyY2VSb290IjoiIn0=