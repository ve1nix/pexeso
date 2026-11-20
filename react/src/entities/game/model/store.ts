import { create } from 'zustand';

import { createInitialState, gameReducer } from './reducer';
import type { GameAction, GameState } from './types';

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
    start: (pairsCount) => dispatch({ type: 'START', pairsCount }),
    flip: (uid) => dispatch({ type: 'FLIP', uid }),
    reset: () => dispatch({ type: 'RESET' }),
    tick: (deltaMs) => dispatch({ type: 'TICK', deltaMs }),
  };
});
