import React, { useEffect, useState } from 'react';
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
  const [stepCount, setStepCount] = useState(0);

  const moveAnt = React.useCallback(() => {
    const { x, y, direction } = ant;
    const currentCell = grid[y][x];

    const newGrid = grid.slice();
    newGrid[y][x] = (currentCell + 1) % cellStates;

    const turnDirection = turnRules[currentCell % turnRules.length];
    const newDirection = nextDirection(turnDirection, direction);

    const newX = wrapAround(gridSize, x + DIRECTIONS[newDirection].x);
    const newY = wrapAround(gridSize, y + DIRECTIONS[newDirection].y);

    setGrid(newGrid);
    setAnt({ x: newX, y: newY, direction: newDirection });
    setStepCount(prevCount => prevCount + 1);  // Increment the step counter
  }, [ant, grid, turnRules, cellStates, gridSize, setGrid, setAnt]);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      moveAnt();
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [moveAnt]);

  return (
    <div className="ant-info">
      <p>Steps: {stepCount}</p>
    </div>
  );
};

export default Ant;
