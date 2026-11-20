import { RATING_CONFIG, type Rank } from 'shared/config/rating';

export interface RankProgress {
  rank: Rank;
  nextRank: Rank | null;
  progress: number;
  currentMinXp: number;
  nextMinXp: number | null;
}

export const getRank = (xp: number): Rank => {
  const ranks = RATING_CONFIG.ranks;
  let current: Rank = ranks[0];

  for (const rank of ranks) {
    if (xp >= rank.minXp) {
      current = rank;
    }
  }

  return current;
};

export const getRankProgress = (xp: number): RankProgress => {
  const ranks = RATING_CONFIG.ranks;
  const current = getRank(xp);
  const currentIndex = ranks.findIndex((rank) => rank.id === current.id);
  const nextRank = ranks[currentIndex + 1] ?? null;
  const progress = nextRank
    ? Math.min(1, Math.max(0, (xp - current.minXp) / (nextRank.minXp - current.minXp)))
    : 1;

  return {
    rank: current,
    nextRank,
    progress,
    currentMinXp: current.minXp,
    nextMinXp: nextRank?.minXp ?? null,
  };
};
