import React from 'react';
import { Trophy } from 'lucide-react';
import { formatTime } from '../utils/helpers';
import type { GridSize, Difficulty, BestTimes } from '../types';

interface WinModalProps {
  timer: number;
  gridSize: GridSize;
  difficulty: Difficulty;
  bestTimes: BestTimes;
  isNewRecord: boolean;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  timer,
  isNewRecord,
  onPlayAgain,
  onBackToMenu,
}) => {

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <style>{`
        .glow {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5),
                       0 0 20px rgba(59, 130, 246, 0.3),
                       0 0 30px rgba(59, 130, 246, 0.2);
        }
        
        .card-glow {
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.15),
                      0 0 80px rgba(59, 130, 246, 0.08);
        }
      `}</style>
      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl animate-bounce-in">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-4xl font-black mb-4 text-white glow">
          VICTORY!
        </h2>
        <p className="text-white/90 text-xl mb-4">
          Time: {formatTime(timer)}
        </p>
        {isNewRecord && (
          <p className="text-yellow-300 font-bold mb-4 flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5" />
            New Record!
          </p>
        )}
        <div className="flex gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-all"
          >
            Play Again
          </button>
          <button
            onClick={onBackToMenu}
            className="flex-1 bg-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-all"
          >
            Menu
          </button>
        </div>
      </div>
    </div>
  );
};
