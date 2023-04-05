/* eslint-disable unused-imports/no-unused-vars */
import { createContext } from 'react';

import BingoGame from '@/helpers/BingoGame';

export const GameContext = createContext({
  gameState: false,
  setGameState: (_: boolean) => {},

  game: new BingoGame(0),
  setGame: (_: BingoGame) => {},
});
