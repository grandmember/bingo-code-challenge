/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import 'animate.css';

import React, { useContext, useState } from 'react';

import { GameContext } from '@/utils/contexts';

import BingoGame from '../helpers/BingoGame';
import BingoCard from './BingoCard';
import PlayerSelection from './PlayerSelection';
import RandomNumberModule from './RandomNumberModule';

const BingoApp: React.FC = () => {
  const { game, setGame, gameState } = useContext(GameContext);
  // const [markedPhrases, setMarkedPhrases] = useState<BingoCell[][][]>();

  const [randomNumberLimit, setRandomNumberLimit] = useState<number>(0);

  const handleStart = (usernames: string[]) => {
    if (game && game.getPlayersCount() !== 0) return;

    const newGame = new BingoGame(usernames.length);
    setGame(newGame);

    setRandomNumberLimit(newGame.getNumbersOnTheBoards().length);
  };

  // const handleCellClick = (playerIndex: number, row: number, col: number) => {
  //   if (!game) return;
  //   if (winner !== '') return;

  //   const newMarkedPhrases = [...markedPhrases];
  //   newMarkedPhrases[playerIndex][row][col] = true;

  //   setMarkedPhrases(newMarkedPhrases);

  //   // if (
  //   //   game.isWinningBoard(newMarkedPhrases[playerIndex]?.flat() as boolean[])
  //   // ) {
  //   //   setWinner(`Player ${playerIndex + 1}`);
  //   // }
  // };

  return (
    <div className={`container mx-auto ${gameState === true ? 'hidden' : ''}`}>
      {!game ? (
        <PlayerSelection onStart={handleStart} />
      ) : (
        <div className="flex flex-col items-center">
          <div className="grid gap-1  md:grid-cols-2 xl:grid-cols-2 xl:gap-10 2xl:grid-cols-3">
            {game.getPlayersBoards().map((board, index) => (
              <div
                key={index}
                className="mb-10 max-h-fit max-w-fit justify-start justify-self-auto rounded-2xl bg-black p-1 shadow-2xl shadow-slate-950"
              >
                <h3 className="mb-2 text-center text-red-300">
                  Player {index + 1}
                </h3>
                <BingoCard
                  key={index}
                  bingoCells={board.flat()}
                  userId={index}
                />
              </div>
            ))}
          </div>
          <div className="animate__animated animate__slideInDown animate__slow my-5">
            <RandomNumberModule maxNumber={randomNumberLimit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BingoApp;
