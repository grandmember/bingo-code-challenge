/* eslint-disable no-plusplus */

const generateWinningCombinations = (squareSideLength: number): number[][] => {
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
};

export const checkForWin = (
  markedPhrases: boolean[],
  squareSideLength: number
): boolean => {
  const winningCombinations = generateWinningCombinations(squareSideLength);

  for (const combination of winningCombinations) {
    if (combination.every((index) => markedPhrases[index])) {
      return true;
    }
  }
  return false;
};
