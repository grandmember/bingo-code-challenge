import React from 'react';

import Cell from './Cell';

interface BoardProps {
  board: string[][];
  markedPhrases: boolean[][];
  onCellClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, markedPhrases, onCellClick }) => {
  return (
    <div className="grid grid-cols-5 gap-1">
      {board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            content={cell}
            isMarked={markedPhrases?.[rowIndex]?.[colIndex] || false}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ));
      })}
    </div>
  );
};

export default Board;
