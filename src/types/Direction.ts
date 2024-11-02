export interface Direction {
  x: number;
  y: number;
}

export const DIRECTIONS: Direction[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
];

export const nextDirection = (turnDirection: string, direction: number) => (turnDirection === 'R'
        ? (direction + 1)
        : (direction + 3)
        ) % 4;

