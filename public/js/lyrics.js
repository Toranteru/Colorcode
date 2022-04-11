const lyric_upload = document.getElementById('lyric-upload');
const lyric_tabs = document.getElementsByClassName('lyric-tab');

const file_upload = document.getElementById('file-upload');
const video_container = document.getElementById('video-container');
const video_player = document.getElementById('video-player');
const lyric_container = document.getElementById('lyric-container');
const lyrics_container = document.getElementById('lyrics-container');

const timing_container = document.getElementById('timing-container');

// Define constants for lyrics that appear below the video
const video_lyrics = document.getElementById('video-lyrics');
const video_romanization = document.getElementById('video-romanization');
const video_translation = document.getElementById('video-translation');

const side_bar = document.getElementById('sidebar');

let tab = window.localStorage.getItem('activeTab');
let slider;
let intervalID;

// Initialization function on page render
function init() {
  disableTabs();
  retrieveLyrics(tab);
  // Retrieve current active tab from local storage and set it to active
  document.getElementById(window.localStorage.getItem('activeTab')).classList.add('active');

  Array.from(lyric_tabs).forEach(lyric_tab => {
    lyric_tab.addEventListener('click', (e) => {
      disableTabs();
      e.currentTarget.classList.add('active');
      tab = e.currentTarget.id;
      retrieveLyrics(tab);
      window.localStorage.setItem('activeTab', tab);
    });
  })
}

// Iterate through each lyric tab and deactivate them
function disableTabs() {
  for (let i = 0; i < lyric_tabs.length; i++) {
    lyric_tabs[i].classList.remove('active');
  }
}

function retrieveLyrics(tab) {
  lyric_upload.value = '';
  timing_container.innerHTML = '';
  if (!(window.localStorage.getItem(tab))) return;
  let current_lyrics = Array.from(JSON.parse(window.localStorage.getItem(tab)));
  current_lyrics.forEach(lyric_line => {
    lyric_upload.value += lyric_line + '\n';
    let lyric_timing_value = document.createElement('input');
    lyric_timing_value.setAttribute('min', 0);
    lyric_timing_value.type = 'number';
    lyric_timing_value.style.width = '40px';
    lyric_timing_value.style.height = '16px';
    let lyric_timing_container = document.createElement('div');
    let lyric_timing_line = document.createTextNode(lyric_line);
    lyric_timing_container.appendChild(lyric_timing_value);
    lyric_timing_container.appendChild(lyric_timing_line);
    timing_container.appendChild(lyric_timing_container);
  });
}

// Store changes into local storage
lyric_upload.addEventListener('change', () => {
  let lyrics = lyric_upload.value.split('\n');
  window.localStorage.setItem(tab, JSON.stringify(lyrics));
})

init();