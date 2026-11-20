export type CardFace = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

export const CARD_FACES: readonly CardFace[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
];

export interface Card {
  uid: string;
  face: CardFace;
}

export type CardStatus = 'hidden' | 'open' | 'matched';
