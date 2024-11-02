import React from 'react';
import Cell from './Cell';
import { AntState } from '../types/AntState';

interface GridProps {
  cellStates: number;
  grid: number[][];
  ant: AntState;
}

const Grid: React.FC<GridProps> = ({ cellStates, grid, ant }) => {
  return (
    <div className="grid">
      {grid.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => (
            <Cell key={`${x}-${y}`} cellStates={cellStates} state={cell} isAnt={ant.x === x && ant.y === y}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
