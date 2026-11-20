import { GAME_CONFIG } from 'shared/config/game';

export const PAIRS_OPTIONS = Array.from(
  {
    length:
      (GAME_CONFIG.maxPairsCount - GAME_CONFIG.minPairsCount) / GAME_CONFIG.pairsCountStep + 1,
  },
  (_, index) => GAME_CONFIG.minPairsCount + index * GAME_CONFIG.pairsCountStep,
);
