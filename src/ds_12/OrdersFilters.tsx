import React from 'react';
import { Theme as ConstaTheme, presetGpnDefault } from '@consta/uikit/Theme';
import { Combobox } from '@consta/uikit/Combobox';
import { IVizelProps, useServiceItself } from 'bi-internal/services';
const Theme = ConstaTheme as any;

import './OrdersFilters.css';
import { OrdersFiltersService } from '../services/OrdersFiltersService';
import { useDimensionDefs } from './useDimensionDefs';

const OrdersFilter = ({ cfg: { dataSource } }: IVizelProps) => {
  const { koob = '', dimensions = [] } = dataSource || {};

  const dimensionDefs = useDimensionDefs(koob, dimensions);

  const ordersFiltersService = useServiceItself<OrdersFiltersService>(
    OrdersFiltersService,
    koob,
    dimensions
  );

  const {
    loading,
    dimensions: dimensionsDictionary,
    filters,
  } = ordersFiltersService?.getModel() || {};

  if (ordersFiltersService && loading) {
    return undefined;
  }

  return (
    <Theme preset={presetGpnDefault}>
      <div className="filters-container">
        {dimensionDefs.map(({ id, title }) => (
          <Combobox
            label={title}
            size="m"
            multiple
            selectAll
            items={dimensionsDictionary[id]}
            value={filters[id]}
            getItemKey={(item) => item}
            getItemLabel={(item) => item}
            onChange={(values) => ordersFiltersService.updateFilter(id, values)}
          />
        ))}
      </div>
    </Theme>
  );
};

export default OrdersFilter;
