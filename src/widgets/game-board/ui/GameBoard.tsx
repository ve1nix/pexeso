import type { CSSProperties } from 'react';

import { Card } from 'entities/card/ui/Card';
import { getCardStatus } from 'entities/game/model/selectors';
import type { GameState } from 'entities/game/model/types';

import styles from './GameBoard.module.css';

interface GameBoardProps {
  state: GameState;
  onFlip: (uid: string) => void;
}

const getColumns = (cardsCount: number): number => {
  if (cardsCount <= 4) return 2;
  if (cardsCount <= 12) return 4;
  return 5;
};

export const GameBoard = ({ state, onFlip }: GameBoardProps) => (
  <div className={styles.board}>
    <div className={styles.boardInner}>
      <ul
        className={styles.field}
        style={{ '--columns': getColumns(state.cards.length) } as CSSProperties}
      >
        {state.cards.map((card) => (
          <Card
            key={card.uid}
            card={card}
            status={getCardStatus(state, card)}
            onFlip={onFlip}
          />
        ))}
      </ul>
    </div>
  </div>
);
