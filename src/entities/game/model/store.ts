import { create } from 'zustand';

import { createInitialState, gameReducer } from './reducer';
import { GameActionType, GamePhase, type GameAction, type GameState } from './types';

const TICK_INTERVAL_MS = 1000;

interface GameStore extends GameState {
  start: (pairsCount: number) => void;
  flip: (uid: string) => void;
  reset: () => void;
  tick: (deltaMs: number) => void;
}

const createRoundId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const useGameStore = create<GameStore>((set, get) => {
  let timerId: ReturnType<typeof setInterval> | null = null;

  function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function syncTimer(phase: GamePhase) {
    if (phase !== GamePhase.Playing) {
      stopTimer();
      return;
    }

    if (timerId !== null) {
      return;
    }

    timerId = setInterval(() => {
      dispatch({ type: GameActionType.Tick, deltaMs: TICK_INTERVAL_MS });
    }, TICK_INTERVAL_MS);
  }

  function dispatch(action: GameAction) {
    set((state) => gameReducer(state, action));
    syncTimer(get().phase);
  }

  return {
    ...createInitialState(),
    start: (pairsCount) =>
      dispatch({ type: GameActionType.Start, pairsCount, roundId: createRoundId() }),
    flip: (uid) => dispatch({ type: GameActionType.Flip, uid }),
    reset: () => dispatch({ type: GameActionType.Reset }),
    tick: (deltaMs) => dispatch({ type: GameActionType.Tick, deltaMs }),
  };
});
