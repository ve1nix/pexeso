import type { Card, CardStatus } from 'entities/card/model/types';
import type { GameState } from './types';

export const getCardStatus = (state: GameState, card: Card): CardStatus => {
  if (state.matchedFaces.includes(card.face)) {
    return 'matched';
  }

  if (state.openCardUids.includes(card.uid)) {
    return 'open';
  }

  return 'hidden';
};
