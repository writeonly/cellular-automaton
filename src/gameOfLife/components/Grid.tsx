import React from 'react';
import Cell from './Cell';
import { CellState } from '../types/CellState';

interface GridProps {
  grid: CellState[][];
  toggleCellState: (x: number, y: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, toggleCellState }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,
      justifyContent: 'center',
    }}
  >
    {grid.map((row, y) =>
      row.map((cell, x) => (
        <Cell
          key={`${x}-${y}`}
          state={cell}
          toggleState={() => toggleCellState(x, y)}
        />
      ))
    )}
  </div>
);

export default Grid;
