import { GAME_CONFIG } from 'shared/config/game';

export const getRoundDurationMs = (pairsCount: number): number =>
  GAME_CONFIG.roundBaseDurationMs + GAME_CONFIG.roundDurationPerPairMs * pairsCount;
