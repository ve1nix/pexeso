import { getRankProgress, useRatingStore } from 'entities/rating';

import styles from './RankBadge.module.css';

interface RankBadgeProps {
  compact?: boolean;
}

export const RankBadge = ({ compact = false }: RankBadgeProps) => {
  const xp = useRatingStore((state) => state.xp);
  const { rank, nextRank, progress } = getRankProgress(xp);

  return (
    <div className={`${styles.badge} ${compact ? styles.compact : ''}`}>
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
        <p className={styles.hint}>
          {nextRank
            ? `До ранга «${nextRank.name}» — ${(nextRank.minXp - xp).toLocaleString('ru-RU')} XP`
            : 'Вы достигли высшего ранга'}
        </p>
      )}
    </div>
  );
};
