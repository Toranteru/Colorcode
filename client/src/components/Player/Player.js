import React from 'react';
import './Player.css';

// <input id='video-slider' className='hidden' type='range' min='0'></input> 

export default function Player() {
  return (
    <div className='video-container flex center'>
      <video id='video-player'></video>
    </div>
  );
}
