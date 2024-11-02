import React, { useEffect } from 'react';
import { AntState } from '../types/AntState';
import { Direction, DIRECTIONS, nextDirection } from '../types/Direction';
import { wrapAround } from '../types/utils';

interface AntProps {
  turnRules: string;
  cellStates: number;
  gridSize: number;
  grid: number[][];
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
  ant: AntState;
  setAnt: React.Dispatch<React.SetStateAction<AntState>>;
}

const Ant: React.FC<AntProps> = ({ turnRules, cellStates, gridSize, grid, setGrid, ant, setAnt }) => {
  const moveAnt = () => {
    setGrid((oldGrid) => {
      const newGrid = oldGrid.map(row => [...row]);
      const { x, y, direction } = ant;
      const currentCell = newGrid[y][x];

      newGrid[y][x] = (currentCell + 1) % cellStates;

      const turnDirection = turnRules[currentCell % turnRules.length];
      const newDirection = nextDirection(turnDirection, direction)

      const newX = wrapAround(gridSize, x + DIRECTIONS[newDirection].x);
      const newY = wrapAround(gridSize, y + DIRECTIONS[newDirection].y);

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
