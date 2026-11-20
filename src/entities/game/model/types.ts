import type { Card, CardFace } from 'shared/model/card';

export enum GamePhase {
  Setup = 'setup',
  Playing = 'playing',
  Won = 'won',
}

export interface GameState {
  phase: GamePhase;
  cards: Card[];
  openCardUids: string[];
  matchedFaces: CardFace[];
  pairsCount: number;
  timeLeftMs: number;
}

export enum GameActionType {
  Start = 'START',
  Flip = 'FLIP',
  Tick = 'TICK',
  Reset = 'RESET',
}

export type GameAction =
  | { type: GameActionType.Start; pairsCount: number }
  | { type: GameActionType.Flip; uid: string }
  | { type: GameActionType.Tick; deltaMs: number }
  | { type: GameActionType.Reset };
