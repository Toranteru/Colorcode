export function activateTab(tab) {
  let element = document.getElementById(tab);
  if (!element) return;
  element.classList.add('active');
}

// Iterate through each tab and deactivate them
export function disableTabs(tabs) {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
}

export function setTab(className, index) {
  let element = document.getElementById(index);
  if (!element) return;

  Array.from(document.getElementsByClassName(className)).forEach(option => option.classList.remove('active'));
  element.classList.add('active');
}