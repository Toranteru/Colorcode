let timing = [];

// Post video / audio to the document
file_upload.addEventListener('change', () => {
  let file = file_upload.files[0];
  video_player.src = URL.createObjectURL(file);
  video_player.volume = 0.2;
  video_player.play();
  intervalID = setInterval(() => {
    updateProgress();
  }, 1000);
});

video_player.addEventListener('loadedmetadata', function() {
  initializeProgress();
  initializeHeight();
});

function initializeProgress() {
  // If a slider has not been created, set the element.
  if (!slider) slider = document.createElement('input');

  slider.type = 'range';
  slider.id = 'video-slider';
  slider.value = 0;
  slider.setAttribute('min', 0);
  slider.setAttribute('max', Math.round(video_player.duration));

  slider.addEventListener('input', () => {
    video_player.currentTime = slider.value;
  });
  video_container.appendChild(slider);
}

function initializeHeight() {
  let getStyle = window.getComputedStyle(video_player);
  let height = parseInt(getStyle.height);

  lyrics_container.style.height = `${window.innerHeight - height}px`;
}

function updateLyrics(tab, element) {
  if (window.localStorage.getItem(tab)) {
    let lyrics = Array.from(JSON.parse(window.localStorage.getItem(tab)));
    document.getElementById(element).textContent = lyrics[0];
  }
}

function updateProgress() {
  slider.value = Math.floor(video_player.currentTime);
}

window.addEventListener('resize', () => {
  initializeHeight();
});

initializeHeight();