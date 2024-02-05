const body = document.querySelector('body');
const menuContainer = document.querySelector('.menu-container');
const contentContainer = document.querySelector('.content-container');
const dayFrames = document.querySelectorAll('.day-frame');

window.addEventListener('resize', () => {
  if (window.innerWidth < 920) {
    body.classList.remove('full-view');
    body.classList.add('narrow-view');

    menuContainer.classList.remove('full-view');
    menuContainer.classList.add('narrow-view');

    contentContainer.classList.remove('full-view');
    contentContainer.classList.add('narrow-view');

    dayFrames.forEach((frame) => {
      frame.classList.remove('full-view');
      frame.classList.add('narrow-view');
    });
  } else {
    body.classList.add('full-view');
    body.classList.remove('narrow-view');

    menuContainer.classList.add('full-view');
    menuContainer.classList.remove('narrow-view');

    contentContainer.classList.add('full-view');
    contentContainer.classList.remove('narrow-view');

    dayFrames.forEach((frame) => {
      frame.classList.add('full-view');
      frame.classList.remove('narrow-view');
    });
  }
});
