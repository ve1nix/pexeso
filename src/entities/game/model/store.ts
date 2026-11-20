import { create } from 'zustand';

import { createInitialState, gameReducer } from './reducer';
import { GameActionType, type GameAction, type GameState } from './types';

interface GameStore extends GameState {
  start: (pairsCount: number) => void;
  flip: (uid: string) => void;
  reset: () => void;
  tick: (deltaMs: number) => void;
}

export const useGameStore = create<GameStore>((set) => {
  const dispatch = (action: GameAction) => set((state) => gameReducer(state, action));

  return {
    ...createInitialState(),
    start: (pairsCount) => dispatch({ type: GameActionType.Start, pairsCount }),
    flip: (uid) => dispatch({ type: GameActionType.Flip, uid }),
    reset: () => dispatch({ type: GameActionType.Reset }),
    tick: (deltaMs) => dispatch({ type: GameActionType.Tick, deltaMs }),
  };
});
