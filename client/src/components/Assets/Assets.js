import React from 'react'

export default function Assets() {
  function setVideo(video) {
    let element = document.getElementById('video-player');
    if (!element) return;

    element.src = URL.createObjectURL(video);
    element.volume = 0.1;
    element.play();
  }

  return (
    <>
      <input className='hidden' id='file' type='file'
        onChange={(e) => setVideo(e.target.files[0])}
      ></input>
      <label className='assets-label pointer' htmlFor='file'>Upload video file here</label>
    </>
  )
}
