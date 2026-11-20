import type { CardFace } from 'entities/card/model/types';
import { GAME_CONFIG } from 'shared/config/game';

import { createDeck } from './deck';
import { GameActionType, type GameAction, type GameState } from './types';

export const createInitialState = (): GameState => ({
  phase: 'setup',
  cards: [],
  openCardUids: [],
  matchedFaces: [],
  pairsCount: GAME_CONFIG.defaultPairsCount,
  timeLeftMs: GAME_CONFIG.roundDurationMs,
});

const isFaceMatched = (state: GameState, face: CardFace): boolean =>
  state.matchedFaces.includes(face);

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GameActionType.Start:
      return {
        ...createInitialState(),
        phase: 'playing',
        cards: createDeck(action.pairsCount),
        pairsCount: action.pairsCount,
      };

    case GameActionType.Flip: {
      if (state.phase !== 'playing') {
        return state;
      }

      const card = state.cards.find(({ uid }) => uid === action.uid);
      if (!card || isFaceMatched(state, card.face) || state.openCardUids.includes(card.uid)) {
        return state;
      }

      const previousOpen = state.openCardUids.length === 2 ? [] : state.openCardUids;
      const openCardUids = [...previousOpen, card.uid];

      if (openCardUids.length < 2) {
        return { ...state, openCardUids };
      }

      const first = state.cards.find(({ uid }) => uid === openCardUids[0]);
      const second = state.cards.find(({ uid }) => uid === openCardUids[1]);
      if (!first || !second) {
        return { ...state, openCardUids: [] };
      }

      if (first.face !== second.face) {
        return { ...state, openCardUids };
      }

      const matchedFaces = [...state.matchedFaces, first.face];
      return {
        ...state,
        openCardUids: [],
        matchedFaces,
        phase: matchedFaces.length === state.pairsCount ? 'won' : 'playing',
      };
    }

    case GameActionType.Tick: {
      if (state.phase !== 'playing') {
        return state;
      }

      const timeLeftMs = Math.max(0, state.timeLeftMs - action.deltaMs);
      return timeLeftMs === 0 ? createInitialState() : { ...state, timeLeftMs };
    }

    case GameActionType.Reset:
      return createInitialState();

    default:
      return state;
  }
}
