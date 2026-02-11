export type GameState = 'menu' | 'playing' | 'won';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GridSize = 4 | 6 | 9;

export interface BestTimes {
  [key: string]: number;
}

export interface SudokuGrid {
  puzzle: number[][];
  solution: number[][];
}
