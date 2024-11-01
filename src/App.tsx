import React, { useState, useEffect } from 'react';
import './App.css';

interface Direction {
  x: number;
  y: number;
}

const DIRECTIONS: Direction[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
];

const GRID_SIZE = 101;

type CellState = 0 | 1;

interface AntState {
  x: number;
  y: number;
  direction: number;
}

const App: React.FC = () => {
  const [grid, setGrid] = useState<CellState[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
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

      newGrid[y][x] = currentCell === 0 ? 1 : 0;

      const newDirection = (direction + (currentCell === 0 ? 1 : -1) + 4) % 4;

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
      <h1>Langton's ant</h1>
      <div className="grid">
        {grid.map((row, y) => (
          <div key={y} className="row">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`cell ${cell === 1 ? 'active' : ''} ${ant.x === x && ant.y === y ? 'ant' : ''}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
