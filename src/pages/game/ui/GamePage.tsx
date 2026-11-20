import { Navigate, useNavigate } from 'react-router-dom';

import { GamePhase, getRoundResult, useGame } from 'entities/game';
import { useRecordRound } from 'features/record-rating';
import { RATING_CONFIG } from 'shared/config/rating';
import { ROUTES } from 'shared/config/routes';
import { formatDuration } from 'shared/lib/time';
import { Button } from 'shared/ui/Button';
import { Stars } from 'shared/ui/Stars';
import { GameBoard } from 'widgets/game-board';
import { PageLayout } from 'widgets/page-layout';
import { RankBadge } from 'widgets/rating-summary';

import styles from './GamePage.module.css';

export const GamePage = () => {
  const { state, start, flip, reset } = useGame();
  const navigate = useNavigate();

  useRecordRound();

  if (state.phase === GamePhase.Setup) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const result = state.phase === GamePhase.Won ? getRoundResult(state) : null;
  const gainedXp = result ? Math.round(result.score * RATING_CONFIG.xpPerScore) : 0;

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

        <div className={styles.hudCenter}>
          <span className={styles.motto}>Внимание · Память · Магия</span>
          <RankBadge compact />
        </div>

        <div className={`${styles.hudGroup} ${styles.hudTime}`}>
          <span className={styles.hudLabel}>Время</span>
          <div className={styles.manaWrap}>
            <div
              className={`${styles.manaCrystal} ${state.timeLeftMs <= 10000 ? styles.manaLow : ''}`}
            >
              <span className={styles.manaValue}>{formatDuration(state.timeLeftMs)}</span>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <section className={styles.victory}>
          <span className={styles.victoryMark} aria-hidden="true">
            ✦
          </span>
          <div className={styles.victoryBody}>
            <h2 className={styles.victoryTitle}>Победа!</h2>
            <p className={styles.victoryText}>Все пары найдены — колода покорилась вам.</p>
            <div className={styles.result}>
              <Stars value={result.stars} />
              <span className={styles.resultScore}>{result.score} очков</span>
              <span className={styles.resultXp}>+{gainedXp} XP</span>
            </div>
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
