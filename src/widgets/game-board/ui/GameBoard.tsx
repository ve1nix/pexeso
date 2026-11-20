import { Card } from 'entities/card/ui/Card';
import { getCardStatus } from 'entities/game/model/selectors';
import type { GameState } from 'entities/game/model/types';
import { Button } from 'shared/ui/Button';

import styles from './GameBoard.module.css';

interface GameBoardProps {
  state: GameState;
  onFlip: (uid: string) => void;
  onRestart: () => void;
}

export const GameBoard = ({ state, onFlip, onRestart }: GameBoardProps) => (
  <>
    <ul className={styles.field}>
      {state.cards.map((card) => (
        <Card
          key={card.uid}
          card={card}
          status={getCardStatus(state, card)}
          onFlip={onFlip}
        />
      ))}
    </ul>
    {state.phase === 'won' && (
      <Button className={styles.restart} onClick={onRestart}>
        Сыграть ещё раз
      </Button>
    )}
  </>
);
