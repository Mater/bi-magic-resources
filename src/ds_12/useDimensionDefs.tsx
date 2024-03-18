import { useMemo } from 'react';
import { KoobService, useService } from 'bi-internal/services';

export const useDimensionDefs = (koob: string, dimensions: string[]) => {
  const { dimensions: dimensionDefs } = useService<KoobService>(
    KoobService,
    koob
  );

  return useMemo(
    () => dimensionDefs?.filter(({ id }) => dimensions.includes(id)) || [],
    [dimensionDefs, dimensions]
  );
};
