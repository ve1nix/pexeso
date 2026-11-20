import { getCardFaceImage, CARD_BACK_IMAGE } from '../model/cards';
import type { Card as CardEntity, CardStatus } from '../model/types';
import styles from './Card.module.css';

interface CardProps {
  card: CardEntity;
  status: CardStatus;
  onFlip: (uid: string) => void;
}

export const Card = ({ card, status, onFlip }: CardProps) => {
  const isFaceUp = status !== 'hidden';
  const backgroundImage = isFaceUp ? getCardFaceImage(card.face) : CARD_BACK_IMAGE;

  return (
    <li className={styles.card}>
      <button
        type="button"
        className={`${styles.cardButton} ${isFaceUp ? styles.faceUp : ''}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        onClick={() => onFlip(card.uid)}
        aria-label={isFaceUp ? card.face : 'Закрытая карточка'}
      />
    </li>
  );
};
