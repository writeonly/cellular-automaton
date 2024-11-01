import React, { useEffect } from 'react';
import { AntState, CellState, Direction } from '../types';

const DIRECTIONS: Direction[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
];

const GRID_SIZE = 101;

interface AntProps {
  grid: CellState[][];
  setGrid: React.Dispatch<React.SetStateAction<CellState[][]>>;
  ant: AntState;
  setAnt: React.Dispatch<React.SetStateAction<AntState>>;
  cellStates: number;
  turnRules: string;
}

const Ant: React.FC<AntProps> = ({ grid, setGrid, ant, setAnt, cellStates, turnRules }) => {
  const moveAnt = () => {
    setGrid((oldGrid) => {
      const newGrid = oldGrid.map(row => [...row]);
      const { x, y, direction } = ant;
      const currentCell = newGrid[y][x];

      newGrid[y][x] = (currentCell + 1) % cellStates;

      const turnDirection = turnRules[currentCell % turnRules.length];
      const newDirection = turnDirection === 'R'
        ? (direction + 1) % 4
        : (direction + 3) % 4;

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

  return null;
};

export default Ant;
