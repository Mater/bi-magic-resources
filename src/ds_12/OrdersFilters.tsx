import React from 'react';
import { Theme as ConstaTheme, presetGpnDefault } from '@consta/uikit/Theme';
import { Combobox } from '@consta/uikit/Combobox';
import { IVizelProps, useServiceItself } from 'bi-internal/services';
const Theme = ConstaTheme as any;

import './OrdersFilters.css';
import { OrdersFiltersService } from '../services/OrdersFiltersService';

const OrdersFilter = (props: IVizelProps) => {
  const {
    cfg: {
      dataSource: { koob, dimensions = [] },
    },
  } = props;

  const ordersFiltersService = useServiceItself<OrdersFiltersService>(
    OrdersFiltersService,
    koob,
    dimensions
  );

  const {
    loading,
    dimensions: dimensionsDictionary,
    filters,
  } = ordersFiltersService.getModel();

  if (loading) {
    return undefined;
  }

  return (
    <Theme preset={presetGpnDefault}>
      <div className="filters-container">
        {dimensions.map((dimension) => (
          <Combobox
            label={dimension}
            size="m"
            multiple
            selectAll
            items={dimensionsDictionary[dimension]}
            value={filters[dimension]}
            getItemKey={(item) => item}
            getItemLabel={(item) => item}
            onChange={(values) =>
              ordersFiltersService.updateFilter(dimension, values)
            }
          />
        ))}
      </div>
    </Theme>
  );
};

export default OrdersFilter;
