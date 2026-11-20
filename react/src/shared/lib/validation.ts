import { GAME_CONFIG } from 'shared/config/game';

export const isValidPairsCount = (value: number): boolean =>
  Number.isInteger(value) &&
  value >= GAME_CONFIG.minPairsCount &&
  value <= GAME_CONFIG.maxPairsCount &&
  value % GAME_CONFIG.pairsCountStep === 0;
