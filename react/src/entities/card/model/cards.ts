import backImage from '../assets/shirt.jpg';
import twoClubs from '../assets/two-clubs.png';
import twoDiamonds from '../assets/two-diamonds.png';
import twoHearts from '../assets/two-hearts.png';
import twoSpades from '../assets/two-spades.png';
import threeClubs from '../assets/three-clubs.png';
import threeDiamonds from '../assets/three-diamonds.png';
import threeHearts from '../assets/three-hearts.png';
import threeSpades from '../assets/three-spades.png';
import fourClubs from '../assets/four-clubs.png';
import fourDiamonds from '../assets/four-diamonds.png';

import type { CardFace } from './types';

const FACE_IMAGES: Record<CardFace, string> = {
  'two-clubs': twoClubs,
  'two-diamonds': twoDiamonds,
  'two-hearts': twoHearts,
  'two-spades': twoSpades,
  'three-clubs': threeClubs,
  'three-diamonds': threeDiamonds,
  'three-hearts': threeHearts,
  'three-spades': threeSpades,
  'four-clubs': fourClubs,
  'four-diamonds': fourDiamonds,
};

export const CARD_FACES = Object.keys(FACE_IMAGES) as CardFace[];

export const CARD_BACK_IMAGE = backImage;

export const getCardFaceImage = (face: CardFace): string => FACE_IMAGES[face];
