import { useMemo } from 'react';

export const useMeasureDefs = (measures: string[] = []) => {
  return useMemo(() => measures.map((formula) => ({ formula })), [measures]);
};
