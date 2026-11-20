import { useGame } from 'entities/game/model/useGame';
import { StartGameForm } from 'features/start-game/ui/StartGameForm';
import { Button } from 'shared/ui/Button';
import { GameBoard } from 'widgets/game-board/ui/GameBoard';

import styles from './GamePage.module.css';

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
};

export const GamePage = () => {
  const { state, start, flip, reset } = useGame();

  return (
    <main className={styles.page}>
      <div className={styles.table}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoEmblem} aria-hidden="true">
              <span>✦</span>
            </span>
            <h1 className={styles.title}>Pexeso</h1>
          </div>
          <p className={styles.subtitle}>Руны памяти · Колода мастеров</p>
        </header>

        {state.phase === 'setup' ? (
          <StartGameForm onSubmit={start} />
        ) : (
          <>
            <div className={styles.hud}>
              <div className={styles.hudGroup}>
                <span className={styles.hudLabel}>Найдено пар</span>
                <span className={styles.hudValue}>
                  {state.matchedFaces.length}
                  <span className={styles.hudDivider}>/</span>
                  {state.pairsCount}
                </span>
              </div>

              <span className={styles.motto}>Внимание · Память · Магия</span>

              <div className={`${styles.hudGroup} ${styles.hudTime}`}>
                <span className={styles.hudLabel}>Время</span>
                <div className={styles.manaWrap}>
                  <div
                    className={`${styles.manaCrystal} ${state.timeLeftMs <= 10000 ? styles.manaLow : ''}`}
                  >
                    <span className={styles.manaValue}>{formatTime(state.timeLeftMs)}</span>
                  </div>
                </div>
              </div>
            </div>

            {state.phase === 'won' && (
              <section className={styles.victory}>
                <span className={styles.victoryMark} aria-hidden="true">
                  ✦
                </span>
                <div className={styles.victoryBody}>
                  <h2 className={styles.victoryTitle}>Победа!</h2>
                  <p className={styles.victoryText}>Все пары найдены — колода покорилась вам.</p>
                </div>
                <Button className={styles.victoryButton} onClick={reset}>
                  Сыграть ещё раз
                </Button>
              </section>
            )}

            <GameBoard state={state} onFlip={flip} />

            {state.phase === 'playing' && (
              <div className={styles.footnote}>
                <Button className={styles.newGameButton} onClick={reset}>
                  Новая игра
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};
