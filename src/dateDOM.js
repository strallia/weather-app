const date = new Date();

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dateSpan = document.querySelector('.date');

const displayTodaysDate = () => {
  const dayOfTheWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfTheMonth = date.getDate();
  const year = date.getFullYear();

  dateSpan.textContent = `${dayOfTheWeek}, ${month} ${dayOfTheMonth}, ${year}`;
};

displayTodaysDate();
