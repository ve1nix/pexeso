import { RATING_CONFIG } from 'shared/config/rating';

import styles from './Stars.module.css';

interface StarsProps {
  value: number;
  max?: number;
}

export const Stars = ({ value, max = RATING_CONFIG.maxStars }: StarsProps) => (
  <span className={styles.stars} aria-label={`${value} из ${max} звёзд`}>
    {Array.from({ length: max }, (_, index) => (
      <span
        key={index}
        className={index < value ? styles.filled : styles.empty}
        aria-hidden="true"
      >
        ✦
      </span>
    ))}
  </span>
);
