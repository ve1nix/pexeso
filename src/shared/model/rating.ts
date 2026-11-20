export interface RoundResult {
  roundId: string;
  pairsCount: number;
  flips: number;
  minFlips: number;
  mistakes: number;
  timeLeftMs: number;
  durationMs: number;
  accuracy: number;
  timeRatio: number;
  score: number;
  maxScore: number;
  stars: number;
}

export interface DifficultyRecord {
  bestScore: number;
  bestStars: number;
  fewestFlips: number;
  mostTimeLeftMs: number;
}
