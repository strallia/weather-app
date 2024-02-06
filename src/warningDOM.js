const warningLabel = document.querySelector('.warning-label');

const displayWarningLabel = () => {
  warningLabel.classList.remove('hidden');
};

const hideWarningLabel = () => {
  warningLabel.classList.add('hidden');
};

export { displayWarningLabel, hideWarningLabel };
