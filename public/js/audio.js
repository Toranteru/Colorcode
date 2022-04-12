let timing = [];

// Post video / audio to the document
file_upload.addEventListener('change', () => {
  let file = file_upload.files[0];
  video_player.src = URL.createObjectURL(file);
  video_player.volume = 0.2;
  video_player.play();
  intervalID = setInterval(() => {
    update();
  }, timing_interval);
});

video_player.addEventListener('loadedmetadata', function() {
  initializeProgress();
  initializeHeight();
});

function update() {
  updateProgress();
  updateLyrics();
}

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
    updateIndex(0);
    update();
  });
  video_container.appendChild(slider);
}

function initializeHeight() {
  let getStyle = window.getComputedStyle(video_player);
  let height = parseInt(getStyle.height);

  lyrics_container.style.height = `${window.innerHeight - height}px`;
}

function updateLyrics() {
  let lyric_categories = ['Lyrics', 'Romanization', 'Translation'];
  updateIndex(lyricIndex);
  lyric_categories.forEach(category => {
    let storage = window.localStorage.getItem(category);
    if (storage) {
      let lyrics = Array.from(JSON.parse(storage));
      document.getElementById('video-' + category.toLowerCase()).innerText = lyrics[lyricIndex];
    }
  })
}

function updateIndex(startingIndex) {
  let index = startingIndex;
  while (index + 1 < timingArray.length && timingArray[index + 1] <= video_player.currentTime) {
    index++;
  }
  lyricIndex = index;
}

function updateProgress() {
  slider.value = Math.floor(video_player.currentTime);
}

window.addEventListener('resize', () => {
  initializeHeight();
});

initializeHeight();