import { useRatingProgress, useRatingStore } from 'entities/rating';
import type { Rank } from 'shared/config/rating';

import styles from './RankBadge.module.css';

interface RankBadgeProps {
  compact?: boolean;
}

const getBadgeClassName = (compact: boolean): string => {
  if (compact) {
    return `${styles.badge} ${styles.compact}`;
  }

  return styles.badge;
};

const getRankHint = (nextRank: Rank | null, xp: number): string => {
  if (nextRank === null) {
    return 'Вы достигли высшего ранга';
  }

  return `До ранга «${nextRank.name}» — ${(nextRank.minXp - xp).toLocaleString('ru-RU')} XP`;
};

export const RankBadge = ({ compact = false }: RankBadgeProps) => {
  const xp = useRatingStore((state) => state.xp);
  const { rank, nextRank, progress } = useRatingProgress();

  return (
    <div className={getBadgeClassName(compact)}>
      <div className={styles.head}>
        <span className={styles.gem} style={{ backgroundColor: rank.color }} aria-hidden="true" />
        <span className={styles.name}>{rank.name}</span>
        <span className={styles.xp}>{xp.toLocaleString('ru-RU')} XP</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Прогресс до следующего ранга"
      >
        <div className={styles.fill} style={{ width: `${progress * 100}%` }} />
      </div>
      {!compact && (
        <p className={styles.hint}>{getRankHint(nextRank, xp)}</p>
      )}
    </div>
  );
};
