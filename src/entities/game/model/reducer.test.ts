import { describe, expect, it } from 'vitest';

import { createInitialState, gameReducer } from './reducer';
import { GameActionType, GamePhase, type GameState } from './types';

const startGame = (pairsCount: number): GameState =>
  gameReducer(createInitialState(), {
    type: GameActionType.Start,
    pairsCount,
    roundId: 'test-round',
  });

const matchFace = (state: GameState, face: GameState['cards'][number]['face']): GameState =>
  state.cards
    .filter((card) => card.face === face)
    .reduce(
      (current, card) => gameReducer(current, { type: GameActionType.Flip, uid: card.uid }),
      state,
    );

describe('gameReducer', () => {
  it('creates two cards for each selected face', () => {
    const state = startGame(4);

    expect(state.phase).toBe(GamePhase.Playing);
    expect(state.cards).toHaveLength(8);
    expect(new Set(state.cards.map(({ face }) => face)).size).toBe(4);
  });

  it('marks a pair as matched and clears opened cards', () => {
    const started = startGame(2);
    const face = started.cards[0].face;
    const state = matchFace(started, face);

    expect(state.matchedFaces).toEqual([face]);
    expect(state.openCardUids).toEqual([]);
    expect(state.flips).toBe(2);
    expect(state.phase).toBe(GamePhase.Playing);
  });

  it('counts a mistake when two different faces are opened', () => {
    const started = startGame(2);
    const first = started.cards[0];
    const second = started.cards.find(({ face }) => face !== first.face);
    if (!second) {
      throw new Error('Expected a card with a different face');
    }

    const state = [first, second].reduce(
      (current, card) => gameReducer(current, { type: GameActionType.Flip, uid: card.uid }),
      started,
    );

    expect(state.mistakes).toBe(1);
    expect(state.flips).toBe(2);
    expect(state.matchedFaces).toEqual([]);
  });

  it('wins after all pairs are matched', () => {
    let state = startGame(2);
    const faces = new Set(state.cards.map(({ face }) => face));

    for (const face of faces) {
      state = matchFace(state, face);
    }

    expect(state.phase).toBe(GamePhase.Won);
    expect(state.matchedFaces).toHaveLength(2);
  });

  it('decrements the timer and returns to setup when it expires', () => {
    const started = startGame(2);

    expect(gameReducer(started, { type: GameActionType.Tick, deltaMs: 1000 }).timeLeftMs).toBe(
      started.timeLeftMs - 1000,
    );
    expect(
      gameReducer(started, { type: GameActionType.Tick, deltaMs: started.timeLeftMs }).phase,
    ).toBe(GamePhase.Setup);
  });

  it('returns to setup on reset', () => {
    expect(gameReducer(startGame(2), { type: GameActionType.Reset }).phase).toBe(GamePhase.Setup);
  });
});
