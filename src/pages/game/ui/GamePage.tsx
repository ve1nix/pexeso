import { Navigate, useNavigate } from 'react-router-dom';

import { GamePhase, useGame } from 'entities/game';
import { ROUTES } from 'shared/config/routes';
import { Button } from 'shared/ui/Button';
import { GameBoard } from 'widgets/game-board';
import { PageLayout } from 'widgets/page-layout';

import styles from './GamePage.module.css';

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
};

export const GamePage = () => {
  const { state, start, flip, reset } = useGame();
  const navigate = useNavigate();

  if (state.phase === GamePhase.Setup) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const handleNewGame = () => {
    reset();
    navigate(ROUTES.home);
  };

  const handleReplay = () => {
    start(state.pairsCount);
  };

  return (
    <PageLayout>
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

      {state.phase === GamePhase.Won && (
        <section className={styles.victory}>
          <span className={styles.victoryMark} aria-hidden="true">
            ✦
          </span>
          <div className={styles.victoryBody}>
            <h2 className={styles.victoryTitle}>Победа!</h2>
            <p className={styles.victoryText}>Все пары найдены — колода покорилась вам.</p>
          </div>
          <Button className={styles.victoryButton} onClick={handleReplay}>
            Сыграть ещё раз
          </Button>
        </section>
      )}

      <GameBoard state={state} onFlip={flip} />

      {state.phase === GamePhase.Playing && (
        <div className={styles.footnote}>
          <Button className={styles.newGameButton} onClick={handleNewGame}>
            Новая игра
          </Button>
        </div>
      )}
    </PageLayout>
  );
};
