interface GameConfig {
  defaultPairsCount: number;
  minPairsCount: number;
  maxPairsCount: number;
  pairsCountStep: number;
  roundBaseDurationMs: number;
  roundDurationPerPairMs: number;
}

export const GAME_CONFIG: GameConfig = {
  defaultPairsCount: 4,
  minPairsCount: 2,
  maxPairsCount: 10,
  pairsCountStep: 2,
  roundBaseDurationMs: 5_000,
  roundDurationPerPairMs: 5_000,
};
