import React from 'react';

interface CellProps {
  content: string;
  isMarked: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ content, isMarked, onClick }) => {
  return (
    <button
      className={`h-full w-full border border-gray-300 ${
        isMarked ? 'bg-green-500' : 'bg-white'
      } p-2 text-center text-xs font-semibold`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Cell;
