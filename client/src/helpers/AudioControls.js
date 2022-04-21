let intervalID;
let timingInterval = 300;

export function update(video) {
  updateProgress(video);
}

export function updateTracks() {
  let video = document.getElementById('video-player');
  let track = video.textTracks[0];
  if (!video || !track) return;

  let textCues = JSON.parse(window.localStorage.getItem('Text Cues'));
  
  // When there is a timing change, strip all text cues and replace them with new ones
  let localCues = Array.from(track.cues);
  localCues.forEach(cue => track.removeCue(cue));

  for (var lyric in textCues) {
    let textCueProperties = textCues[lyric];
    if (!textCueProperties.startIndex || !textCueProperties.endIndex) continue;
    track.addCue(new VTTCue(textCueProperties.startIndex, textCueProperties.endIndex, lyric));
  }
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