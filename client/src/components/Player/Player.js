import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Player.css';

function init() {
  initializeProgress();
}

function initializeProgress() {
  let video = document.getElementById('video-player');
  let slider = document.getElementById('video-slider');
  if (!slider || !video) return;
  slider.setAttribute('max', Math.round(video.duration));
}

export default function Player() {
  const { file } = useSelector(state => state.videoSlice);

  useEffect(() => {
    let element = document.getElementById('video-player');
    if (!element || !file) return;

    element.src = URL.createObjectURL(file);
    element.volume = 0.2;
    element.play();
    element.addEventListener('loadedmetadata', init);
  }, [file]);

  return (
    <div className='video-container flex center'>
      <video id='video-player'></video>
      {file && 
      <>
        <div className='audio-controls'>
          <input id='video-slider' className='slider' type='range' min='0' defaultValue='0' onInput={(e) => {
              let video = document.getElementById('video-player');
              if (!video) return;
              video.currentTime = e.target.value;
          }}></input>
          <input id='volume-slider' className='slider' type='range' min='0' max='100' defaultValue='20' onInput={(e) => {
            let video = document.getElementById('video-player');
            if (!video) return;
            video.volume = e.target.value / 100;
          }}></input>
        </div>
      </>}
    </div>
  );
}
