import React from 'react'

export default function Assets() {
  return (
    <>
      <input className='hidden' id='file' type='file'></input>
      <label className='assets-label pointer' htmlFor='file'>Upload video file here</label>
    </>
  )
}
