import type { DifficultyRecord } from 'shared/model/rating';

export interface RatingState {
  version: number;
  xp: number;
  roundsCompleted: number;
  totalStars: number;
  lastRoundId: string | null;
  records: Record<number, DifficultyRecord>;
}
