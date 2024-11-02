import React, { useState, useEffect, useCallback } from 'react';
import '../../App.css';
import Grid from './Grid';
import { CellState } from '../types/CellState';

const generateEmptyGrid = (size: number): CellState[][] =>
  Array.from({ length: size }, () => Array(size).fill(0));

const generateRandomGrid = (size: number): CellState[][] =>
  Array.from({ length: size }, () =>
    Array.from({ length: size }, () => (Math.random() < 0.5 ? 1 : 0))
  );

const GameOfLifeApp: React.FC = () => {
  const [gridSize, setGridSize] = useState(100);
  const [grid, setGrid] = useState<CellState[][]>(generateEmptyGrid(gridSize));
  const [isRunning, setIsRunning] = useState(false);

  const updateGridSize = (size: number) => {
    setGridSize(size);
    setGrid(generateEmptyGrid(size));
  };

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

  const createDigitSet = (numStr: string): Set<number> => {
    const digitSet = new Set<number>();
    for (const char of numStr) {
      const digit = Number(char);
      if (!isNaN(digit)) {
        digitSet.add(digit);
      }
    }
    return digitSet;
  };

  const rules = "23/3";
//   const rules = "456789/56789";
  const [toLive, toBorn] = rules.split("/").map(it => new Set(Array.from(it, Number)));

  const nextGeneration = useCallback(() => {
    setGrid((oldGrid) => {
      return oldGrid.map((row, y) =>
        row.map((cell, x) => {
          const neighbors = countNeighbors(x, y);
          if (cell === 1 && !toLive.has(neighbors)) return 0;
          if (cell === 0 && toBorn.has(neighbors)) return 1;
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

  const resetGrid = () => setGrid(generateEmptyGrid(gridSize));

  const generateRandomGridHandler = () => setGrid(generateRandomGrid(gridSize));

  return (
    <div className="App">
      <h1>Game of Life</h1>
      <div>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetGrid}>Reset</button>
        <button onClick={generateRandomGridHandler}>Generate Random Grid</button>
        <label>
          Grid Size:
          <input
            type="number"
            value={gridSize}
            onChange={(e) => updateGridSize(Number(e.target.value))}
            min="10"
            max="100"
          />
        </label>
      </div>
      <Grid grid={grid} toggleCellState={toggleCellState} />
    </div>
  );
};

export default GameOfLifeApp;
