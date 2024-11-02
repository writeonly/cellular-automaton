import React from 'react';
import { CellState } from '../types';

interface CellProps {
  state: CellState;
  isAnt: boolean;
  cellStates: number;
}

const Cell: React.FC<CellProps> = ({ state, isAnt, cellStates }) => {
  const getShadeOfGray = (state: number, cellStates: number) => {
    const intensity = 255 - Math.floor((state / (cellStates - 1) * 255));
    return `rgb(${intensity}, ${intensity}, ${intensity})`;
  };

 const backgroundColor = !isAnt ? getShadeOfGray(state, cellStates) : undefined;

  return (
    <div
      className={`cell ${isAnt ? 'ant' : ''}`}
      style={{
        backgroundColor: backgroundColor
      }}
    ></div>
  );
};

export default Cell;
