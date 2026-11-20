import type { Card, CardStatus } from 'shared/model/card';
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
