import React, { useMemo } from 'react';
import { Bar } from '@consta/charts/Bar';
import { IVizelProps, KoobDataService, useService } from 'bi-internal/services';
import { OrdersFiltersService } from '../services/OrdersFiltersService';
import { useFilterDefs } from './useFilterDefs';
import { IKoobDimension } from 'bi-internal/defs/bi';

const OrdersBar = ({
  subspace: { dimensions = [], koob = '', measures = [] },
}: IVizelProps) => {
  const { filters = {} } = useService<OrdersFiltersService>(
    OrdersFiltersService,
    koob
  );

  const filterDefs = useFilterDefs(filters);
  const yDimension: IKoobDimension = useMemo(() => {
    const yDimensionNames = dimensions.map(({ id }) => id).join(', ') || '';
    return {
      id: `concatWithSeparator(' ', ${yDimensionNames}):y`,
      sql: '',
      title: '',
      type: 'STRING',
    };
  }, []);

  const {
    loading,
    error,
    values = [],
  } = useService<KoobDataService>(
    KoobDataService,
    koob,
    [yDimension],
    measures,
    filterDefs
  );

  const chartValues = useMemo(
    () =>
      measures.flatMap(
        ({ id, title }) =>
          values?.map((value) => ({
            y: value.y,
            x: value[id],
            series: title,
          })) || []
      ),
    [values, measures]
  );

  if (loading || error) {
    return undefined;
  }

  return (
    <Bar
      style={{
        marginBottom: '20px',
        padding: '20px',
      }}
      data={chartValues}
      xField="x"
      yField="y"
      seriesField="series"
      isGroup
    />
  );
};

export default OrdersBar;
