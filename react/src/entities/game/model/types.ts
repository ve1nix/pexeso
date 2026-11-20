import type { Card, CardFace } from 'entities/card/model/types';

export type GamePhase = 'setup' | 'playing' | 'won';

export interface GameState {
  phase: GamePhase;
  cards: Card[];
  openCardUids: string[];
  matchedFaces: CardFace[];
  pairsCount: number;
  timeLeftMs: number;
}

export type GameAction =
  | { type: 'START'; pairsCount: number }
  | { type: 'FLIP'; uid: string }
  | { type: 'TICK'; deltaMs: number }
  | { type: 'RESET' };
