import { useState, useCallback } from 'react';
import type { GridSize, Difficulty, GameState } from '../types';
import { SudokuGenerator } from '../utils/sudokuGenerator';

export const useSudokuGame = (
  gridSize: GridSize,
  difficulty: Difficulty
) => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [grid, setGrid] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const startNewGame = useCallback(() => {
    const { puzzle, solution } = SudokuGenerator.generate(gridSize, difficulty);
    setGrid(puzzle.map(row => [...row]));
    setSolution(solution);
    setInitialGrid(puzzle.map(row => [...row]));
    setGameState('playing');
    setSelectedCell(null);
    setErrors(new Set());
  }, [gridSize, difficulty]);

  const checkWin = useCallback((currentGrid: number[][]): boolean => {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (currentGrid[i][j] !== solution[i][j]) {
          return false;
        }
      }
    }
    return true;
  }, [gridSize, solution]);

  const handleNumberInput = useCallback((num: number) => {
    if (!selectedCell || gameState !== 'playing') return;
    
    const [row, col] = selectedCell;
    if (initialGrid[row][col] !== 0) return;
    
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = num;
    setGrid(newGrid);
    
    if (checkWin(newGrid)) {
      setGameState('won');
    }
  }, [selectedCell, grid, initialGrid, gameState, checkWin]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (initialGrid[row][col] === 0) {
      setSelectedCell([row, col]);
    }
  }, [initialGrid]);

  const backToMenu = useCallback(() => {
    setGameState('menu');
  }, []);

  return {
    gameState,
    grid,
    initialGrid,
    selectedCell,
    errors,
    startNewGame,
    handleNumberInput,
    handleCellClick,
    backToMenu,
    setGameState,
  };
};
