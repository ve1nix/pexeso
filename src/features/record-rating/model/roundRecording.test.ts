import { beforeEach, describe, expect, it } from 'vitest';

import { useGameStore } from 'entities/game';
import { useRatingStore } from 'entities/rating';

import { subscribeToRoundRecording } from './roundRecording';

const winRound = () => {
  useGameStore.getState().start(2);
  const cards = useGameStore.getState().cards;
  const faces = new Set(cards.map(({ face }) => face));

  for (const face of faces) {
    for (const card of cards.filter((item) => item.face === face)) {
      useGameStore.getState().flip(card.uid);
    }
  }
};

describe('subscribeToRoundRecording', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
    useRatingStore.getState().resetRating();
  });

  it('records the round once when it is won', () => {
    const unsubscribe = subscribeToRoundRecording();

    winRound();

    expect(useRatingStore.getState().roundsCompleted).toBe(1);
    unsubscribe();
  });
});
