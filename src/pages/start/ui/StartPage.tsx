import { Link, useNavigate } from 'react-router-dom';

import { GamePhase, useGame } from 'entities/game';
import { StartGameForm } from 'features/start-game';
import { ROUTES } from 'shared/config/routes';
import { PageLayout } from 'widgets/page-layout';
import { RankBadge } from 'widgets/rating-summary';

import styles from './StartPage.module.css';

export const StartPage = () => {
  const { state, start } = useGame();
  const navigate = useNavigate();

  const handleStart = (pairsCount: number) => {
    start(pairsCount);
    navigate(ROUTES.game);
  };

  return (
    <PageLayout>
      <StartGameForm onSubmit={handleStart} />
      <div className={styles.rating}>
        <RankBadge />
        <Link to={ROUTES.rating}>Мой рейтинг</Link>
      </div>
      {state.phase !== GamePhase.Setup && (
        <p className={styles.continue}>
          <Link to={ROUTES.game}>Вернуться в текущую игру</Link>
        </p>
      )}
    </PageLayout>
  );
};
