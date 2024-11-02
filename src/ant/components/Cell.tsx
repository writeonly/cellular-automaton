import React from 'react';

interface CellProps {
  cellStates: number;
  state: number;
  isAnt: boolean;
}

const Cell: React.FC<CellProps> = ({ cellStates, state, isAnt }) => {
  const getShadeOfGray = (cellStates: number, state: number) => {
    const intensity = 255 - Math.floor((state / (cellStates - 1) * 255));
    return `rgb(${intensity}, ${intensity}, ${intensity})`;
  };

 const backgroundColor = !isAnt ? getShadeOfGray(cellStates, state) : undefined;

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
