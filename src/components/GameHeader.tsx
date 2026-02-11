import React from 'react';
import { Timer, RotateCcw } from 'lucide-react';
import { formatTime } from '../utils/helpers';

interface GameHeaderProps {
  timer: number;
  onBackToMenu: () => void;
  onNewGame: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  timer,
  onBackToMenu,
  onNewGame,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
      <button
        onClick={onBackToMenu}
        className="bg-white/80 hover:bg-white text-blue-600 px-3 sm:px-4 py-2 rounded-lg transition-all backdrop-blur-sm border border-blue-200 font-semibold text-sm sm:text-base"
      >
        ← Menu
      </button>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="bg-white/80 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              {formatTime(timer)}
            </span>
          </div>
        </div>
        
        <button
          onClick={onNewGame}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 sm:p-3 rounded-lg transition-all"
          title="New Game"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};
