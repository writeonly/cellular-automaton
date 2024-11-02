import React, { useEffect } from 'react';
import { AntState } from '../types/AntState';
import { Direction, DIRECTIONS, nextDirection } from '../types/Direction';
import { wrapAround } from '../types/utils';

const GRID_SIZE = 101;

interface AntProps {
  turnRules: string;
  cellStates: number;
  grid: number[][];
  setGrid: React.Dispatch<React.SetStateAction<number[][]>>;
  ant: AntState;
  setAnt: React.Dispatch<React.SetStateAction<AntState>>;
}

const Ant: React.FC<AntProps> = ({ grid, setGrid, ant, setAnt, cellStates, turnRules }) => {
  const moveAnt = () => {
    setGrid((oldGrid) => {
      const newGrid = oldGrid.map(row => [...row]);
      const { x, y, direction } = ant;
      const currentCell = newGrid[y][x];

      newGrid[y][x] = (currentCell + 1) % cellStates;

      const turnDirection = turnRules[currentCell % turnRules.length];
      const newDirection = nextDirection(turnDirection, direction)

      const newX = wrapAround(GRID_SIZE, x + DIRECTIONS[newDirection].x);
      const newY = wrapAround(GRID_SIZE, y + DIRECTIONS[newDirection].y);

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
