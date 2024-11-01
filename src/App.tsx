import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from './components/Grid';
import { AntState, CellState, Direction } from './types';

const DIRECTIONS: Direction[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
];

const GRID_SIZE = 101;

const flags: boolean[] = [true, false];

const MAX_CELL_STATES = flags.length;

const App: React.FC = () => {
  const [grid, setGrid] = useState<CellState[][]>(
    Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0))
  );

  const [ant, setAnt] = useState<AntState>({
    x: Math.floor(GRID_SIZE / 2),
    y: Math.floor(GRID_SIZE / 2),
    direction: 0
  });

  const moveAnt = () => {
    setGrid((oldGrid) => {
      const newGrid = oldGrid.map(row => [...row]);
      const { x, y, direction } = ant;
      const currentCell = newGrid[y][x];

      newGrid[y][x] = (currentCell + 1) % MAX_CELL_STATES;

      const newDirection = (direction + (flags[currentCell % 2] ? 1 : -1) + 4) % 4;

      const newX = (x + DIRECTIONS[newDirection].x + GRID_SIZE) % GRID_SIZE;
      const newY = (y + DIRECTIONS[newDirection].y + GRID_SIZE) % GRID_SIZE;

      setAnt({ x: newX, y: newY, direction: newDirection });
      return newGrid;
    });
  };

  useEffect(() => {
    const interval = setInterval(moveAnt, 1);
    return () => clearInterval(interval);
  }, [ant]);

  return (
    <div className="App">
      <h1>Langton's Ant with Multiple States</h1>
      <Grid grid={grid} ant={ant} />
    </div>
  );
};

export default App;
