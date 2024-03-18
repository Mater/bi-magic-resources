import React, { useMemo } from 'react';
import { Bar } from '@consta/charts/Bar';
import {
  IVizelProps,
  KoobDataService,
  KoobService,
  useService,
} from 'bi-internal/services';
import { useDimensionDefs } from './useDimensionDefs';

const OrdersBar = ({ cfg: { dataSource } }: IVizelProps) => {
  const { koob = '', dimensions = [], measures = [] } = dataSource || {};

  // const { filters } = useService<OrdersFiltersService>(
  //   OrdersFiltersService,
  //   koob
  // );

  const dimensionDefs = useDimensionDefs(koob, dimensions);

  const { measures: measuresDefs } = useService<KoobService>(KoobService, koob);
  const selectedMeasures = useMemo(
    () => measuresDefs?.filter(({ id }) => measures.includes(id)) || [],
    [dimensionDefs, dimensions]
  );

  console.log(measures, measuresDefs, selectedMeasures);

  const { values } = useService<KoobDataService>(
    KoobDataService,
    koob,
    dimensionDefs,
    measures.map((formula) => ({ formula })),
    {}
  );

  console.log(values);

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
