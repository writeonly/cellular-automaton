import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Ant from './components/Ant';
import { AntState, CellState } from './types';

const GRID_SIZE = 101;

const App: React.FC = () => {
  const [grid, setGrid] = useState<CellState[][]>(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0))
  );

  const [ant, setAnt] = useState<AntState>({
    x: Math.floor(GRID_SIZE / 2),
    y: Math.floor(GRID_SIZE / 2),
    direction: 0
  });

  return (
    <div className="App">
      <h1>Langton's Ant with Multiple States</h1>
      <Grid grid={grid} ant={ant} />
      <Ant grid={grid} setGrid={setGrid} ant={ant} setAnt={setAnt} />
    </div>
  );
};

export default App;
