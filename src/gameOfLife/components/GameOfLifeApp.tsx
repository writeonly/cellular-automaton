import React, { useState, useEffect, useCallback } from 'react';
import '../../App.css';
import Grid from './Grid';
import { CellState } from '../types/CellState';

const GRID_SIZE = 20;

const generateEmptyGrid = (): CellState[][] =>
  Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));

const GameOfLifeApp: React.FC = () => {
  const [grid, setGrid] = useState<CellState[][]>(generateEmptyGrid);
  const [isRunning, setIsRunning] = useState(false);

  const countNeighbors = (x: number, y: number): number => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];
    return directions.reduce((count, [dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      return count + (grid[ny]?.[nx] || 0);
    }, 0);
  };

  const nextGeneration = useCallback(() => {
    setGrid((oldGrid) => {
      return oldGrid.map((row, y) =>
        row.map((cell, x) => {
          const neighbors = countNeighbors(x, y);
          if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
          if (cell === 0 && neighbors === 3) return 1;
          return cell;
        })
      );
    });
  }, [grid]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(nextGeneration, 500);
    return () => clearInterval(interval);
  }, [isRunning, nextGeneration]);

  const toggleCellState = (x: number, y: number) => {
    setGrid((oldGrid) => {
      const newGrid = oldGrid.map((row) => [...row]);
      newGrid[y][x] = oldGrid[y][x] ? 0 : 1;
      return newGrid;
    });
  };

  const resetGrid = () => setGrid(generateEmptyGrid);

  return (
    <div className="App">
      <h1>Game of Life</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={resetGrid}>Reset</button>
      <Grid grid={grid} toggleCellState={toggleCellState} />
    </div>
  );
};

export default GameOfLifeApp;
