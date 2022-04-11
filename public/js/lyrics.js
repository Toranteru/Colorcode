const lyric_upload = document.getElementById('lyric-upload');
const lyric_tabs = document.getElementsByClassName('lyric-tab');

let tab = 'Lyrics';

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
  if (!(window.localStorage.getItem(tab))) return;
  let current_lyrics = Array.from(JSON.parse(window.localStorage.getItem(tab)));
  current_lyrics.forEach(lyric_line => lyric_upload.value += lyric_line + '\n');
}

// Store changes into local storage
lyric_upload.addEventListener('change', () => {
  let lyrics = lyric_upload.value.split('\n');
  window.localStorage.setItem(tab, JSON.stringify(lyrics));
})

init();