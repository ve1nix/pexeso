import { useState, type FormEvent } from 'react';

import { GAME_CONFIG } from 'shared/config/game';
import { isValidPairsCount } from 'shared/lib/validation';
import { Button } from 'shared/ui/Button';

import styles from './StartGameForm.module.css';

interface StartGameFormProps {
  onSubmit: (pairsCount: number) => void;
}

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="pairs-count">
        Количество пар
      </label>
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
      <Button type="submit" className={styles.button}>
        Начать игру
      </Button>
    </form>
  );
};
