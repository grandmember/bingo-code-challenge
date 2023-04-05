/* eslint-disable tailwindcss/no-custom-classname */
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';

import type { IBingoCell } from '@/helpers/BingoGame';
import { GameContext } from '@/utils/contexts';

import { Typography } from './Typography';

interface BingoCardProps {
  bingoCells: IBingoCell[];
  userId: number;
}

const BingoCard: React.FC<BingoCardProps> = ({ bingoCells, userId }) => {
  const { setGameState, game } = useContext(GameContext);

  const [markedPhrases, setMarkedPhrases] = useState<boolean[]>(() => {
    const initialMarkedPhrases = Array(
      game.getBoardSize() * game.getBoardSize()
    ).fill(0);
    initialMarkedPhrases[game.getFreeSlotIndex()] = true; // Set the middle slot (index 12 for 5x5) to true (always on)
    return initialMarkedPhrases;
  });

  const togglePhrase = (index: number) => {
    const updatedMarkedPhrases = [...markedPhrases];
    updatedMarkedPhrases[index] = !updatedMarkedPhrases[index];
    setMarkedPhrases(updatedMarkedPhrases);

    // Check for a win
    if (game.isWinningBoard(updatedMarkedPhrases, userId)) {
      // alert('Bingo! You win!');
      Swal.fire({
        title: 'Bingo!',
        text: 'Continue?',
        icon: 'success',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Play',
        cancelButtonText: 'End',
      }).then((result) => {
        if (result.isDismissed) {
          setGameState(true);
          setTimeout(() => {
            Swal.fire({
              title: '<strong>You won, congrats!</strong>',
              icon: 'success',
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonColor: 'FF0000',
              cancelButtonColor: 'blue',
              denyButtonColor: '#14b8a6',
              confirmButtonText: '<span style="font-size: 3rem">▶</span>',
              cancelButtonText: '<span style="font-size: 3rem">🔁</span>',
              denyButtonText: '<span style="font-size: 3rem">😻</span>',
              showDenyButton: true,
            }).then((r) => {
              if (r.isConfirmed) {
                // set a timer to reload the page
                setTimeout(() => {
                  window.location.reload();
                }, 60000);
              }
              if (r.isDismissed) {
                window.location.reload();
              }
              if (r.isDenied) {
                setGameState(false);
              }
            });
          }, 3000);
        }
      });
    }
  };

  // use bingoCell.randomCellNumber to generate the keys for React
  const bingoCellKeys = bingoCells
    .map((cell) => cell.randomCellNumber)
    .filter((cell) => cell !== undefined);

  return (
    <div
      className={`grid items-center gap-3 font-semibold text-white
      ${game.getBoardSize() === 7 && 'grid-cols-7'}
      ${game.getBoardSize() === 5 && 'grid-cols-5'}
      ${game.getBoardSize() === 3 && 'grid-cols-3'}
      `}
    >
      {bingoCells?.map((bingoCell: IBingoCell, index: number) => (
        <button
          key={index}
          className={`h-fit w-fit place-self-center rounded-xl ${
            markedPhrases[index] ? ' bg-teal-600 text-white' : ''
          }`}
          onClick={() =>
            index !== game.getFreeSlotIndex() && togglePhrase(index)
          }
        >
          <div className="flex flex-col">
            {bingoCellKeys.includes(bingoCell.randomCellNumber) &&
              index !== game.getFreeSlotIndex() && (
                <Typography variant="small">
                  {Number(bingoCell.randomCellNumber)}
                </Typography>
              )}
            {index === game.getFreeSlotIndex() ? (
              <Typography
                className="animate__animated animate__pulse animate__infinite"
                variant="h1"
              >
                😻
              </Typography>
            ) : (
              <Typography variant="small">{bingoCell.phrase}</Typography>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default BingoCard;
