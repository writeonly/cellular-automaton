import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Ant from './components/Ant';
import AntConfig from './components/AntConfig';
import { AntState } from './types/AntState';

const GRID_SIZE = 151;

const App: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(
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
      <div style={{ display: 'flex' }}>
        <div>
          <h1>Langton's Ant with Multiple States</h1>
          <AntConfig onStart={handleStart} />
          <Ant
            turnRules={turnRules}
            cellStates={turnRules.length}
            gridSize={GRID_SIZE}
            grid={grid}
            setGrid={setGrid}
            ant={ant}
            setAnt={setAnt}
          />
        </div>
        <Grid cellStates={turnRules.length} grid={grid} ant={ant} />
      </div>
    </div>
  );
};

export default App;
