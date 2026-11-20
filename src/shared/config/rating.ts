export type RankId = 'wood' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'legend';

export interface Rank {
  id: RankId;
  name: string;
  minXp: number;
  color: string;
}

interface StarThresholds {
  three: number;
  two: number;
}

interface RatingConfig {
  scoreBasePerPair: number;
  accuracyWeight: number;
  timeWeight: number;
  maxStars: number;
  starThresholds: StarThresholds;
  xpPerScore: number;
  storageKey: string;
  ranks: readonly Rank[];
}

export const RATING_CONFIG: RatingConfig = {
  scoreBasePerPair: 100,
  accuracyWeight: 0.5,
  timeWeight: 0.5,
  maxStars: 3,
  starThresholds: { three: 0.8, two: 0.55 },
  xpPerScore: 1,
  storageKey: 'pexeso.rating.v1',
  ranks: [
    { id: 'wood', name: 'Дерево', minXp: 0, color: '#8b6b43' },
    { id: 'bronze', name: 'Бронза', minXp: 2_000, color: '#b87333' },
    { id: 'silver', name: 'Серебро', minXp: 6_000, color: '#c0c8d0' },
    { id: 'gold', name: 'Золото', minXp: 15_000, color: '#e2bd6b' },
    { id: 'platinum', name: 'Платина', minXp: 30_000, color: '#b9e6df' },
    { id: 'diamond', name: 'Алмаз', minXp: 55_000, color: '#8fd0ff' },
    { id: 'legend', name: 'Легенда', minXp: 90_000, color: '#ff8a5c' },
  ],
};
