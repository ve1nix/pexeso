import { Link } from 'react-router-dom';

import { getRankProgress, useRatingStore } from 'entities/rating';
import { ROUTES } from 'shared/config/routes';
import { PAIRS_OPTIONS } from 'shared/lib/pairs';
import { formatDuration } from 'shared/lib/time';
import { Button } from 'shared/ui/Button';
import { Stars } from 'shared/ui/Stars';
import { PageLayout } from 'widgets/page-layout';
import { RankBadge } from 'widgets/rating-summary';

import styles from './RatingPage.module.css';

export const RatingPage = () => {
  const xp = useRatingStore((state) => state.xp);
  const roundsCompleted = useRatingStore((state) => state.roundsCompleted);
  const totalStars = useRatingStore((state) => state.totalStars);
  const records = useRatingStore((state) => state.records);
  const resetRating = useRatingStore((state) => state.resetRating);
  const { rank, nextRank } = getRankProgress(xp);

  const handleReset = () => {
    if (window.confirm('Сбросить весь рейтинг и рекорды?')) {
      resetRating();
    }
  };

  return (
    <PageLayout>
      <section className={styles.section}>
        <h2 className={styles.heading}>Мой рейтинг</h2>
        <RankBadge />
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{roundsCompleted}</span>
            <span className={styles.statLabel}>раундов</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{totalStars}</span>
            <span className={styles.statLabel}>звёзд</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{rank.name}</span>
            <span className={styles.statLabel}>ранг</span>
          </div>
        </div>
        {nextRank && (
          <p className={styles.note}>
            До ранга «{nextRank.name}» — {(nextRank.minXp - xp).toLocaleString('ru-RU')} XP
          </p>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.subheading}>Рекорды по сложности</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Пар</th>
                <th>Звёзды</th>
                <th>Очки</th>
                <th>Ходы</th>
                <th>Время</th>
              </tr>
            </thead>
            <tbody>
              {PAIRS_OPTIONS.map((pairs) => {
                const record = records[pairs];

                return (
                  <tr key={pairs}>
                    <td>{pairs}</td>
                    <td>{record ? <Stars value={record.bestStars} /> : '—'}</td>
                    <td>{record ? record.bestScore : '—'}</td>
                    <td>{record ? record.fewestFlips : '—'}</td>
                    <td>{record ? formatDuration(record.mostTimeLeftMs) : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className={styles.actions}>
        <Link className={styles.link} to={ROUTES.home}>
          К игре
        </Link>
        <Button className={styles.reset} onClick={handleReset}>
          Сбросить рейтинг
        </Button>
      </div>
    </PageLayout>
  );
};
