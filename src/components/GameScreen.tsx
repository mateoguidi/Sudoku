import React, { useState, useEffect } from 'react';
import { GameHeader } from './GameHeader.tsx';
import { SudokuGrid } from './SudokuGrid.tsx';
import { NumberKeypad } from './NumberKeypad.tsx';
import { WinModal } from './WinModal.tsx';
import type { GameState, GridSize, Difficulty, BestTimes } from '../types';

interface GameScreenProps {
  gameState: GameState;
  grid: number[][];
  initialGrid: number[][];
  selectedCell: [number, number] | null;
  errors: Set<string>;
  timer: number;
  gridSize: GridSize;
  difficulty: Difficulty;
  bestTimes: BestTimes;
  isNewRecord: boolean;
  onCellClick: (row: number, col: number) => void;
  onNumberInput: (num: number) => void;
  onBackToMenu: () => void;
  onNewGame: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  gameState,
  grid,
  initialGrid,
  selectedCell,
  errors,
  timer,
  gridSize,
  difficulty,
  bestTimes,
  isNewRecord,
  onCellClick,
  onNumberInput,
  onBackToMenu,
  onNewGame,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isGlinting, setIsGlinting] = useState(false);

  useEffect(() => {
    if (gameState === 'won') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsGlinting(true);
      setShowModal(false);

      // Show modal after glint animation completes
      const timer = setTimeout(() => {
        setIsGlinting(false);
        setShowModal(true);
      }, 1500); // 1.5 seconds for glint animation

      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
      setIsGlinting(false);
    }
  }, [gameState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <style>{`
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .card-glow {
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.15),
                      0 0 80px rgba(59, 130, 246, 0.08);
        }
        
        @keyframes victory-glint {
              0% {
                box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
              }
              25% {
                box-shadow: 0 0 50px 15px rgba(59, 130, 246, 0.6),
                            0 0 80px 30px rgba(147, 197, 253, 0.5);
              }
              50% {
                box-shadow: 0 0 70px 25px rgba(59, 130, 246, 0.8),
                            0 0 100px 40px rgba(147, 197, 253, 0.6),
                            inset 0 0 30px rgba(255, 255, 255, 0.4);
              }
              75% {
                box-shadow: 0 0 50px 15px rgba(59, 130, 246, 0.6),
                            0 0 80px 30px rgba(147, 197, 253, 0.5);
              }
              100% {
                box-shadow: 0 0 40px rgba(59, 130, 246, 0.15),
                            0 0 80px rgba(59, 130, 246, 0.08);
              }
        }
        
        .victory-glint {
          animation: victory-glint 1.5s ease-in-out;
        }
      `}</style>
      <div className="grid-pattern absolute inset-0 opacity-30"></div>
      
      <div className="relative w-full max-w-4xl">
        <GameHeader
          timer={timer}
          onBackToMenu={onBackToMenu}
          onNewGame={onNewGame}
        />
        
        <div className={`bg-white/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 card-glow border border-blue-200 ${isGlinting ? 'victory-glint' : ''}`}>
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <SudokuGrid
              grid={grid}
              initialGrid={initialGrid}
              selectedCell={selectedCell}
              errors={errors}
              gridSize={gridSize}
              onCellClick={onCellClick}
            />
            
            <NumberKeypad
              gridSize={gridSize}
              onNumberInput={onNumberInput}
            />
          </div>
        </div>
        
        {showModal && (
          <WinModal
            timer={timer}
            gridSize={gridSize}
            difficulty={difficulty}
            bestTimes={bestTimes}
            isNewRecord={isNewRecord}
            onPlayAgain={onNewGame}
            onBackToMenu={onBackToMenu}
          />
        )}

        <footer className="mt-4 text-center">
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Montserrat-Medium, sans-serif' }}>
            © {new Date().getFullYear()} Matéo GUIDI • All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
};
