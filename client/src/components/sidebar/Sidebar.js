import React, { useEffect, useState } from 'react';

import { disableTabs, activateTab } from '../../helpers/TabControls';
import './Sidebar.css';

import Assets from '../Assets/Assets';
import Translations from '../Translations/Translations';
import Presets from '../Presets/Presets';

let menu_tabs = document.getElementsByClassName('menu-tab');

function generateMenuContent(menuTab) {
  switch (menuTab) {
    case 'Assets':
      return (
        <Assets />
      );
    case 'Translations':
      return (
        <Translations />
      );
    case 'Presets':
      return (
        <Presets />
      );
    default:
      return (
        <>No active menu tab was selected!</>
      )
  }
}

export default function Sidebar() {
  const [activeMenuTab, setActiveMenuTab] = useState('Assets');

  useEffect(() => {
    let menuTab = window.localStorage.getItem('Active Tab');
    if (!menuTab) return;
    setActiveMenuTab(menuTab);
  }, []);

  useEffect(() => {
    disableTabs(menu_tabs);
    activateTab(activeMenuTab);
    window.localStorage.setItem('Active Tab', activeMenuTab);
  }, [activeMenuTab]);

  return (
    <div className='sidebar flex center'>
      <div className='sidebar-container'>
        <div className='sidebar-header flex'>
          <p id='Assets' className='menu-tab pointer' onClick={() => setActiveMenuTab('Assets')}>Assets</p>
          <p id='Translations' className='menu-tab pointer' onClick={() => setActiveMenuTab('Translations')}>Translations</p>
          <p id='Presets' className='menu-tab pointer' onClick={() => setActiveMenuTab('Presets')}>Presets</p>
        </div>
        <div className='sidebar-content flex center'>
          {generateMenuContent(activeMenuTab)}
        </div>
      </div>
    </div>
  )
}
