export type CardFace =
  | 'two-clubs'
  | 'two-diamonds'
  | 'two-hearts'
  | 'two-spades'
  | 'three-clubs'
  | 'three-diamonds'
  | 'three-hearts'
  | 'three-spades'
  | 'four-clubs'
  | 'four-diamonds';

export interface Card {
  uid: string;
  face: CardFace;
}

export type CardStatus = 'hidden' | 'open' | 'matched';
