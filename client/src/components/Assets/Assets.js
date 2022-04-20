import React from 'react'
import { useDispatch } from 'react-redux'

export default function Assets() {
  const dispatch = useDispatch();
  return (
    <>
      <input className='hidden' id='file' type='file'
        onChange={(e) => {
          dispatch({ type: 'UPDATE_VIDEO', payload: e.target.files[0] });
        }}
      ></input>
      <label className='assets-label pointer' htmlFor='file'>Upload video file here</label>
    </>
  )
}
