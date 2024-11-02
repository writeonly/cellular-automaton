import React from 'react';
import { CellState } from '../types/CellState';

interface CellProps {
  state: CellState;
  toggleState: () => void;
}

const Cell: React.FC<CellProps> = ({ state, toggleState }) => (
  <div
    className={`cell ${state ? 'alive' : 'dead'}`}
    onClick={toggleState}
    style={{
      width: '10px',
      height: '10px',
      backgroundColor: state ? 'black' : 'white',
      border: '1px solid #ddd',
    }}
  ></div>
);

export default Cell;
