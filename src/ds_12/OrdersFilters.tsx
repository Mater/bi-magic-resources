import React, { useEffect } from 'react';
import { Theme as ConstaTheme, presetGpnDefault } from '@consta/uikit/Theme';
import { Combobox } from '@consta/uikit/Combobox';
import { IVizelProps, useServiceItself } from 'bi-internal/services';
const Theme = ConstaTheme as any;

import './OrdersFilters.css';
import { OrdersFiltersService } from '../services/OrdersFiltersService';

const OrdersFilter = ({
  subspace: { koob = '', dimensions = [] },
}: IVizelProps) => {
  const ordersFiltersService = useServiceItself<OrdersFiltersService>(
    OrdersFiltersService,
    koob
  );

  useEffect(() => {
    ordersFiltersService.updateDimensions(dimensions.map(({ id }) => id));
  }, [ordersFiltersService, dimensions]);

  const {
    loading,
    error,
    dimensions: dimensionsDictionary,
    filters,
  } = ordersFiltersService.getModel();

  if (loading || error) {
    return undefined;
  }

  return (
    <Theme preset={presetGpnDefault}>
      <div className="filters-container">
        {dimensions.map(({ id, title }) => (
          <Combobox
            key={id}
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
