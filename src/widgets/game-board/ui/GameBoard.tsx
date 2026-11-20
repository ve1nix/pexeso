import { Card } from 'entities/card';
import { getCardStatus, type GameState } from 'entities/game';
import type { CssVariables } from 'shared/lib/cssVariables';

import styles from './GameBoard.module.css';

interface GameBoardProps {
  state: GameState;
  onFlip: (uid: string) => void;
}

const COMPACT_BOARD_SIZE = 4;
const MEDIUM_BOARD_SIZE = 12;

const getColumns = (cardsCount: number): number => {
  if (cardsCount <= COMPACT_BOARD_SIZE) return 2;
  if (cardsCount <= MEDIUM_BOARD_SIZE) return 4;
  return 5;
};

const getFieldStyle = (cardsCount: number): CssVariables => ({
  '--columns': getColumns(cardsCount),
});

export const GameBoard = ({ state, onFlip }: GameBoardProps) => (
  <div className={styles.board}>
    <div className={styles.boardInner}>
      <ul
        className={styles.field}
        style={getFieldStyle(state.cards.length)}
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
