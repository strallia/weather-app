const menuContainer = document.querySelector('.menu-container');

window.addEventListener('resize', () => {
  if (window.innerWidth < 920) {
    menuContainer.classList.remove('full-view');
    menuContainer.classList.add('narrow-view');

    // TODO: make content section vertical
  } else {
    menuContainer.classList.add('full-view');
    menuContainer.classList.remove('narrow-view');

    // TODO: make content section horizontal
  }
});
