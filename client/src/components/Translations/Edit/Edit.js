import React from 'react';
import './Edit.css';

export default function Edit(props) {
  let { translations } = props;

  function generateEditConfiguration() {
    if (!translations) return;
    let options = translations.split('\n').map((translation, index) => {
      return (
        <div key={`option-${index}`} className='option'>{translation}</div>
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
