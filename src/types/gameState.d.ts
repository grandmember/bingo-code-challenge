export interface IGameState {
  gameState: boolean;
}
export type GameContextType = {
  gameState: boolean;
  updateGameState: (s: boolean) => void;
};
