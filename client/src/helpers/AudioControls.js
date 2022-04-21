let intervalID;
let timingInterval = 300;

export function update(video, setIndex) {
  updateProgress(video);
  updateIndex(video, setIndex);
}

export function toggleVideo(video, setIndex) {
  let button = document.getElementById('video-button');
  if (!video || !button) return;

  toggleButton(button);

  if (button.classList.contains('fa-play')) {
    video.pause();
  } else {
    video.play();
    intervalID = setInterval(() => {
      update(video, setIndex);
    }, timingInterval);
  }
}

function updateIndex(video, setIndex) {
  let index = -1;
  let textCues = Array.from(JSON.parse(window.localStorage.getItem('Text Cues') || '[]'));

  // Make sure the index is not out of bounds
  while (index + 1 < textCues.length && textCues[index + 1].beginIndex && video.currentTime >= textCues[index + 1].beginIndex) index++;
  setIndex(index);
}

function updateProgress(video) {
  let slider = document.getElementById('video-slider');
  let button = document.getElementById('video-button');
  if (!slider || !button) return;
  slider.value = video.currentTime;

  if (video.ended || video.paused) {
    // Type guard
    if (video.ended) toggleButton(button);
    clearInterval(intervalID);
  }
}

function toggleButton(button) {
  button.classList.toggle('fa-play');
  button.classList.toggle('fa-pause');
}