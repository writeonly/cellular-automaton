import React from 'react';
import { CellState } from '../types';

interface CellProps {
  state: CellState;
  isAnt: boolean;
}

const Cell: React.FC<CellProps> = ({ state, isAnt }) => {
  return (
    <div className={`cell ${state === 0 ? '' : 'active'} ${isAnt ? 'ant' : ''}`}></div>
  );
};

export default Cell;
