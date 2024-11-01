export interface Direction {
  x: number;
  y: number;
}

export type CellState = number;

export interface AntState {
  x: number;
  y: number;
  direction: number;
}
