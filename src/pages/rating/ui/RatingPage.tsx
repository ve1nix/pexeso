import { Link } from 'react-router-dom';

import { useRatingStore, useRatingSummary } from 'entities/rating';
import { ROUTES } from 'shared/config/routes';
import { PAIRS_OPTIONS } from 'shared/lib/pairs';
import { formatDuration } from 'shared/lib/time';
import type { DifficultyRecord } from 'shared/model/rating';
import { Button } from 'shared/ui/Button';
import { Stars } from 'shared/ui/Stars';
import { PageLayout } from 'widgets/page-layout';
import { RankBadge } from 'widgets/rating-summary';

import styles from './RatingPage.module.css';

interface RecordRowProps {
  pairs: number;
  record?: DifficultyRecord;
}

const RecordRow = ({ pairs, record }: RecordRowProps) => {
  if (record === undefined) {
    return (
      <tr>
        <td>{pairs}</td>
        <td colSpan={4}>—</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{pairs}</td>
      <td>
        <Stars value={record.bestStars} />
      </td>
      <td>{record.bestScore}</td>
      <td>{record.fewestFlips}</td>
      <td>{formatDuration(record.mostTimeLeftMs)}</td>
    </tr>
  );
};

export const RatingPage = () => {
  const { xp, roundsCompleted, totalStars, records, rank, nextRank } = useRatingSummary();
  const resetRating = useRatingStore((state) => state.resetRating);

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
              {PAIRS_OPTIONS.map((pairs) => (
                <RecordRow key={pairs} pairs={pairs} record={records[pairs]} />
              ))}
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
