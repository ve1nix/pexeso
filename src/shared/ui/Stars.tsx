import { RATING_CONFIG } from 'shared/config/rating';

import styles from './Stars.module.css';

interface StarsProps {
  value: number;
  max?: number;
}

const getStarClassName = (index: number, value: number): string => {
  if (index < value) {
    return styles.filled;
  }

  return styles.empty;
};

export const Stars = ({ value, max = RATING_CONFIG.maxStars }: StarsProps) => (
  <span className={styles.stars} aria-label={`${value} из ${max} звёзд`}>
    {Array.from({ length: max }, (_, index) => (
      <span
        key={index}
        className={getStarClassName(index, value)}
        aria-hidden="true"
      >
        ✦
      </span>
    ))}
  </span>
);
