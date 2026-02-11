export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getBoxDimensions = (gridSize: number) => {
  const boxRows = gridSize === 4 ? 2 : gridSize === 6 ? 2 : 3;
  const boxCols = gridSize === 4 ? 2 : gridSize === 6 ? 3 : 3;
  return { boxRows, boxCols };
};

export const getCellSize = (gridSize: number): string => {
  if (gridSize === 4) return 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-xl sm:text-2xl md:text-3xl';
  if (gridSize === 6) return 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-lg sm:text-xl md:text-2xl';
  return 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-sm sm:text-base md:text-lg';
};
