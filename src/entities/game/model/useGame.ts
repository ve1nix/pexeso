import { useShallow } from 'zustand/react/shallow';

import type { RoundResult } from 'shared/model/rating';

import { getRoundResult } from './selectors';
import { useGameStore } from './store';
import { GamePhase } from './types';

export const useGame = () => {
  const state = useGameStore(
    useShallow(
      ({
        phase,
        cards,
        openCardUids,
        matchedFaces,
        pairsCount,
        timeLeftMs,
        flips,
        mistakes,
        roundId,
      }) => ({
        phase,
        cards,
        openCardUids,
        matchedFaces,
        pairsCount,
        timeLeftMs,
        flips,
        mistakes,
        roundId,
      }),
    ),
  );
  const start = useGameStore((store) => store.start);
  const flip = useGameStore((store) => store.flip);
  const reset = useGameStore((store) => store.reset);

  return { state, start, flip, reset };
};

export const useRoundResult = (): RoundResult | null =>
  useGameStore(
    useShallow((state) => {
      if (state.phase !== GamePhase.Won) {
        return null;
      }

      return getRoundResult(state);
    }),
  );
