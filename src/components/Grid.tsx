import React from 'react';
import Cell from './Cell';
import { AntState, CellState } from '../types';

interface GridProps {
  grid: CellState[][];
  ant: AntState;
  cellStates: number;
}

const Grid: React.FC<GridProps> = ({ grid, ant, cellStates }) => {
  return (
    <div className="grid">
      {grid.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => (
            <Cell key={`${x}-${y}`} isAnt={ant.x === x && ant.y === y} state={cell} cellStates={cellStates} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
