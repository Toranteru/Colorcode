import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleVideo, updateIndex, updateProgress } from '../../helpers/AudioControls';
import './Player.css';

let video, slider;
let playerInterval = 2;

function initializeProgress() {
  if (!slider || !video) return;
  slider.setAttribute('max', Math.round(video.duration));
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
    default:
      break;
  };
}

export default function Player() {
  const { file, index } = useSelector(state => state.videoSlice);
  const dispatch = useDispatch();

  let localTranslation = window.localStorage.getItem('Translations').split('\n');

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

  return (
    <div className='video-container flex center'>
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
          <input id='volume-slider' className='slider' type='range' min='0' max='100' defaultValue={window.localStorage.getItem('Volume') || '20'} onInput={(e) => {
            if (!video) return;
            video.volume = e.target.value / 100;
            window.localStorage.setItem('Volume', e.target.value);
          }}></input>
        </div>
      </>}
    </div>
  );
}
