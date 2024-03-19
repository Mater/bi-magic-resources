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

  const dimensionDefs = useDimensionDefs(koob, dimensions);
  const measureDefs = useMeasureDefs(measures);
  const filterDefs = useFilterDefs(filters);

  const { values } = useService<KoobDataService>(
    KoobDataService,
    koob,
    dimensionDefs,
    measureDefs,
    filterDefs
  );

  console.log(filters, filterDefs);

  return (
    <Bar
      style={{
        marginBottom: 'var(--space-m)',
        maxWidth: 300,
        maxHeight: 200,
      }}
      data={values}
      xField="sum_unitcost"
      yField="emp_fio"
    />
  );
};

export default OrdersBar;
