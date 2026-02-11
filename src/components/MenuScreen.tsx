import React from 'react';
import { Play, Trophy } from 'lucide-react';
import type {GridSize, Difficulty, BestTimes} from '../types';
import { formatTime } from '../utils/helpers';

interface MenuScreenProps {
  gridSize: GridSize;
  difficulty: Difficulty;
  bestTimes: BestTimes;
  onGridSizeChange: (size: GridSize) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStartGame: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  gridSize,
  difficulty,
  bestTimes,
  onGridSizeChange,
  onDifficultyChange,
  onStartGame,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <style>{`
        .glow {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5),
                       0 0 20px rgba(59, 130, 246, 0.3),
                       0 0 30px rgba(59, 130, 246, 0.2);
        }
        
        .title-glow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
                       0 0 20px rgba(59, 130, 246, 0.3),
                       0 0 40px rgba(6, 182, 212, 0.2);
          letter-spacing: 0.05em;
        }
        
        .card-glow {
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.15),
                      0 0 80px rgba(59, 130, 246, 0.08);
        }
        
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.5); }
        }
        
        .btn-primary {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}
      </style>
      
      <div className="grid-pattern absolute inset-0 opacity-30"></div>

      <div className="relative z-10">
        <div className="text-center float-animation mb-4">
          <h1 className="text-6xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 title-glow mb-2" style={{ fontFamily: 'Montserrat-ExtraBold, sans-serif' }}>
            SUDOKU
          </h1>
        </div>

        
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 card-glow border border-blue-200">
          <div className="space-y-8">
            <div>
              <label className="block text-blue-700 mb-4 text-sm tracking-wider uppercase font-semibold">
                Grid Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: 4 as GridSize, label: '2×2', desc: 'Nano' },
                  { size: 6 as GridSize, label: '2×3', desc: 'Mini' },
                  { size: 9 as GridSize, label: '3×3', desc: 'Classic' }
                ].map(({ size, label, desc }) => (
                  <button
                    key={size}
                    onClick={() => onGridSizeChange(size)}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      gridSize === size
                        ? 'bg-blue-500 text-white scale-105 shadow-lg shadow-blue-500/50'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                    }`}
                  >
                    <div className="font-bold text-xl mb-1">{label}</div>
                    <div className="text-xs opacity-70">{desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-blue-700 mb-4 text-sm tracking-wider uppercase font-semibold">
                Difficulty
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { diff: 'easy' as Difficulty, label: 'Easy', color: '#16a34a' },
                  { diff: 'medium' as Difficulty, label: 'Medium', color: '#ca8a04' },
                  { diff: 'hard' as Difficulty, label: 'Hard', color: '#dc2626' }
                ].map(({ diff, label, color }) => (
                  <button
                    key={diff}
                    onClick={() => onDifficultyChange(diff)}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      difficulty === diff
                        ? 'text-white scale-105 shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                    }`}
                    style={difficulty === diff ? { backgroundColor: color } : {}}
                  >
                    <div className="font-bold">{label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-blue-700 text-sm uppercase tracking-wider font-semibold">Best times</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map(diff => {
                  const key = `${gridSize}x${gridSize}-${diff}`;
                  const time = bestTimes[key];
                  return (
                    <div key={diff} className="bg-white rounded-lg p-2 text-center border border-blue-100">
                      <div className="text-gray-600 capitalize mb-1">{diff}</div>
                      <div className="text-blue-600 font-bold">
                        {time ? formatTime(time) : '--:--'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={onStartGame}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl btn-primary"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
              START GAME
            </button>
          </div>
        </div>

        <footer className="mt-4 text-center">
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Montserrat-Medium, sans-serif' }}>
            © {new Date().getFullYear()} Matéo GUIDI • All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
};
