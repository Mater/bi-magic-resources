import { useMemo } from 'react';

export const useMeasureDefs = (measures: string[] = []) => {
  return useMemo(
    () =>
      measures.map((measure) => ({
        formula: `${measure.split(':')[0]}:value`,
      })),
    [measures]
  );
};
