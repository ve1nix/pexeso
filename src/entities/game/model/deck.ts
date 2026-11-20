import { shuffle } from 'shared/lib/shuffle';
import { CARD_FACES, type Card } from 'shared/model/card';

export const createDeck = (pairsCount: number): Card[] => {
  const faces = shuffle(CARD_FACES).slice(0, pairsCount);

  const cards = faces.flatMap((face) => [
    { uid: `${face}-1`, face },
    { uid: `${face}-2`, face },
  ]);

  return shuffle(cards);
};
