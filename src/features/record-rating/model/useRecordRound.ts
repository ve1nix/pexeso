import { useEffect } from 'react';

import { GamePhase, getRoundResult, useGameStore } from 'entities/game';
import { useRatingStore } from 'entities/rating';

export const useRecordRound = () => {
  const phase = useGameStore((state) => state.phase);
  const recordRound = useRatingStore((state) => state.recordRound);

  useEffect(() => {
    if (phase !== GamePhase.Won) {
      return;
    }

    recordRound(getRoundResult(useGameStore.getState()));
  }, [phase, recordRound]);
};
