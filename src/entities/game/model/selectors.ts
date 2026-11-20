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

const getAccuracy = (flips: number, minFlips: number): number => {
  if (flips === 0) {
    return 0;
  }

  return Math.min(1, minFlips / flips);
};

const getTimeRatio = (timeLeftMs: number, durationMs: number): number => {
  if (durationMs === 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, timeLeftMs / durationMs));
};

const getScoreRatio = (score: number, maxScore: number): number => {
  if (maxScore === 0) {
    return 0;
  }

  return score / maxScore;
};

const getStars = (ratio: number): number => {
  if (ratio >= RATING_CONFIG.starThresholds.three) {
    return 3;
  }
  if (ratio >= RATING_CONFIG.starThresholds.two) {
    return 2;
  }

  return 1;
};

export const getRoundResult = (state: GameState): RoundResult => {
  const durationMs = getRoundDurationMs(state.pairsCount);
  const minFlips = state.pairsCount * 2;
  const accuracy = getAccuracy(state.flips, minFlips);
  const timeRatio = getTimeRatio(state.timeLeftMs, durationMs);
  const base = RATING_CONFIG.scoreBasePerPair * state.pairsCount;
  const score = Math.round(
    base * (1 + RATING_CONFIG.accuracyWeight * accuracy + RATING_CONFIG.timeWeight * timeRatio),
  );
  const maxScore = Math.round(
    base * (1 + RATING_CONFIG.accuracyWeight + RATING_CONFIG.timeWeight),
  );
  const ratio = getScoreRatio(score, maxScore);
  const stars = getStars(ratio);

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
