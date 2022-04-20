import React from 'react';
import './App.css';

import Sidebar from './components/sidebar/Sidebar';
import Player from './components/Player/Player';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Player />
    </div>
  );
}

export default App;