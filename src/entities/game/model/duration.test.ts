import { describe, expect, it } from 'vitest';

import { getRoundDurationMs } from './duration';

describe('getRoundDurationMs', () => {
  it.each([
    [2, 15_000],
    [4, 25_000],
    [6, 35_000],
    [10, 55_000],
  ])('%i pairs -> %i ms', (pairsCount, expected) => {
    expect(getRoundDurationMs(pairsCount)).toBe(expected);
  });
});
