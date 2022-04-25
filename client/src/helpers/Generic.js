export function toggleMultiple(element, classNames) {
  classNames.forEach(className => element.classList.toggle(className));
}

export function removeMultiple(element, classNames) {
  classNames.forEach(className => element.classList.remove(className));
}