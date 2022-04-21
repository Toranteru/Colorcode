let intervalID;
let timingInterval = 200;

function update(video) {
  updateProgress(video);
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

export function toggleVideo(video) {
  let button = document.getElementById('video-button');
  if (!video || !button) return;
  
  toggleButton(button);

  if (button.classList.contains('fa-play')) {
    video.pause();
  } else {
    video.play();
    intervalID = setInterval(() => {
      update(video);
    }, timingInterval);
  }
}