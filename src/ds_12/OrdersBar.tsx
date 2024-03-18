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
    measuresDefs[0],
    {},
    2
  );

  const dataSimple = [
    { parameter: 'Параметр 1', number: 1234 },
    { parameter: 'Параметр 2', number: 1083 },
    { parameter: 'Параметр 3', number: 672 },
    { parameter: 'Параметр 4', number: 301 },
    { parameter: 'Параметр 5', number: 167 },
  ];

  return (
    <Bar
      style={{
        marginBottom: 'var(--space-m)',
        maxWidth: 300,
        maxHeight: 200,
      }}
      data={dataSimple}
      xField="number"
      yField="parameter"
    />
  );
};

export default OrdersBar;
