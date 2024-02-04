const themeToggle = document.querySelector('input.theme-toggle');
const root = document.querySelector(':root');

const toggleDarkMode = () => {
  if (themeToggle.checked) {
    root.classList.remove('light');
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
};

themeToggle.addEventListener('click', toggleDarkMode);
