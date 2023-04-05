import React from 'react';

interface VisualRewardProps {
  winner: string;
}

const VisualReward: React.FC<VisualRewardProps> = ({ winner }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold text-indigo-700">
        Congratulations, {winner}!
      </h2>
      <div className="h-32 w-32 animate-spin rounded-full bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-500"></div>
      <p className="text-lg">You won the game!</p>
    </div>
  );
};

export default VisualReward;
