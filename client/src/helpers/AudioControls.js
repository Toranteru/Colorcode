let intervalID;
let timingInterval = 200;

function updateProgress(video) {
  let slider = document.getElementById('video-slider');
  if (!slider) return;
  slider.value = video.currentTime;
}

export function toggleVideo(video) {
  let button = document.getElementById('video-button');
  if (!video || !button) return;
  
  button.classList.toggle('fa-play');
  button.classList.toggle('fa-pause');

  if (button.classList.contains('fa-play')) {
    video.pause();
    clearInterval(intervalID);
  } else {
    video.play();
    intervalID = setInterval(() => {
      updateProgress(video);
    }, timingInterval);
  }
}