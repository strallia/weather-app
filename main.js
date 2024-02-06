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
/* harmony import */ var _images_search_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/search.png */ "./src/images/search.png");




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
const displaySearchIcon = () => {
  const img = document.createElement('img');
  img.src = _images_search_png__WEBPACK_IMPORTED_MODULE_3__;
  searchBtn.appendChild(img);
};
displaySearchIcon();

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

/***/ }),

/***/ "./src/images/search.png":
/*!*******************************!*\
  !*** ./src/images/search.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "222fd03c4741aad48675.png";

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8saUZBQWlGLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGNBQWMsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE1BQU0sVUFBVSxNQUFNLE1BQU0sS0FBSyxVQUFVLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxPQUFPLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxPQUFPLFlBQVksT0FBTyxLQUFLLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsYUFBYSxNQUFNLFVBQVUsS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsS0FBSyxNQUFNLE1BQU0sVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxNQUFNLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsTUFBTSxNQUFNLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sTUFBTSxLQUFLLFVBQVUsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxjQUFjLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxjQUFjLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxZQUFZLEtBQUssVUFBVSxLQUFLLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLGNBQWMsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsdUlBQXVJLHdHQUF3Ryw0RkFBNEYsT0FBTyxjQUFjLGVBQWUsMkJBQTJCLHlDQUF5QywrQkFBK0IsS0FBSyxXQUFXLG9CQUFvQixHQUFHLGlCQUFpQiwyQ0FBMkMsc0NBQXNDLHFEQUFxRCxHQUFHLGdCQUFnQix3Q0FBd0MseUNBQXlDLHdEQUF3RCxHQUFHLFVBQVUsOENBQThDLGlDQUFpQyxvQkFBb0IsNEJBQTRCLEdBQUcsb0JBQW9CLHVEQUF1RCxHQUFHLHNCQUFzQixzREFBc0Qsc0JBQXNCLHNCQUFzQixLQUFLLEdBQUcscUJBQXFCLGtCQUFrQixvQkFBb0Isb0JBQW9CLCtDQUErQywwQkFBMEIsR0FBRyxvREFBb0Qsc0JBQXNCLEdBQUcsc0JBQXNCLG9CQUFvQiwyQkFBMkIsdUJBQXVCLDBCQUEwQixHQUFHLGtEQUFrRCxpQ0FBaUMsR0FBRyxxQkFBcUIseUJBQXlCLG9CQUFvQixtQ0FBbUMsd0JBQXdCLEdBQUcsK0JBQStCLDBEQUEwRCxHQUFHLGlDQUFpQyxtREFBbUQsa0NBQWtDLHFCQUFxQixrQkFBa0IscUJBQXFCLHVCQUF1QixvQkFBb0IsS0FBSyxZQUFZLHVCQUF1QixLQUFLLG9CQUFvQixvQkFBb0IsS0FBSyxHQUFHLDhCQUE4QixnQkFBZ0IsZ0NBQWdDLEdBQUcsMEJBQTBCLGdCQUFnQixHQUFHLHlCQUF5QixpQkFBaUIsR0FBRywwQkFBMEIsZ0JBQWdCLGdDQUFnQyxHQUFHLHlCQUF5QixnQkFBZ0IsR0FBRyx5QkFBeUIsdUJBQXVCLGFBQWEsc0JBQXNCLG1DQUFtQyxzQkFBc0Isb0JBQW9CLEdBQUcsZUFBZSxlQUFlLEdBQUcsYUFBYSxnQkFBZ0IsR0FBRyxhQUFhLDRDQUE0QyxxQkFBcUIsdUJBQXVCLGdCQUFnQixpQkFBaUIsR0FBRyx1QkFBdUIsd0JBQXdCLEdBQUcsNEJBQTRCLHFCQUFxQixnQkFBZ0IsaUJBQWlCLG9CQUFvQixrQ0FBa0MsR0FBRyxhQUFhLDRDQUE0Qyx1QkFBdUIsYUFBYSxjQUFjLHNCQUFzQixvQkFBb0IsaUJBQWlCLEdBQUcsb0NBQW9DLDRCQUE0QixpQ0FBaUMsb0NBQW9DLDBEQUEwRCxLQUFLLDJCQUEyQixrQkFBa0IsaUNBQWlDLEtBQUssR0FBRyxVQUFVLGdCQUFnQix1QkFBdUIsb0JBQW9CLHdCQUF3QixHQUFHLHdCQUF3QixpQkFBaUIsZ0NBQWdDLHNCQUFzQixxREFBcUQsd0JBQXdCLGlDQUFpQyxjQUFjLEdBQUcsOEJBQThCLGlCQUFpQixzQ0FBc0MsR0FBRyxpQkFBaUIsa0JBQWtCLGtDQUFrQyxpQkFBaUIsdUJBQXVCLGdCQUFnQixjQUFjLHNCQUFzQixHQUFHLGtCQUFrQixvQkFBb0IsY0FBYyxHQUFHLHFCQUFxQixnREFBZ0QsbURBQW1ELHVCQUF1QixpQkFBaUIsZ0JBQWdCLG9CQUFvQixtQ0FBbUMsd0JBQXdCLGNBQWMsR0FBRyx1QkFBdUIsc0NBQXNDLDJCQUEyQixzQkFBc0Isc0JBQXNCLEdBQUcseUJBQXlCLDRDQUE0QyxnQkFBZ0IsbUJBQW1CLEdBQUcsd0JBQXdCLGdCQUFnQixrQkFBa0Isd0JBQXdCLDRCQUE0QixhQUFhLEdBQUcsa0NBQWtDLGlEQUFpRCxrREFBa0Qsa0VBQWtFLEdBQUcsb0NBQW9DLCtCQUErQixzREFBc0Qsb0JBQW9CLG9CQUFvQixvQkFBb0IsS0FBSyxHQUFHLGdCQUFnQiw4Q0FBOEMsb0JBQW9CLHVCQUF1QixrQkFBa0IsY0FBYyxHQUFHLDRCQUE0QixnQkFBZ0IsNkRBQTZELGtDQUFrQyx3QkFBd0IsNEJBQTRCLGNBQWMsR0FBRyxlQUFlLHNCQUFzQixHQUFHLHNCQUFzQixzQkFBc0IsR0FBRyx5QkFBeUIsb0JBQW9CLEdBQUcsd0JBQXdCLHdCQUF3QixzQkFBc0IsR0FBRyx5QkFBeUIsd0JBQXdCLEdBQUcsY0FBYyxrQkFBa0IsYUFBYSxHQUFHLG9DQUFvQyxzQkFBc0IsR0FBRyxxQ0FBcUMsc0JBQXNCLEdBQUcsbUNBQW1DLDBCQUEwQixHQUFHLFVBQVUsa0JBQWtCLDRCQUE0QiwyQkFBMkIsR0FBRyxTQUFTLGlCQUFpQixHQUFHLFlBQVksZ0RBQWdELG1CQUFtQixzQkFBc0IsMkJBQTJCLG9CQUFvQixtQ0FBbUMsR0FBRyxnQkFBZ0IseUJBQXlCLG1CQUFtQixHQUFHLHFCQUFxQjtBQUNyelI7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7O0FDOVcxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFvRztBQUNwRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHVGQUFPOzs7O0FBSThDO0FBQ3RFLE9BQU8saUVBQWUsdUZBQU8sSUFBSSx1RkFBTyxVQUFVLHVGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2xCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FzQjtBQUNOO0FBQ0c7QUFDQTtBQUNPO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb250ZW50RE9NLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZGF0ZURPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9mb3JtRE9NLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2tleS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy90aXRsZURPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy90b2dnbGVUaGVtZURPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy90b2dnbGVVbml0RE9NLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3ZpZXdNb2RlRE9NLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRVbml0cywgcmV0dXJuRGF0YSB9IGZyb20gJy4vZGF0YSc7XG5cbmxldCBjdXJyZW50RGF0YUFycjtcblxuY29uc3QgZ2VuZXJhdGVEYXlDb250ZW50ID0gKG9iaiwgaW5kZXgpID0+IHtcbiAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZGF5LWZyYW1lW2RhdGEtaWQ9XCIke2luZGV4fVwiXWApO1xuICBjb25zdCBkYXlQYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLnRpdGxlID4gaDMnKTtcbiAgY29uc3QgY29uZGl0aW9uUGFyYSA9IGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZSA+IHAnKTtcbiAgY29uc3QgaW1nID0gZnJhbWUucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gIGNvbnN0IG1heFRlbXBQYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLnRlbXAgPiBwOmZpcnN0LWNoaWxkJyk7XG4gIGNvbnN0IG1pblRlbXBQYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLnRlbXAgPiBwOmxhc3QtY2hpbGQnKTtcbiAgY29uc3QgcHJlY2lwUGFyYSA9IGZyYW1lLnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzID4gcDpmaXJzdC1vZi10eXBlJyk7XG4gIGNvbnN0IHdpbmRQYXJhID0gZnJhbWUucXVlcnlTZWxlY3RvcignLmRldGFpbHMgPiBwOm50aC1jaGlsZCgyKScpO1xuICBjb25zdCBodW1pZGl0eVBhcmEgPSBmcmFtZS5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscyA+IHA6bGFzdC1vZi10eXBlJyk7XG5cbiAgY29uc3QgdW5pdHNUeXBlID0gZ2V0VW5pdHMoKTtcbiAgY29uc3QgdGVtcFVuaXQgPSB1bml0c1R5cGUgPT09ICdpbXBlcmlhbCcgPyAnRicgOiAnQyc7XG4gIGNvbnN0IHByZWNpcFVuaXQgPSB1bml0c1R5cGUgPT09ICdpbXBlcmlhbCcgPyAnaW4nIDogJ21tJztcbiAgY29uc3Qgd2luZFVuaXQgPSB1bml0c1R5cGUgPT09ICdpbXBlcmlhbCcgPyAnbXBoJyA6ICdrcGgnO1xuXG4gIGNvbmRpdGlvblBhcmEudGV4dENvbnRlbnQgPSBvYmouY29uZGl0aW9uO1xuICBtYXhUZW1wUGFyYS50ZXh0Q29udGVudCA9IGAke29iai5tYXhUZW1wfcKwJHt0ZW1wVW5pdH1gO1xuICBtaW5UZW1wUGFyYS50ZXh0Q29udGVudCA9IGAke29iai5taW5UZW1wfcKwJHt0ZW1wVW5pdH1gO1xuICBwcmVjaXBQYXJhLnRleHRDb250ZW50ID0gYCR7b2JqLnRvdGFsUHJlY2lwfSAke3ByZWNpcFVuaXR9YDtcbiAgd2luZFBhcmEudGV4dENvbnRlbnQgPSBgJHtvYmoubWF4V2luZH0gJHt3aW5kVW5pdH1gO1xuICBodW1pZGl0eVBhcmEudGV4dENvbnRlbnQgPSBgJHtvYmouYXZnSHVtaWRpdHl9JWA7XG5cbiAgaW1nLnNyYyA9IGBodHRwczoke29iai5pbWdVUkx9YDtcbn07XG5cbmNvbnN0IGRpc3BsYXlXZWF0aGVyQ29udGVudCA9IGFzeW5jICgpID0+IHtcbiAgY3VycmVudERhdGFBcnIgPSBhd2FpdCByZXR1cm5EYXRhKCk7XG4gIGN1cnJlbnREYXRhQXJyLmZvckVhY2goKG9iaiwgaW5kZXgpID0+IGdlbmVyYXRlRGF5Q29udGVudChvYmosIGluZGV4KSk7XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5V2VhdGhlckNvbnRlbnQgfTtcbiIsImltcG9ydCB7IGtleSB9IGZyb20gJy4va2V5JztcblxuY29uc3QgZm9yZWNhc3RVUkwgPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHtrZXl9JmRheXM9NCZxPWA7XG5cbi8vIHN0YXRlIHZhcmlhYmxlc1xubGV0IGNpdHkgPSAnZGF2aXMnO1xuY29uc3Qgc2V0Q2l0eSA9IChzdHJpbmcpID0+IHtcbiAgY2l0eSA9IHN0cmluZztcbn07XG5jb25zdCBnZXRDaXR5ID0gKCkgPT4gY2l0eTtcblxubGV0IHVuaXRzID0gJ2ltcGVyaWFsJztcbmNvbnN0IHNldFVuaXRzID0gKHN0cmluZykgPT4ge1xuICB1bml0cyA9IHN0cmluZztcbn07XG5jb25zdCBnZXRVbml0cyA9ICgpID0+IHVuaXRzO1xuXG4vLyBGb3JlY2FzdCBBUEkgY2FsbHNcbmNvbnN0IGZldGNoRm9yZWNhc3QgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChmb3JlY2FzdFVSTCArIGNpdHksIHsgbW9kZTogJ2NvcnMnIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxufTtcblxuY29uc3QgcHJvY2Vzc0RhdGEgPSBhc3luYyAoZGF0YSkgPT4ge1xuICBjb25zdCBmb3JlY2FzdCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXk7XG4gIGNvbnN0IGRhdGFBcnIgPSBbXTtcblxuICBmb3JlY2FzdC5mb3JFYWNoKChkYXlPYmopID0+IHtcbiAgICBjb25zdCBkYXlEYXRhID0gZGF5T2JqLmRheTtcbiAgICBsZXQgc2hhcmVkRGF0YSA9IHt9O1xuICAgIGxldCB1bml0U3BlY2lmaWNEYXRhID0ge307XG5cbiAgICAvLyBnYXRoZXIgc2hhcmVkIGRhdGFcbiAgICBjb25zdCB7XG4gICAgICBjb25kaXRpb246IHsgdGV4dDogY29uZGl0aW9uIH0sXG4gICAgICBjb25kaXRpb246IHsgaWNvbjogaW1nVVJMIH0sXG4gICAgICBhdmdodW1pZGl0eTogYXZnSHVtaWRpdHksXG4gICAgfSA9IGRheURhdGE7XG4gICAgY29uc3QgeyBkYXRlIH0gPSBkYXlPYmo7XG4gICAgc2hhcmVkRGF0YSA9IHsgY29uZGl0aW9uLCBpbWdVUkwsIGF2Z0h1bWlkaXR5LCBkYXRlIH07XG5cbiAgICAvLyBnYXRoZXIgZGF0YSBmaWx0ZXJlZCBieSB1bml0c1xuICAgIGlmICh1bml0cyA9PT0gJ2ltcGVyaWFsJykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYXh0ZW1wX2Y6IG1heFRlbXAsXG4gICAgICAgIG1pbnRlbXBfZjogbWluVGVtcCxcbiAgICAgICAgdG90YWxwcmVjaXBfaW46IHRvdGFsUHJlY2lwLFxuICAgICAgICBtYXh3aW5kX21waDogbWF4V2luZCxcbiAgICAgIH0gPSBkYXlEYXRhO1xuICAgICAgdW5pdFNwZWNpZmljRGF0YSA9IHsgbWF4VGVtcCwgbWluVGVtcCwgdG90YWxQcmVjaXAsIG1heFdpbmQgfTtcbiAgICB9IGVsc2UgaWYgKHVuaXRzID09PSAnbWV0cmljJykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYXh0ZW1wX2M6IG1heFRlbXAsXG4gICAgICAgIG1pbnRlbXBfYzogbWluVGVtcCxcbiAgICAgICAgdG90YWxwcmVjaXBfbW06IHRvdGFsUHJlY2lwLFxuICAgICAgICBtYXh3aW5kX2twaDogbWF4V2luZCxcbiAgICAgIH0gPSBkYXlEYXRhO1xuICAgICAgdW5pdFNwZWNpZmljRGF0YSA9IHsgbWF4VGVtcCwgbWluVGVtcCwgdG90YWxQcmVjaXAsIG1heFdpbmQgfTtcbiAgICB9XG5cbiAgICAvLyByb3VuZCB0ZW1wZXJhdHVyZVxuICAgIHVuaXRTcGVjaWZpY0RhdGEubWF4VGVtcCA9IE1hdGgucm91bmQodW5pdFNwZWNpZmljRGF0YS5tYXhUZW1wKTtcbiAgICB1bml0U3BlY2lmaWNEYXRhLm1pblRlbXAgPSBNYXRoLnJvdW5kKHVuaXRTcGVjaWZpY0RhdGEubWluVGVtcCk7XG5cbiAgICBkYXRhQXJyLnB1c2goeyAuLi5zaGFyZWREYXRhLCAuLi51bml0U3BlY2lmaWNEYXRhIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGF0YUFycjtcbn07XG5cbmNvbnN0IHJldHVybkRhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hGb3JlY2FzdCgpO1xuICBjb25zdCBkYXRhID0gcHJvY2Vzc0RhdGEocmVzcG9uc2UpO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbmV4cG9ydCB7IHNldENpdHksIGdldENpdHksIGdldFVuaXRzLCBzZXRVbml0cywgcmV0dXJuRGF0YSB9O1xuIiwiY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbmNvbnN0IGRheXNBcnIgPSBbXG4gICdTdW5kYXknLFxuICAnTW9uZGF5JyxcbiAgJ1R1ZXNkYXknLFxuICAnV2VkbmVzZGF5JyxcbiAgJ1RodXJzZGF5JyxcbiAgJ0ZyaWRheScsXG4gICdTYXR1cmRheScsXG5dO1xuXG5jb25zdCBtb250aHNBcnIgPSBbXG4gICdKYW51YXJ5JyxcbiAgJ0ZlYnJ1YXJ5JyxcbiAgJ01hcmNoJyxcbiAgJ0FwcmlsJyxcbiAgJ01heScsXG4gICdKdW5lJyxcbiAgJ0p1bHknLFxuICAnQXVndXN0JyxcbiAgJ1NlcHRlbWJlcicsXG4gICdPY3RvYmVyJyxcbiAgJ05vdmVtYmVyJyxcbiAgJ0RlY2VtYmVyJyxcbl07XG5cbmNvbnN0IGZvcmVjYXN0RGF5VGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaDMuZm9yZWNhc3QnKTtcblxuY29uc3QgZGlzcGxheUZvcmVjYXN0RGF5T2ZUaGVXZWVrID0gKCkgPT4ge1xuICBjb25zdCBleHRlbmRlZERheXNBcnIgPSBbLi4uZGF5c0FyciwgLi4uZGF5c0Fycl07XG4gIGNvbnN0IGZpcnN0Rm9yY2FzdERheUluZGV4ID0gZGF0ZS5nZXREYXkoKSArIDE7XG4gIGNvbnN0IGRheU5hbWVzID0gZXh0ZW5kZWREYXlzQXJyLnNsaWNlKFxuICAgIGZpcnN0Rm9yY2FzdERheUluZGV4LFxuICAgIGZpcnN0Rm9yY2FzdERheUluZGV4ICsgMyxcbiAgKTtcbiAgZm9yZWNhc3REYXlUaXRsZXMuZm9yRWFjaCgodGl0bGUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgdGl0bGVOb2RlID0gdGl0bGU7XG4gICAgdGl0bGVOb2RlLnRleHRDb250ZW50ID0gZGF5TmFtZXNbaW5kZXhdO1xuICB9KTtcbn07XG5kaXNwbGF5Rm9yZWNhc3REYXlPZlRoZVdlZWsoKTtcblxuY29uc3QgZGF0ZVNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0ZScpO1xuXG5jb25zdCBkaXNwbGF5VG9kYXlzRGF0ZSA9ICgpID0+IHtcbiAgY29uc3QgZGF5T2ZUaGVXZWVrID0gZGF5c0FycltkYXRlLmdldERheSgpXS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBtb250aCA9IG1vbnRoc0FycltkYXRlLmdldE1vbnRoKCldLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRheU9mVGhlTW9udGggPSBkYXRlLmdldERhdGUoKTtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICBkYXRlU3Bhbi50ZXh0Q29udGVudCA9IGAke2RheU9mVGhlV2Vla30sICR7bW9udGh9ICR7ZGF5T2ZUaGVNb250aH0sICR7eWVhcn1gO1xufTtcbmRpc3BsYXlUb2RheXNEYXRlKCk7XG4iLCJpbXBvcnQgeyBzZXRDaXR5IH0gZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7IGRpc3BsYXlXZWF0aGVyQ29udGVudCB9IGZyb20gJy4vY29udGVudERPTSc7XG5pbXBvcnQgeyBkaXNwbGF5Q2l0eSB9IGZyb20gJy4vdGl0bGVET00nO1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuL2ltYWdlcy9zZWFyY2gucG5nJztcblxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpO1xuY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG5cbnNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBzZXRDaXR5KGlucHV0LnZhbHVlKTtcbiAgZGlzcGxheVdlYXRoZXJDb250ZW50KCk7XG4gIGRpc3BsYXlDaXR5KCk7XG4gIGZvcm0ucmVzZXQoKTtcbn0pO1xuXG5jb25zdCBkaXNwbGF5U2VhcmNoSWNvbiA9ICgpID0+IHtcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGltZy5zcmMgPSBTZWFyY2g7XG4gIHNlYXJjaEJ0bi5hcHBlbmRDaGlsZChpbWcpO1xufTtcbmRpc3BsYXlTZWFyY2hJY29uKCk7XG5cbi8vIFRPRE86IHJlbW92ZSB0aGVzZSBsaW5lcyBhZnRlciB0ZXN0aW5nXG5kaXNwbGF5V2VhdGhlckNvbnRlbnQoKTtcbmRpc3BsYXlDaXR5KCk7XG4iLCJleHBvcnQgY29uc3Qga2V5ID0gJzM5ZDFiZTAwMWVmOTRkM2RiYzA0MDY0ODI0MzEwMSc7XG4iLCJpbXBvcnQgeyBnZXRDaXR5IH0gZnJvbSAnLi9kYXRhJztcblxuY29uc3QgdGl0bGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUtY29udGFpbmVyJyk7XG5cbmNvbnN0IGRpc3BsYXlDaXR5ID0gKCkgPT4ge1xuICBjb25zdCBjaXR5ID0gZ2V0Q2l0eSgpO1xuICB0aXRsZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IGNpdHkudG9VcHBlckNhc2UoKTtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlDaXR5IH07XG4iLCJjb25zdCB0aGVtZVRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LnRoZW1lLXRvZ2dsZScpO1xuY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJzpyb290Jyk7XG5cbmNvbnN0IHRvZ2dsZVRoZW1lID0gKCkgPT4ge1xuICBpZiAodGhlbWVUb2dnbGUuY2hlY2tlZCkge1xuICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZSgnbGlnaHQnKTtcbiAgICByb290LmNsYXNzTGlzdC5hZGQoJ2RhcmsnKTtcbiAgfSBlbHNlIHtcbiAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmsnKTtcbiAgICByb290LmNsYXNzTGlzdC5hZGQoJ2xpZ2h0Jyk7XG4gIH1cbn07XG5cbnRoZW1lVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlVGhlbWUpO1xuIiwiaW1wb3J0IHsgZGlzcGxheVdlYXRoZXJDb250ZW50IH0gZnJvbSAnLi9jb250ZW50RE9NJztcbmltcG9ydCB7IHNldFVuaXRzLCBnZXRVbml0cyB9IGZyb20gJy4vZGF0YSc7XG5cbmNvbnN0IHVuaXRUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dC51bml0LXRvZ2dsZScpO1xuXG5jb25zdCB0b2dnbGVVbml0cyA9ICgpID0+IHtcbiAgaWYgKGdldFVuaXRzKCkgPT09ICdpbXBlcmlhbCcpIHtcbiAgICBzZXRVbml0cygnbWV0cmljJyk7XG4gIH0gZWxzZSB7XG4gICAgc2V0VW5pdHMoJ2ltcGVyaWFsJyk7XG4gIH1cbiAgZGlzcGxheVdlYXRoZXJDb250ZW50KCk7XG59O1xuXG51bml0VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlVW5pdHMpO1xuIiwiY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbmNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1jb250YWluZXInKTtcbmNvbnN0IGNvbnRlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1jb250YWluZXInKTtcbmNvbnN0IGRheUZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kYXktZnJhbWUnKTtcblxuY29uc3QgdG9nZ2xlVmlld01vZGUgPSAoKSA9PiB7XG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDkyMCkge1xuICAgIFtib2R5LCBtZW51Q29udGFpbmVyLCBjb250ZW50Q29udGFpbmVyLCAuLi5kYXlGcmFtZXNdLmZvckVhY2goXG4gICAgICAoY29udGFpbmVyKSA9PiB7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdmdWxsLXZpZXcnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ25hcnJvdy12aWV3Jyk7XG4gICAgICB9LFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgW2JvZHksIG1lbnVDb250YWluZXIsIGNvbnRlbnRDb250YWluZXIsIC4uLmRheUZyYW1lc10uZm9yRWFjaChcbiAgICAgIChjb250YWluZXIpID0+IHtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Z1bGwtdmlldycpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnbmFycm93LXZpZXcnKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufTtcbnRvZ2dsZVZpZXdNb2RlKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0b2dnbGVWaWV3TW9kZSk7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PURNK1NlcmlmK0Rpc3BsYXkmZmFtaWx5PVJ1ZmluYTp3Z2h0QDcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1PcGVuK1NhbnMmZmFtaWx5PVJ1ZmluYTp3Z2h0QDcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1FQitHYXJhbW9uZDp3Z2h0QDUwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgc2Fucy1zZXJpZjtcbiAgLyogb3V0bGluZTogMXB4IHNvbGlkIHJlZDsgKi9cbn1cblxuOnJvb3Qge1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbjpyb290LmxpZ2h0IHtcbiAgLS1iYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAyNDIsIDIzMik7XG4gIC0tY29udHJhc3QtY29sb3I6IHJnYigyNiwgMjgsIDI2KTtcbiAgLS1zZWFyY2gtYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNiwgMjgsIDI2LCAwLjEpO1xufVxuXG46cm9vdC5kYXJrIHtcbiAgLS1iYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCAyNik7XG4gIC0tY29udHJhc3QtY29sb3I6IHJnYigyNDUsIDI0MiwgMjMyKTtcbiAgLS1zZWFyY2gtYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDUsIDI0MiwgMjMyLCAwLjEpO1xufVxuXG5ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XG4gIGNvbG9yOiB2YXIoLS1jb250cmFzdC1jb2xvcik7XG5cbiAgZGlzcGxheTogZ3JpZDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbmJvZHkuZnVsbC12aWV3IHtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgobWluLWNvbnRlbnQsIDExMDBweCk7XG59XG5cbmJvZHkubmFycm93LXZpZXcge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heChtaW4tY29udGVudCwgNjAwcHgpO1xuICAudGl0bGUtY29udGFpbmVyIHtcbiAgICBmb250LXNpemU6IDUwcHg7XG4gIH1cbn1cblxuLnBhZ2UtY29udGFpbmVyIHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcGFkZGluZzogMCAxMHB4O1xuXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDUsIG1pbi1jb250ZW50KTtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xufVxuXG4udGl0bGUtY29udGFpbmVyLFxuLmNvbnRlbnQtY29udGFpbmVyLFxuZm9vdGVyIHtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbi50aXRsZS1jb250YWluZXIge1xuICBmb250LXNpemU6IDVyZW07XG4gIGxldHRlci1zcGFjaW5nOiAwLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xufVxuXG4udGl0bGUtY29udGFpbmVyLFxuZm9vdGVyICosXG4udW5pdC10b2dnbGUgKiB7XG4gIGZvbnQtZmFtaWx5OiAnUnVmaW5hJywgc2VyaWY7XG59XG5cbi5tZW51LWNvbnRhaW5lciB7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLm1lbnUtY29udGFpbmVyLmZ1bGwtdmlldyB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMTQwcHggbWlubWF4KDIwMHB4LCAzMCUpIDE0MHB4O1xufVxuXG4ubWVudS1jb250YWluZXIubmFycm93LXZpZXcge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbi1jb250ZW50IG1pbi1jb250ZW50O1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gYXV0bztcbiAgY29sdW1uLWdhcDogMzBweDtcbiAgcm93LWdhcDogMTBweDtcbiAgbWF4LXdpZHRoOiA0MDBweDtcblxuICA+IC50aGVtZS10b2dnbGUge1xuICAgIGdyaWQtcm93OiAyLzM7XG4gIH1cbiAgPiBmb3JtIHtcbiAgICBncmlkLWNvbHVtbjogMS8zO1xuICB9XG4gID4gLnVuaXQtdG9nZ2xlIHtcbiAgICBncmlkLXJvdzogMi8zO1xuICB9XG59XG5cbi5tZW51LWNvbnRhaW5lcixcbmZvb3RlciB7XG4gIHdpZHRoOiAxMDAlO1xuICBqdXN0aWZ5LXNlbGY6IHNwYWNlLWJldHdlZW47XG59XG5cbi50aGVtZS10b2dnbGUuc3dpdGNoIHtcbiAgd2lkdGg6IDU3cHg7XG59XG5cbi51bml0LXRvZ2dsZS5zd2l0Y2gge1xuICB3aWR0aDogMTQwcHg7XG59XG5cbi50aGVtZS10b2dnbGUuc2xpZGVyIHtcbiAgd2lkdGg6IDIycHg7XG4gIGJhY2tncm91bmQtY29sb3I6IGdvbGRlbnJvZDtcbn1cblxuLnVuaXQtdG9nZ2xlLnNsaWRlciB7XG4gIHdpZHRoOiA3MHB4O1xufVxuXG4ubWV0cmljLFxuLmltcGVyaWFsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDZweDtcbiAgZm9udC1zaXplOiAwLjhyZW07XG4gIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmltcGVyaWFsIHtcbiAgbGVmdDogMTRweDtcbn1cblxuLm1ldHJpYyB7XG4gIHJpZ2h0OiAxMHB4O1xufVxuXG4uc3dpdGNoIHtcbiAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbjogM3B4O1xuICBoZWlnaHQ6IDMzcHg7XG59XG5cbi5zd2l0Y2gsXG4uc2xpZGVyIHtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbn1cblxuaW5wdXRbdHlwZT0nY2hlY2tib3gnXSB7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5zbGlkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb250cmFzdC1jb2xvcik7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAzcHg7XG4gIGxlZnQ6IDRweDtcbiAgdHJhbnNpdGlvbjogMzAwbXM7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgaGVpZ2h0OiAyMnB4O1xufVxuXG5pbnB1dFt0eXBlPSdjaGVja2JveCddOmNoZWNrZWQge1xuICArIC50aGVtZS10b2dnbGUuc2xpZGVyIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgyM3B4KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3gtc2hhZG93OiBpbnNldCAtOHB4IDAgMHB4IDBweCByZ2IoMTE2LCAxNTQsIDIyNCk7XG4gIH1cbiAgKyAudW5pdC10b2dnbGUuc2xpZGVyIHtcbiAgICB3aWR0aDogNTVweDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSg3M3B4KTtcbiAgfVxufVxuXG5mb3JtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5pbnB1dFt0eXBlPSd0ZXh0J10ge1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcbiAgcGFkZGluZzogN3B4IDE1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNlYXJjaC1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcblxuICBmbGV4OiAxO1xufVxuXG5pbnB1dFt0eXBlPSd0ZXh0J106Zm9jdXMge1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IDJweCBzb2xpZCBjb3JuZmxvd2VyYmx1ZTtcbn1cblxuZm9ybSBidXR0b24ge1xuICBwYWRkaW5nOiAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAzNXB4O1xuICB6b29tOiAxNyU7XG4gIHRyYW5zaXRpb246IDMwMG1zO1xufVxuXG5idXR0b246aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHpvb206IDE4JTtcbn1cblxuLmRhdGUtY29udGFpbmVyIHtcbiAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAycHg7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA1MHB4O1xufVxuXG4uZGF0ZS1jb250YWluZXIgKiB7XG4gIGZvbnQtZmFtaWx5OiAnRUIgR2FyYW1vbmQnLCBzZXJpZjtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xufVxuXG4uY29udGVudC1iYWNrZ3JvdW5kIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29udHJhc3QtY29sb3IpO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAzMHB4IDA7XG59XG5cbi5jb250ZW50LWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxcHg7XG59XG5cbi5jb250ZW50LWNvbnRhaW5lci5mdWxsLXZpZXcge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tY29udHJhc3QtY29sb3IpO1xuXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjIwcHgsIDFmcikpO1xufVxuXG4uY29udGVudC1jb250YWluZXIubmFycm93LXZpZXcge1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoYXV0by1maXQsIG1pbi1jb250ZW50KTtcbiAgbWFyZ2luOiAtMzBweCAwO1xuXG4gID4gLmRheS1mcmFtZSB7XG4gICAgcGFkZGluZzogMjBweDtcbiAgfVxufVxuXG4uZGF5LWZyYW1lIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XG4gIHBhZGRpbmc6IDAgMzBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDE1cHg7XG59XG5cbi5kYXktZnJhbWUubmFycm93LXZpZXcge1xuICB3aWR0aDogMTAwJTtcblxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW5tYXgoMTUwcHgsIDIwMHB4KSk7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byBhdXRvO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxNXB4O1xufVxuXG4udGl0bGUgaDMge1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cblxuLnRlbXAsXG4uZGV0YWlscyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4udGVtcCBwOmZpcnN0LWNoaWxkIHtcbiAgZm9udC1zaXplOiAzcmVtO1xufVxuXG4udGVtcCBwOmxhc3QtY2hpbGQge1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cblxuLmRheS1mcmFtZSA6OmJlZm9yZSB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG5cbi5kZXRhaWxzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiAzcHg7XG59XG5cbi5kZXRhaWxzIHA6Zmlyc3QtY2hpbGQ6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICdyYWluOiAnO1xufVxuXG4uZGV0YWlscyBwOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcbiAgY29udGVudDogJ3dpbmQ6ICc7XG59XG5cbi5kZXRhaWxzIHA6bGFzdC1jaGlsZDo6YmVmb3JlIHtcbiAgY29udGVudDogJ2h1bWlkaXR5OiAnO1xufVxuXG4uaW1nIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZpbHRlcjogZ3JheXNjYWxlKDAuNSk7XG59XG5cbmltZyB7XG4gIHdpZHRoOiAxMDBweDtcbn1cblxuZm9vdGVyIHtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcbiAgcGFkZGluZzogNXB4IDA7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBsZXR0ZXItc3BhY2luZzogMC4ycmVtO1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cblxuLmNyZWRpdHMgYSB7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBjb2xvcjogaW5oZXJpdDtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBSUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLHNCQUFzQjtFQUN0QixvQ0FBb0M7RUFDcEMsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHNDQUFzQztFQUN0QyxpQ0FBaUM7RUFDakMsZ0RBQWdEO0FBQ2xEOztBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLG9DQUFvQztFQUNwQyxtREFBbUQ7QUFDckQ7O0FBRUE7RUFDRSx5Q0FBeUM7RUFDekMsNEJBQTRCOztFQUU1QixhQUFhO0VBQ2IsdUJBQXVC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Q0Y7O0FBRUE7RUFDRSx5Q0FBeUM7RUFDekMsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsU0FBUztBQUNYOztBQUVBO0VBQ0UsV0FBVzs7RUFFWCxzREFBc0Q7RUFDdEQsNkJBQTZCO0VBQzdCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBOztFQUVFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFFBQVE7QUFDVjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsMkNBQTJDO0VBQzNDLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsc0JBQXNCOztFQUV0QixhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLGNBQWM7QUFDaEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RE0rU2VyaWYrRGlzcGxheSZmYW1pbHk9UnVmaW5hOndnaHRANzAwJmRpc3BsYXk9c3dhcCcpO1xcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU9wZW4rU2FucyZmYW1pbHk9UnVmaW5hOndnaHRANzAwJmRpc3BsYXk9c3dhcCcpO1xcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUVCK0dhcmFtb25kOndnaHRANTAwJmRpc3BsYXk9c3dhcCcpO1xcblxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIHNhbnMtc2VyaWY7XFxuICAvKiBvdXRsaW5lOiAxcHggc29saWQgcmVkOyAqL1xcbn1cXG5cXG46cm9vdCB7XFxuICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbjpyb290LmxpZ2h0IHtcXG4gIC0tYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMjQyLCAyMzIpO1xcbiAgLS1jb250cmFzdC1jb2xvcjogcmdiKDI2LCAyOCwgMjYpO1xcbiAgLS1zZWFyY2gtYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNiwgMjgsIDI2LCAwLjEpO1xcbn1cXG5cXG46cm9vdC5kYXJrIHtcXG4gIC0tYmFja2dyb3VuZC1jb2xvcjogcmdiKDI2LCAyOCwgMjYpO1xcbiAgLS1jb250cmFzdC1jb2xvcjogcmdiKDI0NSwgMjQyLCAyMzIpO1xcbiAgLS1zZWFyY2gtYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDUsIDI0MiwgMjMyLCAwLjEpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xcbiAgY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYm9keS5mdWxsLXZpZXcge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgobWluLWNvbnRlbnQsIDExMDBweCk7XFxufVxcblxcbmJvZHkubmFycm93LXZpZXcge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgobWluLWNvbnRlbnQsIDYwMHB4KTtcXG4gIC50aXRsZS1jb250YWluZXIge1xcbiAgICBmb250LXNpemU6IDUwcHg7XFxuICB9XFxufVxcblxcbi5wYWdlLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgcGFkZGluZzogMCAxMHB4O1xcblxcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDUsIG1pbi1jb250ZW50KTtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnRpdGxlLWNvbnRhaW5lcixcXG4uY29udGVudC1jb250YWluZXIsXFxuZm9vdGVyIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG4udGl0bGUtY29udGFpbmVyIHtcXG4gIGZvbnQtc2l6ZTogNXJlbTtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XFxufVxcblxcbi50aXRsZS1jb250YWluZXIsXFxuZm9vdGVyICosXFxuLnVuaXQtdG9nZ2xlICoge1xcbiAgZm9udC1mYW1pbHk6ICdSdWZpbmEnLCBzZXJpZjtcXG59XFxuXFxuLm1lbnUtY29udGFpbmVyIHtcXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xcblxcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5tZW51LWNvbnRhaW5lci5mdWxsLXZpZXcge1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxNDBweCBtaW5tYXgoMjAwcHgsIDMwJSkgMTQwcHg7XFxufVxcblxcbi5tZW51LWNvbnRhaW5lci5uYXJyb3ctdmlldyB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbi1jb250ZW50IG1pbi1jb250ZW50O1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG87XFxuICBjb2x1bW4tZ2FwOiAzMHB4O1xcbiAgcm93LWdhcDogMTBweDtcXG4gIG1heC13aWR0aDogNDAwcHg7XFxuXFxuICA+IC50aGVtZS10b2dnbGUge1xcbiAgICBncmlkLXJvdzogMi8zO1xcbiAgfVxcbiAgPiBmb3JtIHtcXG4gICAgZ3JpZC1jb2x1bW46IDEvMztcXG4gIH1cXG4gID4gLnVuaXQtdG9nZ2xlIHtcXG4gICAgZ3JpZC1yb3c6IDIvMztcXG4gIH1cXG59XFxuXFxuLm1lbnUtY29udGFpbmVyLFxcbmZvb3RlciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGp1c3RpZnktc2VsZjogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLnRoZW1lLXRvZ2dsZS5zd2l0Y2gge1xcbiAgd2lkdGg6IDU3cHg7XFxufVxcblxcbi51bml0LXRvZ2dsZS5zd2l0Y2gge1xcbiAgd2lkdGg6IDE0MHB4O1xcbn1cXG5cXG4udGhlbWUtdG9nZ2xlLnNsaWRlciB7XFxuICB3aWR0aDogMjJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdvbGRlbnJvZDtcXG59XFxuXFxuLnVuaXQtdG9nZ2xlLnNsaWRlciB7XFxuICB3aWR0aDogNzBweDtcXG59XFxuXFxuLm1ldHJpYyxcXG4uaW1wZXJpYWwge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA2cHg7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG4gIGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uaW1wZXJpYWwge1xcbiAgbGVmdDogMTRweDtcXG59XFxuXFxuLm1ldHJpYyB7XFxuICByaWdodDogMTBweDtcXG59XFxuXFxuLnN3aXRjaCB7XFxuICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbWFyZ2luOiAzcHg7XFxuICBoZWlnaHQ6IDMzcHg7XFxufVxcblxcbi5zd2l0Y2gsXFxuLnNsaWRlciB7XFxuICBib3JkZXItcmFkaXVzOiAzMHB4O1xcbn1cXG5cXG5pbnB1dFt0eXBlPSdjaGVja2JveCddIHtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uc2xpZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogM3B4O1xcbiAgbGVmdDogNHB4O1xcbiAgdHJhbnNpdGlvbjogMzAwbXM7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBoZWlnaHQ6IDIycHg7XFxufVxcblxcbmlucHV0W3R5cGU9J2NoZWNrYm94J106Y2hlY2tlZCB7XFxuICArIC50aGVtZS10b2dnbGUuc2xpZGVyIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMjNweCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAtOHB4IDAgMHB4IDBweCByZ2IoMTE2LCAxNTQsIDIyNCk7XFxuICB9XFxuICArIC51bml0LXRvZ2dsZS5zbGlkZXIge1xcbiAgICB3aWR0aDogNTVweDtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNzNweCk7XFxuICB9XFxufVxcblxcbmZvcm0ge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuaW5wdXRbdHlwZT0ndGV4dCddIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcXG4gIHBhZGRpbmc6IDdweCAxNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2VhcmNoLWJhY2tncm91bmQtY29sb3IpO1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIGNvbG9yOiB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuXFxuICBmbGV4OiAxO1xcbn1cXG5cXG5pbnB1dFt0eXBlPSd0ZXh0J106Zm9jdXMge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgb3V0bGluZTogMnB4IHNvbGlkIGNvcm5mbG93ZXJibHVlO1xcbn1cXG5cXG5mb3JtIGJ1dHRvbiB7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMzVweDtcXG4gIHpvb206IDE3JTtcXG4gIHRyYW5zaXRpb246IDMwMG1zO1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgem9vbTogMTglO1xcbn1cXG5cXG4uZGF0ZS1jb250YWluZXIge1xcbiAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHZhcigtLWNvbnRyYXN0LWNvbG9yKTtcXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAycHg7XFxuICB3aWR0aDogMTAwJTtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiA1MHB4O1xcbn1cXG5cXG4uZGF0ZS1jb250YWluZXIgKiB7XFxuICBmb250LWZhbWlseTogJ0VCIEdhcmFtb25kJywgc2VyaWY7XFxuICBsZXR0ZXItc3BhY2luZzogMC4ycmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LXNpemU6IDAuOHJlbTtcXG59XFxuXFxuLmNvbnRlbnQtYmFja2dyb3VuZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbjogMzBweCAwO1xcbn1cXG5cXG4uY29udGVudC1jb250YWluZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxcHg7XFxufVxcblxcbi5jb250ZW50LWNvbnRhaW5lci5mdWxsLXZpZXcge1xcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIyMHB4LCAxZnIpKTtcXG59XFxuXFxuLmNvbnRlbnQtY29udGFpbmVyLm5hcnJvdy12aWV3IHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoYXV0by1maXQsIG1pbi1jb250ZW50KTtcXG4gIG1hcmdpbjogLTMwcHggMDtcXG5cXG4gID4gLmRheS1mcmFtZSB7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICB9XFxufVxcblxcbi5kYXktZnJhbWUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XFxuICBwYWRkaW5nOiAwIDMwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAxNXB4O1xcbn1cXG5cXG4uZGF5LWZyYW1lLm5hcnJvdy12aWV3IHtcXG4gIHdpZHRoOiAxMDAlO1xcblxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDE1MHB4LCAyMDBweCkpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG87XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDE1cHg7XFxufVxcblxcbi50aXRsZSBoMyB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuLnRlbXAsXFxuLmRldGFpbHMge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi50ZW1wIHA6Zmlyc3QtY2hpbGQge1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbn1cXG5cXG4udGVtcCBwOmxhc3QtY2hpbGQge1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG4uZGF5LWZyYW1lIDo6YmVmb3JlIHtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxufVxcblxcbi5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDNweDtcXG59XFxuXFxuLmRldGFpbHMgcDpmaXJzdC1jaGlsZDo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdyYWluOiAnO1xcbn1cXG5cXG4uZGV0YWlscyBwOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICd3aW5kOiAnO1xcbn1cXG5cXG4uZGV0YWlscyBwOmxhc3QtY2hpbGQ6OmJlZm9yZSB7XFxuICBjb250ZW50OiAnaHVtaWRpdHk6ICc7XFxufVxcblxcbi5pbWcge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmlsdGVyOiBncmF5c2NhbGUoMC41KTtcXG59XFxuXFxuaW1nIHtcXG4gIHdpZHRoOiAxMDBweDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCB2YXIoLS1jb250cmFzdC1jb2xvcik7XFxuICBwYWRkaW5nOiA1cHggMDtcXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5jcmVkaXRzIGEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGVzLmNzcyc7XG5pbXBvcnQgJy4vZGF0YSc7XG5pbXBvcnQgJy4vZm9ybURPTSc7XG5pbXBvcnQgJy4vZGF0ZURPTSc7XG5pbXBvcnQgJy4vdG9nZ2xlVGhlbWVET00nO1xuaW1wb3J0ICcuL3RvZ2dsZVVuaXRET00nO1xuaW1wb3J0ICcuL3ZpZXdNb2RlRE9NJztcbiJdLCJuYW1lcyI6WyJnZXRVbml0cyIsInJldHVybkRhdGEiLCJjdXJyZW50RGF0YUFyciIsImdlbmVyYXRlRGF5Q29udGVudCIsIm9iaiIsImluZGV4IiwiZnJhbWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkYXlQYXJhIiwiY29uZGl0aW9uUGFyYSIsImltZyIsIm1heFRlbXBQYXJhIiwibWluVGVtcFBhcmEiLCJwcmVjaXBQYXJhIiwid2luZFBhcmEiLCJodW1pZGl0eVBhcmEiLCJ1bml0c1R5cGUiLCJ0ZW1wVW5pdCIsInByZWNpcFVuaXQiLCJ3aW5kVW5pdCIsInRleHRDb250ZW50IiwiY29uZGl0aW9uIiwibWF4VGVtcCIsIm1pblRlbXAiLCJ0b3RhbFByZWNpcCIsIm1heFdpbmQiLCJhdmdIdW1pZGl0eSIsInNyYyIsImltZ1VSTCIsImRpc3BsYXlXZWF0aGVyQ29udGVudCIsImZvckVhY2giLCJrZXkiLCJmb3JlY2FzdFVSTCIsImNpdHkiLCJzZXRDaXR5Iiwic3RyaW5nIiwiZ2V0Q2l0eSIsInVuaXRzIiwic2V0VW5pdHMiLCJmZXRjaEZvcmVjYXN0IiwicmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJkYXRhIiwianNvbiIsImUiLCJjb25zb2xlIiwibG9nIiwicHJvY2Vzc0RhdGEiLCJmb3JlY2FzdCIsImZvcmVjYXN0ZGF5IiwiZGF0YUFyciIsImRheU9iaiIsImRheURhdGEiLCJkYXkiLCJzaGFyZWREYXRhIiwidW5pdFNwZWNpZmljRGF0YSIsInRleHQiLCJpY29uIiwiYXZnaHVtaWRpdHkiLCJkYXRlIiwibWF4dGVtcF9mIiwibWludGVtcF9mIiwidG90YWxwcmVjaXBfaW4iLCJtYXh3aW5kX21waCIsIm1heHRlbXBfYyIsIm1pbnRlbXBfYyIsInRvdGFscHJlY2lwX21tIiwibWF4d2luZF9rcGgiLCJNYXRoIiwicm91bmQiLCJwdXNoIiwiRGF0ZSIsImRheXNBcnIiLCJtb250aHNBcnIiLCJmb3JlY2FzdERheVRpdGxlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkaXNwbGF5Rm9yZWNhc3REYXlPZlRoZVdlZWsiLCJleHRlbmRlZERheXNBcnIiLCJmaXJzdEZvcmNhc3REYXlJbmRleCIsImdldERheSIsImRheU5hbWVzIiwic2xpY2UiLCJ0aXRsZSIsInRpdGxlTm9kZSIsImRhdGVTcGFuIiwiZGlzcGxheVRvZGF5c0RhdGUiLCJkYXlPZlRoZVdlZWsiLCJ0b1VwcGVyQ2FzZSIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXlPZlRoZU1vbnRoIiwiZ2V0RGF0ZSIsInllYXIiLCJnZXRGdWxsWWVhciIsImRpc3BsYXlDaXR5IiwiU2VhcmNoIiwiZm9ybSIsImlucHV0Iiwic2VhcmNoQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsInJlc2V0IiwiZGlzcGxheVNlYXJjaEljb24iLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJ0aXRsZUNvbnRhaW5lciIsInRoZW1lVG9nZ2xlIiwicm9vdCIsInRvZ2dsZVRoZW1lIiwiY2hlY2tlZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInVuaXRUb2dnbGUiLCJ0b2dnbGVVbml0cyIsImJvZHkiLCJtZW51Q29udGFpbmVyIiwiY29udGVudENvbnRhaW5lciIsImRheUZyYW1lcyIsInRvZ2dsZVZpZXdNb2RlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImNvbnRhaW5lciJdLCJzb3VyY2VSb290IjoiIn0=