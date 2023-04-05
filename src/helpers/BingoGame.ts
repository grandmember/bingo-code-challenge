/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { phrases } from './phrases';

export interface IBingoCell {
  randomCellNumber: number | null;
  phrase: string;
}

class BingoGame {
  private boardSize = 5;

  private maxPlayers = 7;

  private winningCombinations: number[][];

  private wonCombinations: number[][] = [];

  private playersBoards: IBingoCell[][][] = [];

  private playersCount: number;

  private freeSlotIndex = Math.floor((this.boardSize * this.boardSize) / 2);

  private allPossibleNumbers: number[] = [];

  private usedNumbers: number[] = [];

  private numbersOnTheBoards: number[] = [];

  constructor(playersCount: number) {
    if (playersCount > this.maxPlayers) {
      throw new Error('Maximum number of players exceeded.');
    }

    this.winningCombinations = BingoGame.generateWinningCombinations(
      this.boardSize
    );

    this.playersCount = playersCount;

    // Populate allPossibleNumbers and shuffle them
    const maxNumber =
      // this.playersCount * (this.boardSize * this.boardSize) - playersCount * 1; // 1 Free slot per player
      this.playersCount * this.boardSize * this.boardSize;

    this.allPossibleNumbers = Array.from(
      { length: maxNumber },
      (_, i) => i + 1
    );

    this.allPossibleNumbers = BingoGame.shuffleArray(this.allPossibleNumbers);
    this.numbersOnTheBoards = this.allPossibleNumbers;

    for (let i = 0; i < playersCount; i++) {
      this.playersBoards.push(this.generateBoard());
    }
  }

  private generateBoard(): IBingoCell[][] {
    const board: IBingoCell[][] = [];
    const phrasesArray = Array.from(phrases);
    const shuffledPhrases = BingoGame.shuffleArray(phrasesArray);

    for (let row = 0; row < this.boardSize; row++) {
      const currentRow: IBingoCell[] = [];
      for (let col = 0; col < this.boardSize; col++) {
        if (row === this.freeSlotIndex && col === this.freeSlotIndex) {
          currentRow.push({ randomCellNumber: null, phrase: 'FREE SLOT' });
        } else {
          const randomNumber = this.getUniqueRandomNumberFromPool();
          const cellPhrase = shuffledPhrases.pop()!;
          currentRow.push({
            randomCellNumber: randomNumber,
            phrase: cellPhrase,
          });
        }
      }
      board.push(currentRow);
    }

    return board;
  }

  static generateWinningCombinations(squareSideLength: number): number[][] {
    const winningCombinations: number[][] = [];

    // Rows
    for (let i = 0; i < squareSideLength; i++) {
      const row = [];
      for (let j = 0; j < squareSideLength; j++) {
        row.push(i * squareSideLength + j);
      }
      winningCombinations.push(row);
    }

    // Columns
    for (let i = 0; i < squareSideLength; i++) {
      const col = [];
      for (let j = 0; j < squareSideLength; j++) {
        col.push(j * squareSideLength + i);
      }
      winningCombinations.push(col);
    }

    // Diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < squareSideLength; i++) {
      diag1.push(i * squareSideLength + i);
      diag2.push(i * squareSideLength + (squareSideLength - 1 - i));
    }
    winningCombinations.push(diag1, diag2);

    return winningCombinations;
  }

  static shuffleArray<T>(arr: T[]): T[] {
    let currentIndex = arr.length;
    let temporaryValue: T;
    let randomIndex: number;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex] as T;
      arr[currentIndex] = arr[randomIndex] as T;
      arr[randomIndex] = temporaryValue as T;
    }
    return arr;
  }

  private getUniqueRandomNumberFromPool(): number {
    const tempArr = this.allPossibleNumbers.filter(
      (num) => !this.usedNumbers.includes(num)
    );

    const randomIndex = Math.floor(Math.random() * tempArr.length);
    const randomNum = tempArr[randomIndex]!;

    this.usedNumbers.push(randomNum);

    return randomNum;
  }

  public getPlayersBoards(): IBingoCell[][][] {
    return this.playersBoards;
  }

  public isWinningBoard(markedPhrases: boolean[], userId: number): boolean {
    // find the user's board
    const userBoard = this.playersBoards[userId];

    // find the user's marked phrases
    const userMarkedPhrases = userBoard?.flat().map((cell) => cell.phrase);

    // find the user's marked phrases indexes
    const userMarkedPhrasesIndexes = userMarkedPhrases;

    // find the user's winning combinations
    const userWinningCombinations = this.winningCombinations.filter(
      (combination) =>
        combination.every((index) => userMarkedPhrasesIndexes?.[index])
    );

    // find the user's won combinations
    const userWonCombinations = userWinningCombinations.filter((combination) =>
      combination.every((index) => markedPhrases[index])
    );

    // if the user has won, add the won combinations to the wonCombinations array
    if (userWonCombinations.length > 0) {
      this.wonCombinations.push(...userWonCombinations);
    }

    // return true if the user has won
    return userWonCombinations.length > 0;
  }

  public getFreeSlotIndex(): number {
    return this.freeSlotIndex;
  }

  public getBoardSize(): number {
    return this.boardSize;
  }

  public getNumbersOnTheBoards(): number[] {
    return this.numbersOnTheBoards;
  }

  public getPlayersCount(): number {
    return this.playersCount;
  }
}

export default BingoGame;
