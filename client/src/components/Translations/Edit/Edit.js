import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { updateTracks } from '../../../helpers/AudioControls';

import './Edit.css';

export default function Edit(props) {
  let { translations } = props;

  function generateEditConfiguration() {
    if (!translations) return;
    let textCues = JSON.parse(window.localStorage.getItem('Text Cues') || '{}');
    
    let options = translations.split('\n').map(translation => {
      return (
        <div key={uuidv4()} className='option flex'>
          <div className='index-container flex center'>
            <input className='index' type='number' defaultValue={textCues[translation] ? textCues[translation].startIndex || '0' : '0'} onChange={(e) => {
              textCues[translation] = {
                ...textCues[translation],
                startIndex: e.target.value
              }
              window.localStorage.setItem('Text Cues', JSON.stringify(textCues));
              updateTracks();
            }}></input>
            <input className='index' type='number' defaultValue={textCues[translation] ? textCues[translation].endIndex || '0' : '0'} onChange={(e) => {
              textCues[translation] = {
                ...textCues[translation],
                endIndex: e.target.value
              }
              window.localStorage.setItem('Text Cues', JSON.stringify(textCues));
              updateTracks();
            }}></input>
          </div>
          <div className='lyric flex center'>
            {translation}
          </div>
        </div>
      );
    })
    return (
      <>
        {options}
      </>
    )
  };

  return (
    <div className='options-container flex'>
      {generateEditConfiguration()}
    </div>
  )
}
