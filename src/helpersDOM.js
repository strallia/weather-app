const appendChildren = (parentNode, childrenArr) => {
  childrenArr.forEach((child) => parentNode.appendChild(child));
};

const clearContent = (nodeArr) => {
  nodeArr.forEach((node) => {
    const childNode = node;
    childNode.textContent = '';
  });
};

export { appendChildren, clearContent };
