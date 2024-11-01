export interface Direction {
  x: number;
  y: number;
}

export type CellState = 0 | 1;

export interface AntState {
  x: number;
  y: number;
  direction: number;
}
