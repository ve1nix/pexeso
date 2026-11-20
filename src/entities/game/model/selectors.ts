import { RATING_CONFIG } from 'shared/config/rating';
import type { Card, CardStatus } from 'shared/model/card';
import type { RoundResult } from 'shared/model/rating';

import { getRoundDurationMs } from './duration';
import type { GameState } from './types';

export const getCardStatus = (state: GameState, card: Card): CardStatus => {
  if (state.matchedFaces.includes(card.face)) {
    return 'matched';
  }

  if (state.openCardUids.includes(card.uid)) {
    return 'open';
  }

  return 'hidden';
};

export const getRoundResult = (state: GameState): RoundResult => {
  const durationMs = getRoundDurationMs(state.pairsCount);
  const minFlips = state.pairsCount * 2;
  const accuracy = state.flips > 0 ? Math.min(1, minFlips / state.flips) : 0;
  const timeRatio = durationMs > 0 ? Math.min(1, Math.max(0, state.timeLeftMs / durationMs)) : 0;
  const base = RATING_CONFIG.scoreBasePerPair * state.pairsCount;
  const score = Math.round(
    base * (1 + RATING_CONFIG.accuracyWeight * accuracy + RATING_CONFIG.timeWeight * timeRatio),
  );
  const maxScore = Math.round(
    base * (1 + RATING_CONFIG.accuracyWeight + RATING_CONFIG.timeWeight),
  );
  const ratio = maxScore > 0 ? score / maxScore : 0;
  const stars =
    ratio >= RATING_CONFIG.starThresholds.three
      ? 3
      : ratio >= RATING_CONFIG.starThresholds.two
        ? 2
        : 1;

  return {
    roundId: state.roundId,
    pairsCount: state.pairsCount,
    flips: state.flips,
    minFlips,
    mistakes: state.mistakes,
    timeLeftMs: state.timeLeftMs,
    durationMs,
    accuracy,
    timeRatio,
    score,
    maxScore,
    stars,
  };
};
