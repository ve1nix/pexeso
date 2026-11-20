import { useState, type FormEvent } from 'react';

import { GAME_CONFIG } from 'shared/config/game';
import { PAIRS_OPTIONS } from 'shared/lib/pairs';
import { isValidPairsCount } from 'shared/lib/validation';
import { Button } from 'shared/ui/Button';

import styles from './StartGameForm.module.css';

interface StartGameFormProps {
  onSubmit: (pairsCount: number) => void;
}

const getPresetClassName = (value: string, pairs: number): string => {
  if (Number(value) === pairs) {
    return `${styles.preset} ${styles.presetActive}`;
  }

  return styles.preset;
};

export const StartGameForm = ({ onSubmit }: StartGameFormProps) => {
  const [value, setValue] = useState(String(GAME_CONFIG.defaultPairsCount));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pairsCount = Number(value);
    if (isValidPairsCount(pairsCount)) {
      onSubmit(pairsCount);
    }
  };

  return (
    <section className={styles.panel}>
      <span className={styles.portrait} aria-hidden="true">
        ✦
      </span>
      <h2 className={styles.heading}>Новая партия</h2>
      <p className={styles.description}>Выберите число пар рун и проверьте свою память</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="pairs-count">
          Количество пар
        </label>

        <div className={styles.field}>
          <div className={styles.control}>
            <input
              id="pairs-count"
              className={styles.input}
              type="number"
              min={GAME_CONFIG.minPairsCount}
              max={GAME_CONFIG.maxPairsCount}
              step={GAME_CONFIG.pairsCountStep}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <span className={styles.controlHint}>
            {GAME_CONFIG.minPairsCount} — {GAME_CONFIG.maxPairsCount}
          </span>
        </div>

        <div className={styles.presets} role="group" aria-label="Быстрый выбор числа пар">
          {PAIRS_OPTIONS.map((pairs) => (
            <button
              key={pairs}
              type="button"
              className={getPresetClassName(value, pairs)}
              onClick={() => setValue(String(pairs))}
            >
              {pairs}
            </button>
          ))}
        </div>

        <Button type="submit" className={styles.button}>
          Начать игру
        </Button>
      </form>
    </section>
  );
};
