import { GamePhase, getRoundResult, useGameStore } from 'entities/game';
import { useRatingStore } from 'entities/rating';

export const subscribeToRoundRecording = (): (() => void) => {
  let previousPhase = useGameStore.getState().phase;

  return useGameStore.subscribe((state) => {
    if (state.phase === GamePhase.Won && previousPhase !== GamePhase.Won) {
      useRatingStore.getState().recordRound(getRoundResult(state));
    }

    previousPhase = state.phase;
  });
};
