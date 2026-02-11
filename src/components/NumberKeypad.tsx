import React from 'react';

interface NumberKeypadProps {
  gridSize: number;
  onNumberInput: (num: number) => void;
}

export const NumberKeypad: React.FC<NumberKeypadProps> = ({
  gridSize,
  onNumberInput,
}) => {
  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full max-w-md px-2 sm:px-0">
      {Array.from({ length: gridSize }, (_, i) => i + 1).map(num => (
        <button
          key={num}
          onClick={() => onNumberInput(num)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 sm:py-4 rounded-lg transition-all hover:scale-105 text-lg sm:text-xl"
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => onNumberInput(0)}
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 sm:py-4 rounded-lg transition-all hover:scale-105 col-span-1 text-lg sm:text-xl"
      >
        ✕
      </button>
    </div>
  );
};
