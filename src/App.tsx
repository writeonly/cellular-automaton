import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AntApp from './ant/components/AntApp';
import GameOfLifeApp from './gameOfLife/components/GameOfLifeApp';
import FlatWorldApp from './flatWorld/components/FlatWorldApp';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/ant">Langton's Ant</Link>
            </li>
            <li>
              <Link to="/game-of-life">Game of Life</Link>
            </li>
            <li>
              <Link to="/flat-world">Flat World</Link>
            </li>

          </ul>
        </nav>

        <Routes>
          <Route path="/ant" element={<AntApp />} />
          <Route path="/game-of-life" element={<GameOfLifeApp />} />
          <Route path="/flat-world" element={<FlatWorldApp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
