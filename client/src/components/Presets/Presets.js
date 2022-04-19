import React, { useEffect, useState } from 'react';
import { disableTabs, activateTab } from '../../helpers/TabControls';
import './Presets.css';

let sub_menu_tabs = document.getElementsByClassName('sub-menu-tab');

function generateSubMenuContent(menuTab) {
  switch (menuTab) {
    default:
      return (
        <>No active menu tab was selected!</>
      )
  }
}

export default function Presets() {
  const [activePresetTab, setActivePresetTab] = useState('Fonts');

  useEffect(() => {
    let presetTab = window.localStorage.getItem('Preset Tab');
    if (!presetTab) return;
    setActivePresetTab(presetTab);
  }, []);

  useEffect(() => {
    disableTabs(sub_menu_tabs);
    activateTab(activePresetTab);
    window.localStorage.setItem('Preset Tab', activePresetTab);
  }, [activePresetTab]);

  return (
    <>
      <div className='sub-sidebar-header flex'>
        <p id='Fonts' className='sub-menu-tab pointer' onClick={() => setActivePresetTab('Fonts')}>Fonts</p>
      </div>
      <div className='sidebar-content flex center'>
        {generateSubMenuContent(activePresetTab)}
      </div>
    </>
  )
}
