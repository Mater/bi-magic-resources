import { useMemo } from 'react';

export const useFilterDefs = (filters: Record<string, any[]> = {}) => {
  return useMemo(
    () =>
      Object.entries(filters).reduce(
        (filterDefs, [filterName, filterValues]) => {
          if (!Array.isArray(filterValues)) {
            return filterDefs;
          }

          return {
            ...filterDefs,
            [filterName]: ['=', ...filterValues],
          };
        },
        {}
      ),
    [filters]
  );
};
