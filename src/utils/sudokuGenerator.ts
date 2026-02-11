import type { Difficulty, GridSize, SudokuGrid } from '../types';

export class SudokuGenerator {
  static generateComplete(size: GridSize): number[][] {
    const boxRows = size === 4 ? 2 : size === 6 ? 2 : 3;
    const boxCols = size === 4 ? 2 : size === 6 ? 3 : 3;
    const grid: number[][] = Array(size).fill(null).map(() => Array(size).fill(0));
    
    const isValid = (grid: number[][], row: number, col: number, num: number): boolean => {
      for (let x = 0; x < size; x++) {
        if (grid[row][x] === num) return false;
      }

      for (let x = 0; x < size; x++) {
        if (grid[x][col] === num) return false;
      }

      const boxRow = Math.floor(row / boxRows) * boxRows;
      const boxCol = Math.floor(col / boxCols) * boxCols;
      for (let i = 0; i < boxRows; i++) {
        for (let j = 0; j < boxCols; j++) {
          if (grid[boxRow + i][boxCol + j] === num) return false;
        }
      }
      
      return true;
    };
    
    const fillGrid = (grid: number[][]): boolean => {
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (grid[row][col] === 0) {
            const numbers = Array.from({ length: size }, (_, i) => i + 1);
            for (let i = numbers.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }
            
            for (const num of numbers) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (fillGrid(grid)) return true;
                grid[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };
    
    fillGrid(grid);
    return grid;
  }

  static createPuzzle(completeGrid: number[][], difficulty: Difficulty): number[][] {
    const size = completeGrid.length;
    const puzzle = completeGrid.map(row => [...row]);

    const cellsToRemove: Record<Difficulty, number> = {
      easy: Math.floor(size * size * 0.4),
      medium: Math.floor(size * size * 0.55),
      hard: Math.floor(size * size * 0.7)
    };
    
    let removed = 0;
    const attempts = cellsToRemove[difficulty] * 3;
    
    for (let i = 0; i < attempts && removed < cellsToRemove[difficulty]; i++) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }
    
    return puzzle;
  }
  
  static generate(gridSize: GridSize, difficulty: Difficulty): SudokuGrid {
    const complete = this.generateComplete(gridSize);
    const puzzle = this.createPuzzle(complete, difficulty);
    return { puzzle, solution: complete };
  }
}
