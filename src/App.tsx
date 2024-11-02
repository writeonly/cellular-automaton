import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Ant from './components/Ant';
import AntConfig from './components/AntConfig';
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

  const [turnRules, setTurnRules] = useState<string>('RL');

  const handleStart = (direction: number, turnRules: string) => {
    const cellStates = turnRules.length;
    setAnt({ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2), direction });
    setGrid(Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0)));
    setTurnRules(turnRules);
  };

  return (
    <div className="App">
      <h1>Langton's Ant with Multiple States</h1>
      <div style={{ display: 'flex' }}>
        <AntConfig onStart={handleStart} />
        <Grid grid={grid} ant={ant} cellStates={turnRules.length}/>
      </div>
      <Ant grid={grid} setGrid={setGrid} ant={ant} setAnt={setAnt} cellStates={turnRules.length} turnRules={turnRules} />
    </div>
  );
};

export default App;
