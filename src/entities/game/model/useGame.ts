import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useGameStore } from './store';

const TICK_INTERVAL_MS = 1000;

export const useGame = () => {
  const state = useGameStore(
    useShallow(({ phase, cards, openCardUids, matchedFaces, pairsCount, timeLeftMs }) => ({
      phase,
      cards,
      openCardUids,
      matchedFaces,
      pairsCount,
      timeLeftMs,
    })),
  );
  const { phase } = state;
  const start = useGameStore((store) => store.start);
  const flip = useGameStore((store) => store.flip);
  const reset = useGameStore((store) => store.reset);
  const tick = useGameStore((store) => store.tick);

  useEffect(() => {
    if (phase !== 'playing') {
      return;
    }

    const intervalId = setInterval(() => tick(TICK_INTERVAL_MS), TICK_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [phase, tick]);

  return { state, start, flip, reset };
};
