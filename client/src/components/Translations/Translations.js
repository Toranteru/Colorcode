import React, { useEffect, useState } from 'react';

import { disableTabs, activateTab } from '../../helpers/TabControls';
import Edit from './Edit/Edit';
import './Translations.css';

let sub_menu_tabs = document.getElementsByClassName('sub-menu-tab');

export default function Translations() {
  const [activeTranslateTab, setActiveTranslateTab] = useState('Import');
  const [translations, setTranslations] = useState('');

  useEffect(() => {
    // Fetch information from local storage
    let translateTab = window.localStorage.getItem('Translate Tab');
    let translation = window.localStorage.getItem('Translations');

    if (translateTab) setActiveTranslateTab(translateTab);
    if (translation) setTranslations(translation);
  }, []);

  useEffect(() => {
    disableTabs(sub_menu_tabs);
    activateTab(activeTranslateTab);
    window.localStorage.setItem('Translate Tab', activeTranslateTab);
  }, [activeTranslateTab]);

  useEffect(() => {
    let element = document.getElementById('translation-container');
    if (!element) return;
    element.value = translations;
  }, [translations]);

function generateSubMenuContent(menuTab) {
  switch (menuTab) {
    case 'Import':
      return (
        <textarea
          id='translation-container'
          defaultValue={translations}
          onChange={(e) => {
            window.localStorage.setItem('Translations', e.target.value);
            setTranslations(e.target.value);
          }}
        ></textarea>
      );
    case 'Edit':
      return (
        <Edit translations={translations} />
      );
    default:
      return (
        <>No active menu tab was selected!</>
      )
  }
}

  return (
    <>
      <div className='sub-sidebar-header flex'>
        <p id='Import' className='sub-menu-tab pointer' onClick={() => setActiveTranslateTab('Import')}>Import</p>
        <p id='Edit' className='sub-menu-tab pointer' onClick={() => setActiveTranslateTab('Edit')}>Edit</p>
      </div>
      <div className='sub-sidebar-content flex center'>
        {generateSubMenuContent(activeTranslateTab)}
      </div>
    </>
  )
}
