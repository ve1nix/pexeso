import { useShallow } from 'zustand/react/shallow';

import type { DifficultyRecord } from 'shared/model/rating';

import { getRankProgress, type RankProgress } from './selectors';
import { useRatingStore } from './store';

export interface RatingSummary extends RankProgress {
  xp: number;
  roundsCompleted: number;
  totalStars: number;
  records: Record<number, DifficultyRecord>;
}

export const useRatingProgress = (): RankProgress =>
  useRatingStore(useShallow((state) => getRankProgress(state.xp)));

export const useRatingSummary = (): RatingSummary =>
  useRatingStore(
    useShallow((state) => ({
      xp: state.xp,
      roundsCompleted: state.roundsCompleted,
      totalStars: state.totalStars,
      records: state.records,
      ...getRankProgress(state.xp),
    })),
  );
