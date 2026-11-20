import { describe, expect, it } from 'vitest';

import { getRank, getRankProgress } from './selectors';

describe('getRank', () => {
  it('returns the lowest rank at zero xp', () => {
    expect(getRank(0).id).toBe('wood');
  });

  it('uses the highest reached threshold', () => {
    expect(getRank(1_999).id).toBe('wood');
    expect(getRank(2_000).id).toBe('bronze');
    expect(getRank(90_000).id).toBe('legend');
  });
});

describe('getRankProgress', () => {
  it('reports progress inside the current tier', () => {
    const progress = getRankProgress(4_000);

    expect(progress.rank.id).toBe('bronze');
    expect(progress.nextRank?.id).toBe('silver');
    expect(progress.progress).toBeCloseTo(0.5);
  });

  it('caps progress at the highest rank', () => {
    const progress = getRankProgress(120_000);

    expect(progress.nextRank).toBeNull();
    expect(progress.progress).toBe(1);
  });
});
