import { useEffect } from 'react';

import { subscribeToRoundRecording } from './roundRecording';

export const useRecordRound = () => {
  useEffect(() => subscribeToRoundRecording(), []);
};
