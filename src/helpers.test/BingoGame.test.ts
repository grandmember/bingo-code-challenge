/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/dot-notation */
// @ts-nocheck

import BingoGame from '@/helpers/BingoGame';

describe('BingoGame', () => {
  test('should create a BingoGame instance', () => {
    const game = new BingoGame(3);
    expect(game).toBeInstanceOf(BingoGame);
  });

  test('should throw an error if maximum number of players is exceeded', () => {
    expect(() => new BingoGame(8)).toThrow(
      'Maximum number of players exceeded.'
    );
  });

  test('should create the correct number of player boards', () => {
    const playersCount = 4;
    const game = new BingoGame(playersCount);
    expect(game.getPlayersBoards().length).toEqual(playersCount);
  });

  test('should have the correct board size', () => {
    const game = new BingoGame(5);
    expect(game.getBoardSize()).toEqual(5);
  });

  test('should have the correct free slot index', () => {
    const game = new BingoGame(5);
    expect(game.getFreeSlotIndex()).toEqual(12);
  });

  test('should generate winning combinations correctly', () => {
    const game = new BingoGame(3);
    const winningCombinations = game['winningCombinations'];
    expect(winningCombinations).toHaveLength(12);
  });

  test('should have the correct number of all possible numbers', () => {
    const game = new BingoGame(3);
    expect(game.getNumbersOnTheBoards().length).toEqual(75);
  });

  test('should check for winning boards correctly', () => {
    const game = new BingoGame(2);
    const playersBoards = game.getPlayersBoards();
    const markedPhrases = playersBoards[0]
      .flat()
      .map((cell) => cell.phrase !== 'FREE SLOT');
    expect(game.isWinningBoard(markedPhrases, 0)).toBeTruthy();
  });
});
