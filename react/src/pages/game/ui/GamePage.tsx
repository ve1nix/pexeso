import { useGame } from 'entities/game/model/useGame';
import { StartGameForm } from 'features/start-game/ui/StartGameForm';
import { GameBoard } from 'widgets/game-board/ui/GameBoard';

import styles from './GamePage.module.css';

const formatTime = (milliseconds: number): string =>
  `00:${String(Math.ceil(milliseconds / 1000)).padStart(2, '0')}`;

export const GamePage = () => {
  const { state, start, flip, reset } = useGame();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>PAIRS</h1>

      {state.phase === 'won' && <p className={styles.result}>Все пары найдены!</p>}

      {state.phase === 'playing' && (
        <p className={styles.timer}>Осталось: {formatTime(state.timeLeftMs)}</p>
      )}

      {state.phase === 'setup' ? (
        <StartGameForm onSubmit={start} />
      ) : (
        <GameBoard state={state} onFlip={flip} onRestart={reset} />
      )}
    </main>
  );
};
