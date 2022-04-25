import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleVideo, updateIndex, updateProgress } from '../../helpers/AudioControls';
import { removeMultiple, toggleMultiple } from '../../helpers/Generic';
import './Player.css';

let video, slider;
let playerInterval = 2;

function initializeProgress() {
  if (!slider || !video) return;
  slider.setAttribute('max', Math.round(video.duration));
  slider.value = 0;
  video.currentTime = 0;
}

function keyControls(e, dispatch) {
  if (!video.src) return;
  let textCues = Array.from(JSON.parse(window.localStorage.getItem('Text Cues') || '[]'));
  let index = parseInt(window.localStorage.getItem('User Index') || 0);

  switch (e.key.toUpperCase()) {
    case 'J':
      if (video.currentTime - playerInterval >= 0) video.currentTime -= playerInterval;
      else video.currentTime = 0;
      updateProgress(video);
      break;
    case 'K':
      toggleVideo(video, dispatch);
      break;
    case 'L':
      if (video.currentTime + playerInterval <= video.duration) video.currentTime += playerInterval;
      else video.currentTime = video.duration;
      updateProgress(video);
      break;
    case 'S':
      // Set the time for the current index
      textCues[index] = {
        ...textCues[index],
        beginIndex: parseFloat(video.currentTime.toFixed(2))
      }

      window.localStorage.setItem('Text Cues', JSON.stringify(textCues));
      window.localStorage.setItem('User Index', index + 1);
      dispatch({ type: 'UPDATE_USER_INDEX', payload: index + 1 });
      break;
    case 'T':
      if (!(index < textCues.length)) return;
      video.currentTime = textCues[index].beginIndex;
      updateProgress(video);
      break;
    case 'R':
      initializeProgress();
      break;
    case 'F':
      // Toggle full screen
      let videoContainer = document.getElementById('video-container');
      let sidebarContainer = document.getElementById('sidebar');
      if (!videoContainer || !sidebarContainer) return;
      toggleMultiple(videoContainer, ['video-mw', 'video-fw']);
      sidebarContainer.classList.toggle('hidden');
      break;
    default:
      break;
  };
}

function removeVolumeIcons(volume, setMuteStatus) {
  let volumeIcons = ['fa-volume-xmark', 'fa-volume-low', 'fa-volume-high'];
  let element = document.getElementById('volume-icon');
  if (!element) return;
  removeMultiple(element, volumeIcons);

  if (volume <= 0) {
    element.classList.add('fa-volume-xmark');
    setMuteStatus(true);
  }
  else if (volume <= 0.4) element.classList.add('fa-volume-low');
  else element.classList.add('fa-volume-high');
}

export default function Player() {
  const { file, index } = useSelector(state => state.videoSlice);
  const [muteStatus, setMuteStatus] = useState(false);
  const dispatch = useDispatch();

  let activeTab = window.localStorage.getItem('Lyric Tab') || 'Translation';
  let localTranslation = (window.localStorage.getItem(activeTab) || '').split('\n');

  useEffect(() => {
    window.addEventListener('keypress', (e) => keyControls(e, dispatch));
    
    // Cleanup function
    return () => {
      window.removeEventListener('keypress', (e) => keyControls(e, dispatch));
    }
  }, [])

  useEffect(() => {
    video = document.getElementById('video-player');
    slider = document.getElementById('video-slider');
    if (!video || !file) return;

    video.src = URL.createObjectURL(file);
    video.volume = window.localStorage.getItem('Volume') / 100 || 0.2;
    video.addEventListener('loadedmetadata', initializeProgress);

    // Cleanup function
    return () => {
      video.removeEventListener('loadedmetadata', initializeProgress);
    }
  }, [file]);

  useEffect(() => {
    let subtitle = document.getElementById('subtitle');

    // Index has not updated yet, ignore initial render
    if (index === -1) {
      subtitle.classList.add('hidden');
      return;
    }

    if (subtitle.classList.contains('hidden')) subtitle.classList.remove('hidden');
    subtitle.textContent = localTranslation[index];
  }, [index])

  useEffect(() => {
    window.localStorage.setItem('Mute Status', muteStatus);
  }, [muteStatus])

  return (
    <div id='video-container' className='flex center video-mw'>
      <div className='video-subcontainer'>
        <video id='video-player'></video>
        <p id='subtitle' className='lyric-container hidden'>No video has been loaded yet.</p>
      </div>
      {file && 
      <>
        <div className='audio-controls'>
          <input id='video-slider' className='slider' type='range' min='0' defaultValue='0' onInput={(e) => {
            if (!video) return;
            video.currentTime = e.target.value;
            updateIndex(video, dispatch);
          }}></input>
          <i id='video-button' className="fa-solid fa-play fa-width fa-xl pointer" onClick={() => toggleVideo(video, dispatch)}></i>
          <div id='volume-container' className='flex center'>
            <i id='volume-icon' className="fa-solid fa-volume-low fa-width fa-xl pointer" onClick={() => {
              // Mute video on click
              let currentVolume = muteStatus ? parseInt(window.localStorage.getItem('Volume')) || 20 : 0;
              removeVolumeIcons(currentVolume / 100, setMuteStatus);
              video.volume = currentVolume / 100;
              document.getElementById('volume-slider').value = currentVolume;

              setMuteStatus(!muteStatus);
            }}></i>
            <input id='volume-slider' className='slider' type='range' min='0' max='100' defaultValue={window.localStorage.getItem('Volume') || '20'} onInput={(e) => {
              if (!video) return;
              video.volume = e.target.value / 100;
              window.localStorage.setItem('Volume', e.target.value);
              removeVolumeIcons(video.volume, setMuteStatus);
            }}></input>
          </div>
        </div>
      </>}
    </div>
  );
}