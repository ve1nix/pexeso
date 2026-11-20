import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useGameStore } from './store';
import { GamePhase } from './types';

describe('useGameStore timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useGameStore.getState().reset();
  });

  afterEach(() => {
    useGameStore.getState().reset();
    vi.useRealTimers();
  });

  it('ticks while playing and stops after reset', () => {
    useGameStore.getState().start(2);
    const initial = useGameStore.getState().timeLeftMs;

    vi.advanceTimersByTime(2_000);

    expect(useGameStore.getState().timeLeftMs).toBe(initial - 2_000);

    useGameStore.getState().reset();
    const afterReset = useGameStore.getState().timeLeftMs;
    vi.advanceTimersByTime(3_000);

    expect(useGameStore.getState().timeLeftMs).toBe(afterReset);
  });

  it('stops when the round expires', () => {
    useGameStore.getState().start(2);
    const duration = useGameStore.getState().timeLeftMs;

    vi.advanceTimersByTime(duration);

    expect(useGameStore.getState().phase).toBe(GamePhase.Setup);

    const afterExpiry = useGameStore.getState().timeLeftMs;
    vi.advanceTimersByTime(2_000);

    expect(useGameStore.getState().timeLeftMs).toBe(afterExpiry);
  });
});
