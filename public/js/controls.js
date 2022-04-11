window.addEventListener('keypress', (e) => {
  switch (e.key.toUpperCase()) {
    case 'J':
      // Toggle UI
      // side_bar.classList.toggle('hidden');
      file_upload.classList.toggle('hidden');
      break;
    case 'P':
      // Toggle video player
      if (video_player.paused || video_player.ended) {
        video_player.play();
        intervalID = setInterval(() => {
          updateProgress();
        }, 1000);
      } else {
        video_player.pause();
        clearInterval(intervalID);
      }
      break;
    case 'R':
      video_player.currentTime = 0;
      break;
    case 'T':
      // Toggle timing UI
      lyric_container.classList.toggle('hidden');
      timing_container.classList.toggle('hidden');
      if (timing_container.classList.contains('hidden')) {
        lyric_container.style.width = '90%';
        timing_container.style.width = '0';
      } else {
        lyric_container.style.width = '0';
        timing_container.style.width = '90%';
      }
      // Refresh lyrics when toggled
      retrieveLyrics(tab);
      break;
    default:
      break;
  }
});