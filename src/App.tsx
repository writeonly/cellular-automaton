import React, { useState } from 'react';
import './App.css';
import AntApp from './ant/components/AntApp';
import GameOfLifeApp from './gameOfLife/components/GameOfLifeApp';

const App: React.FC = () => {
//       <AntApp />
  return (
    <div className="App">
      <GameOfLifeApp />
    </div>
  );
};

export default App;
