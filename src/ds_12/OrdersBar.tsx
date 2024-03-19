import React from 'react';
import { Bar } from '@consta/charts/Bar';
import { IVizelProps, KoobDataService, useService } from 'bi-internal/services';
import { useDimensionDefs } from './useDimensionDefs';
import { useMeasureDefs } from './useMeasureDefs';
import { OrdersFiltersService } from '../services/OrdersFiltersService';
import { useFilterDefs } from './useFilterDefs';

const OrdersBar = ({ cfg: { dataSource } }: IVizelProps) => {
  const { koob, dimensions, measures } = dataSource || {};

  const { filters = {} } = useService<OrdersFiltersService>(
    OrdersFiltersService,
    koob
  );

  const [dimensionDef] = useDimensionDefs(koob, dimensions);
  const [measureDef] = useMeasureDefs(measures);
  const filterDefs = useFilterDefs(filters);

  const {
    loading,
    error,
    values = [],
  } = useService<KoobDataService>(
    KoobDataService,
    koob,
    [dimensionDef],
    [measureDef],
    filterDefs
  );

  if (!dimensionDef || !measureDef || loading || error) {
    return undefined;
  }

  return (
    <Bar
      style={{
        marginBottom: '20px',
        padding: '20px',
      }}
      data={values}
      xField="value"
      yField={dimensionDef.id}
    />
  );
};

export default OrdersBar;
