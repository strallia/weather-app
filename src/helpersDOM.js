const appendChildren = (parentNode, childrenArr) => {
  childrenArr.forEach((child) => parentNode.appendChild(child));
};

export { appendChildren };
