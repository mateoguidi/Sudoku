import React from 'react';
import { getCellSize, getBoxDimensions } from '../utils/helpers';

interface SudokuGridProps {
  grid: number[][];
  initialGrid: number[][];
  selectedCell: [number, number] | null;
  errors: Set<string>;
  gridSize: number;
  onCellClick: (row: number, col: number) => void;
}

export const SudokuGrid: React.FC<SudokuGridProps> = ({
  grid,
  initialGrid,
  selectedCell,
  errors,
  gridSize,
  onCellClick,
}) => {
  const { boxRows, boxCols } = getBoxDimensions(gridSize);
  const cellSize = getCellSize(gridSize);

  return (
    <div className="inline-block bg-white rounded-2xl p-2 sm:p-3 md:p-4 shadow-2xl max-w-full overflow-auto">
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: '0'
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => {
            const isInitial = initialGrid[i][j] !== 0;
            const isSelected = selectedCell && selectedCell[0] === i && selectedCell[1] === j;
            errors.has(`${i}-${j}`);
            const isBoxBorderRight = (j + 1) % boxCols === 0 && j !== gridSize - 1;
            const isBoxBorderBottom = (i + 1) % boxRows === 0 && i !== gridSize - 1;

            return (
              <div
                key={`${i}-${j}`}
                onClick={() => !isInitial && onCellClick(i, j)}
                className={`
                  ${cellSize}
                  flex items-center justify-center
                  font-bold cursor-pointer
                  transition-all duration-200
                  ${isInitial ? 'bg-gray-100 text-gray-900' : 'bg-white text-blue-600 hover:bg-blue-50'}
                  ${isSelected ? 'ring-4 ring-blue-500 ring-inset z-10' : ''}
                  ${isBoxBorderRight ? 'border-r-4 border-gray-900' : 'border-r border-gray-300'}
                  ${isBoxBorderBottom ? 'border-b-4 border-gray-900' : 'border-b border-gray-300'}
                  ${j === 0 ? 'border-l-4 border-gray-900' : ''}
                  ${i === 0 ? 'border-t-4 border-gray-900' : ''}
                  ${j === gridSize - 1 ? 'border-r-4 border-gray-900' : ''}
                  ${i === gridSize - 1 ? 'border-b-4 border-gray-900' : ''}
                `}
              >
                {cell !== 0 ? cell : ''}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
