import { beforeEach, describe, expect, it } from 'vitest';

import type { RoundResult } from 'shared/model/rating';

import { useRatingStore } from './store';

const makeResult = (overrides: Partial<RoundResult> = {}): RoundResult => ({
  roundId: 'round-1',
  pairsCount: 4,
  flips: 8,
  minFlips: 8,
  mistakes: 0,
  timeLeftMs: 25_000,
  durationMs: 25_000,
  accuracy: 1,
  timeRatio: 1,
  score: 800,
  maxScore: 800,
  stars: 3,
  ...overrides,
});

describe('useRatingStore', () => {
  beforeEach(() => {
    useRatingStore.getState().resetRating();
  });

  it('records xp, stars and a difficulty record', () => {
    useRatingStore.getState().recordRound(makeResult());
    const state = useRatingStore.getState();

    expect(state.xp).toBe(800);
    expect(state.roundsCompleted).toBe(1);
    expect(state.totalStars).toBe(3);
    expect(state.records[4]).toMatchObject({ bestScore: 800, bestStars: 3, fewestFlips: 8 });
  });

  it('ignores the same round twice', () => {
    const { recordRound } = useRatingStore.getState();

    recordRound(makeResult());
    recordRound(makeResult());

    expect(useRatingStore.getState().xp).toBe(800);
    expect(useRatingStore.getState().roundsCompleted).toBe(1);
  });

  it('keeps the best score but improves fewer flips', () => {
    const { recordRound } = useRatingStore.getState();

    recordRound(makeResult());
    recordRound(makeResult({ roundId: 'round-2', score: 600, flips: 6, stars: 2 }));

    expect(useRatingStore.getState().records[4].bestScore).toBe(800);
    expect(useRatingStore.getState().records[4].fewestFlips).toBe(6);
  });

  it('clears the rating on reset', () => {
    useRatingStore.getState().recordRound(makeResult());
    useRatingStore.getState().resetRating();

    expect(useRatingStore.getState().xp).toBe(0);
    expect(useRatingStore.getState().records).toEqual({});
  });
});
