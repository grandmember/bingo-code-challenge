/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from 'react';

import { Typography } from './Typography';

interface RandomNumberModuleProps {
  maxNumber: number;
}

const RandomNumberModule: React.FC<RandomNumberModuleProps> = ({
  maxNumber,
}) => {
  const [currentNumber, setCurrentNumber] = useState<number>(0);

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    setCurrentNumber(randomNumber);
  };

  return (
    <div className="text-center">
      <Typography
        className="animate__animated animate__wobble animate__infinite animate__slow mb-4 font-bold"
        variant="h4"
      >
        Current Number: {currentNumber}
      </Typography>
      <button
        className="rounded bg-teal-600 px-4 py-2 font-bold text-white hover:bg-black"
        onClick={generateRandomNumber}
      >
        Generate New Number
      </button>
    </div>
  );
};

export default RandomNumberModule;
