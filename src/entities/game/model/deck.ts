import { CARD_FACES } from 'entities/card/model/cards';
import type { Card } from 'entities/card/model/types';
import { shuffle } from 'shared/lib/shuffle';

export const createDeck = (pairsCount: number): Card[] => {
  const faces = shuffle(CARD_FACES).slice(0, pairsCount);

  const cards = faces.flatMap((face) => [
    { uid: `${face}-1`, face },
    { uid: `${face}-2`, face },
  ]);

  return shuffle(cards);
};
