import { describe, expect, it } from 'vitest';

import { isValidPairsCount } from './validation';

describe('isValidPairsCount', () => {
  it.each([2, 4, 6, 8, 10])('accepts %i pairs', (value) => {
    expect(isValidPairsCount(value)).toBe(true);
  });

  it.each([0, 1, 3, 11, 1.5, Number.NaN])('rejects %s', (value) => {
    expect(isValidPairsCount(value)).toBe(false);
  });
});
