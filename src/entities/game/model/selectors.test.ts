import { describe, expect, it } from 'vitest';

import { createInitialState } from './reducer';
import { getRoundResult } from './selectors';
import { GamePhase, type GameState } from './types';

const makeState = (overrides: Partial<GameState> = {}): GameState => ({
  ...createInitialState(),
  phase: GamePhase.Playing,
  pairsCount: 4,
  roundId: 'round-1',
  flips: 8,
  timeLeftMs: 25_000,
  ...overrides,
});

describe('getRoundResult', () => {
  it('awards three stars for a perfect round', () => {
    const result = getRoundResult(makeState());

    expect(result.minFlips).toBe(8);
    expect(result.accuracy).toBe(1);
    expect(result.timeRatio).toBe(1);
    expect(result.score).toBe(800);
    expect(result.stars).toBe(3);
  });

  it('lowers the score for extra flips and lost time', () => {
    const result = getRoundResult(makeState({ flips: 40, mistakes: 4, timeLeftMs: 5_000 }));

    expect(result.accuracy).toBeCloseTo(0.2);
    expect(result.timeRatio).toBe(0.2);
    expect(result.score).toBe(480);
    expect(result.stars).toBe(2);
  });

  it('gives one star for a very inefficient round', () => {
    const result = getRoundResult(makeState({ flips: 1_000, timeLeftMs: 0 }));

    expect(result.stars).toBe(1);
  });
});
