const body = document.querySelector('body');
const menuContainer = document.querySelector('.menu-container');
const contentContainer = document.querySelector('.content-container');
const dayFrames = document.querySelectorAll('.day-frame');

const toggleViewMode = () => {
  if (window.innerWidth < 920) {
    [body, menuContainer, contentContainer, ...dayFrames].forEach(
      (container) => {
        container.classList.remove('full-view');
        container.classList.add('narrow-view');
      },
    );
  } else {
    [body, menuContainer, contentContainer, ...dayFrames].forEach(
      (container) => {
        container.classList.add('full-view');
        container.classList.remove('narrow-view');
      },
    );
  }
};
toggleViewMode();

window.addEventListener('resize', toggleViewMode);
