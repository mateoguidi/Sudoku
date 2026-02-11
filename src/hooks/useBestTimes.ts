import { useState, useEffect } from 'react';
import type { BestTimes } from '../types';
import { secureStorage } from '../utils/secureStorage';

const BEST_TIMES_KEY = 'best-times';

export const useBestTimes = () => {
  const [bestTimes, setBestTimes] = useState<BestTimes>({});

  useEffect(() => {
    // Try to load from secure storage
    const saved = secureStorage.get<BestTimes>(BEST_TIMES_KEY);
    if (saved) {
      setBestTimes(saved);
    } else {
      // Fallback: try to migrate old plain localStorage data
      const oldSaved = localStorage.getItem('sudoku-best-times');
      if (oldSaved) {
        try {
          const oldData = JSON.parse(oldSaved);
          setBestTimes(oldData);
          // Migrate to secure storage
          secureStorage.set(BEST_TIMES_KEY, oldData);
          // Remove old plain storage
          localStorage.removeItem('sudoku-best-times');
        } catch (error) {
          console.error('Failed to migrate old best times data');
        }
      }
    }
  }, []);

  const updateBestTime = (key: string, time: number) => {
    const currentBest = bestTimes[key];
    if (!currentBest || time < currentBest) {
      const newBestTimes = { ...bestTimes, [key]: time };
      setBestTimes(newBestTimes);
      secureStorage.set(BEST_TIMES_KEY, newBestTimes);
      return true;
    }
    return false;
  };

  return { bestTimes, updateBestTime };
};
