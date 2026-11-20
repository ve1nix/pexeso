import { useEffect, useReducer } from 'react';

import { createInitialState, gameReducer } from './reducer';

const TICK_INTERVAL_MS = 1000;

export const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);

  useEffect(() => {
    if (state.phase !== 'playing') {
      return;
    }

    const intervalId = setInterval(() => {
      dispatch({ type: 'TICK', deltaMs: TICK_INTERVAL_MS });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [state.phase]);

  return {
    state,
    start: (pairsCount: number) => dispatch({ type: 'START', pairsCount }),
    flip: (uid: string) => dispatch({ type: 'FLIP', uid }),
    reset: () => dispatch({ type: 'RESET' }),
  };
};
