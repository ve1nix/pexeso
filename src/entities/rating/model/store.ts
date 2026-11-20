import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { RATING_CONFIG } from 'shared/config/rating';
import { safeStorage } from 'shared/lib/storage';
import type { DifficultyRecord, RoundResult } from 'shared/model/rating';

import type { RatingState } from './types';

interface RatingStore extends RatingState {
  recordRound: (result: RoundResult) => void;
  resetRating: () => void;
}

const RATING_VERSION = 1;

const createInitialRating = (): RatingState => ({
  version: RATING_VERSION,
  xp: 0,
  roundsCompleted: 0,
  totalStars: 0,
  lastRoundId: null,
  records: {},
});

const updateRecord = (
  current: DifficultyRecord | undefined,
  result: RoundResult,
): DifficultyRecord => ({
  bestScore: Math.max(current?.bestScore ?? 0, result.score),
  bestStars: Math.max(current?.bestStars ?? 0, result.stars),
  fewestFlips: Math.min(current?.fewestFlips ?? Number.POSITIVE_INFINITY, result.flips),
  mostTimeLeftMs: Math.max(current?.mostTimeLeftMs ?? 0, result.timeLeftMs),
});

export const useRatingStore = create<RatingStore>()(
  persist(
    (set) => ({
      ...createInitialRating(),
      recordRound: (result) =>
        set((state) => {
          if (state.lastRoundId === result.roundId) {
            return state;
          }

          return {
            ...state,
            xp: state.xp + Math.round(result.score * RATING_CONFIG.xpPerScore),
            roundsCompleted: state.roundsCompleted + 1,
            totalStars: state.totalStars + result.stars,
            lastRoundId: result.roundId,
            records: {
              ...state.records,
              [result.pairsCount]: updateRecord(state.records[result.pairsCount], result),
            },
          };
        }),
      resetRating: () => set(createInitialRating()),
    }),
    {
      name: RATING_CONFIG.storageKey,
      storage: createJSONStorage(() => safeStorage),
      version: RATING_VERSION,
      partialize: (state) => ({
        xp: state.xp,
        roundsCompleted: state.roundsCompleted,
        totalStars: state.totalStars,
        lastRoundId: state.lastRoundId,
        records: state.records,
        version: state.version,
      }),
    },
  ),
);
