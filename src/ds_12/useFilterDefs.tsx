import { useMemo } from 'react';

export const useFilterDefs = (filters: Record<string, any> = {}) => {
  return useMemo(
    () =>
      Object.entries(filters).reduce(
        (filterDefs, [filterName, filterValues]) => ({
          ...filterDefs,
          [filterName]: ['=', ...filterValues],
        }),
        {}
      ),
    [filters]
  );
};
