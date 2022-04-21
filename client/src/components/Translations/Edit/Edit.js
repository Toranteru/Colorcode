import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Edit.css';

export default function Edit(props) {
  let { translations } = props;

  function generateEditConfiguration() {
    if (!translations) return;
    let textCues = Array.from(JSON.parse(window.localStorage.getItem('Text Cues') || '[]'));
    
    let options = translations.split('\n').map((translation, index) => {
      return (
        <div key={uuidv4()} className='option flex'>
          <div className='index-container flex center'>
            <input className='index' type='number' defaultValue={textCues[index] ? textCues[index].beginIndex || 0 : 0} onChange={(e) => {
              textCues[index] = {
                ...textCues[index],
                beginIndex: e.target.value
              }
              window.localStorage.setItem('Text Cues', JSON.stringify(textCues));
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
