import { GAME_CONFIG } from 'shared/config/game';
import type { CardFace } from 'shared/model/card';

import { createDeck } from './deck';
import { getRoundDurationMs } from './duration';
import { GameActionType, GamePhase, type GameAction, type GameState } from './types';

export const createInitialState = (): GameState => ({
  phase: GamePhase.Setup,
  cards: [],
  openCardUids: [],
  matchedFaces: [],
  pairsCount: GAME_CONFIG.defaultPairsCount,
  timeLeftMs: getRoundDurationMs(GAME_CONFIG.defaultPairsCount),
  flips: 0,
  mistakes: 0,
  roundId: '',
});

const isFaceMatched = (state: GameState, face: CardFace): boolean =>
  state.matchedFaces.includes(face);

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GameActionType.Start:
      return {
        ...createInitialState(),
        phase: GamePhase.Playing,
        cards: createDeck(action.pairsCount),
        pairsCount: action.pairsCount,
        timeLeftMs: getRoundDurationMs(action.pairsCount),
        roundId: action.roundId,
      };

    case GameActionType.Flip: {
      if (state.phase !== GamePhase.Playing) {
        return state;
      }

      const card = state.cards.find(({ uid }) => uid === action.uid);
      if (!card || isFaceMatched(state, card.face) || state.openCardUids.includes(card.uid)) {
        return state;
      }

      const previousOpen = state.openCardUids.length === 2 ? [] : state.openCardUids;
      const openCardUids = [...previousOpen, card.uid];
      const flips = state.flips + 1;

      if (openCardUids.length < 2) {
        return { ...state, openCardUids, flips };
      }

      const first = state.cards.find(({ uid }) => uid === openCardUids[0]);
      const second = state.cards.find(({ uid }) => uid === openCardUids[1]);
      if (!first || !second) {
        return { ...state, openCardUids: [], flips };
      }

      if (first.face !== second.face) {
        return { ...state, openCardUids, flips, mistakes: state.mistakes + 1 };
      }

      const matchedFaces = [...state.matchedFaces, first.face];
      return {
        ...state,
        openCardUids: [],
        matchedFaces,
        flips,
        phase: matchedFaces.length === state.pairsCount ? GamePhase.Won : GamePhase.Playing,
      };
    }

    case GameActionType.Tick: {
      if (state.phase !== GamePhase.Playing) {
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
