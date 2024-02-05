const menuContainer = document.querySelector('.menu-container');
const contentContainer = document.querySelector('.content-container');

window.addEventListener('resize', () => {
  if (window.innerWidth < 920) {
    menuContainer.classList.remove('full-view');
    menuContainer.classList.add('narrow-view');

    contentContainer.classList.remove('full-view');
    contentContainer.classList.add('narrow-view');
  } else {
    menuContainer.classList.add('full-view');
    menuContainer.classList.remove('narrow-view');

    contentContainer.classList.add('full-view');
    contentContainer.classList.remove('narrow-view');
  }
});
