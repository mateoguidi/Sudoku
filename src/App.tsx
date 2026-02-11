import { useState, useEffect, useCallback, useRef } from 'react';
import { MenuScreen } from './components/MenuScreen';
import { GameScreen } from './components/GameScreen';
import { useBestTimes } from './hooks/useBestTimes';
import { useTimer } from './hooks/useTimer';
import { useSudokuGame } from './hooks/useSudokuGame';
import type {GridSize, Difficulty} from './types';

function App() {
    const [gridSize, setGridSize] = useState<GridSize>(9);
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const [isNewRecord, setIsNewRecord] = useState(false);
    const hasProcessedWin = useRef(false);

    const { bestTimes, updateBestTime } = useBestTimes();
    const { timer, startTimer, stopTimer, resetTimer } = useTimer();

    const handleWin = useCallback((currentTimer: number) => {
        stopTimer();
        const key = `${gridSize}x${gridSize}-${difficulty}`;
        const wasNewRecord = updateBestTime(key, currentTimer);
        setIsNewRecord(wasNewRecord);
    }, [gridSize, difficulty, updateBestTime, stopTimer]);

    const {
        gameState,
        grid,
        initialGrid,
        selectedCell,
        errors,
        startNewGame,
        handleNumberInput,
        handleCellClick,
        backToMenu,
    } = useSudokuGame(gridSize, difficulty);

    const handleStartGame = () => {
        hasProcessedWin.current = false;
        startNewGame();
        startTimer();
    };

    const handleNewGame = () => {
        hasProcessedWin.current = false;
        startNewGame();
        resetTimer();
        startTimer();
    };

    const handleBackToMenu = () => {
        backToMenu();
        resetTimer();
    };

    // Gestion du clavier
    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (gameState !== 'playing') return;

        const num = parseInt(e.key);
        if (num >= 1 && num <= gridSize) {
            handleNumberInput(num);
        } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
            handleNumberInput(0);
        }
    }, [gameState, handleNumberInput, gridSize]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    // Vérifier la victoire avec le timer actuel
    useEffect(() => {
        if (gameState === 'won' && !hasProcessedWin.current) {
            hasProcessedWin.current = true;
            queueMicrotask(() => {
                handleWin(timer);
            });
        }
    }, [gameState, timer, handleWin]);

    if (gameState === 'menu') {
        return (
            <MenuScreen
                gridSize={gridSize}
                difficulty={difficulty}
                bestTimes={bestTimes}
                onGridSizeChange={setGridSize}
                onDifficultyChange={setDifficulty}
                onStartGame={handleStartGame}
            />
        );
    }



    return (
        <GameScreen
            gameState={gameState}
            grid={grid}
            initialGrid={initialGrid}
            selectedCell={selectedCell}
            errors={errors}
            timer={timer}
            gridSize={gridSize}
            difficulty={difficulty}
            bestTimes={bestTimes}
            isNewRecord={isNewRecord}
            onCellClick={handleCellClick}
            onNumberInput={handleNumberInput}
            onBackToMenu={handleBackToMenu}
            onNewGame={handleNewGame}
        />
    );
}

export default App;
