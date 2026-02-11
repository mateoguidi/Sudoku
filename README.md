# Sudoku Game

A modern, interactive Sudoku game built with React, TypeScript, and Vite. Features multiple grid sizes, difficulty levels, and a sleek UI with gradient backgrounds and smooth animations.

## Features

- **Multiple Grid Sizes**: Play on 2x2, 2x3, or classic 3x3 grids
- **Three Difficulty Levels**: Easy, Medium, and Hard
- **Timer Tracking**: Track your solving time for each game
- **Best Times**: Personal best times are saved locally for each grid size and difficulty combination
- **Error Detection**: Instant feedback on incorrect entries
- **Keyboard Support**: Use number keys (1-9) and Backspace/Delete to play
- **Touch-Friendly**: Number keypad for mobile and tablet devices
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Beautiful gradient backgrounds with glassmorphism effects
- **Win Modal**: Celebration screen showing your completion time and personal best

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library

## Installation

1. Clone the repository:
```bash
git clone git@github.com:MateoGuidi/Sudoku.git
cd sudoku
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Start Screen**: Select your preferred grid size (2x2, 2x3, or 3x3) and difficulty level
2. **Playing**: Click on empty cells to select them, then click a number on the keypad or use your keyboard
3. **Keyboard Controls**:
   - Numbers 1-9: Enter number in selected cell
   - Backspace/Delete/0: Clear selected cell
4. **Win**: Complete the puzzle correctly to see your time and best time
5. **New Game**: Start a fresh puzzle with the same settings
6. **Back to Menu**: Return to the main menu to change settings

## Project Structure

```
src/
├── components/        # React components
│   ├── GameHeader.tsx    # Timer and navigation
│   ├── GameScreen.tsx    # Main game view
│   ├── MenuScreen.tsx    # Start menu
│   ├── NumberKeypad.tsx  # Number input pad
│   ├── SudokuGrid.tsx    # Grid display
│   └── WinModal.tsx      # Victory screen
├── hooks/            # Custom React hooks
│   ├── useBestTimes.ts   # Manage best times
│   ├── useSudokuGame.ts  # Game logic
│   └── useTimer.ts       # Timer functionality
├── utils/            # Utility functions
│   ├── helpers.ts        # Helper functions
│   ├── secureStorage.ts  # Local storage wrapper
│   └── sudokuGenerator.ts # Puzzle generation
├── types/            # TypeScript type definitions
│   └── index.ts
├── assets/           # Fonts
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Sudoku Generator
- Generates valid, solvable puzzles for any supported grid size
- Uses backtracking algorithm for puzzle creation
- Adjustable difficulty by controlling the number of empty cells

### Local Storage
- Best times are persisted using secure local storage
- Data is stored per grid size and difficulty combination
- Survives browser refreshes and sessions

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive grid sizing based on screen size
- Touch-optimized controls

## Author

**Matéo Guidi**

## License

This project is open source and available under the MIT License.

