const image_view = document.getElementById('image-view');
const text_view = document.getElementById('text-view');

const view_divider = document.getElementById('view-divider');
const view_divider_slider = document.getElementById('view-divider-slider');
const member_upload = document.getElementById('member-upload');
const image_container = document.getElementById('image-container');

const member_names = document.getElementsByClassName('member-name');

const BUFFER = 2;

let images = [];

// Initialization function that runs on initial page render
function init() {
  renderViewHeight();
}

function renderImages() {
  if (!images) return;
  // Reset the contents of the image container
  image_container.innerHTML = '';

  images.forEach(image => {
    let member_container = document.createElement('div');
    member_container.classList.add('stack');
    member_container.appendChild(image.element);
    let name_container = document.createElement('div');
    name_container.classList.add('member-name');
    name_container.textContent = image.name;
    // member_container.appendChild(name_container);

    // Always apply at EOF
    image_container.appendChild(member_container);
  })
}

function renderViewHeight() {
  let getStyle = window.getComputedStyle(view_divider);
  let HEIGHT = window.innerHeight;
  let DIVIDER_HEIGHT = parseInt(getStyle.height);
  let TOP = parseInt(getStyle.top);

  image_view.style.height = `${TOP + BUFFER}px`;
  text_view.style.height = `${HEIGHT - (TOP + DIVIDER_HEIGHT)}px`;
}

init();