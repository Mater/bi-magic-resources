import { AppConfig, BaseService, IBaseModel } from 'bi-internal/core';
import axios from 'axios';

declare global {
  interface Window {
    __ordersFiltersService: Record<string, OrdersFiltersService>;
  }
}

interface IOrdersFiltersModel extends IBaseModel {
  filters: Record<string, any>;
  dimensions: Record<string, any>;
}

export class OrdersFiltersService extends BaseService<IOrdersFiltersModel> {
  private readonly koob: string;

  private constructor(koob: string = '', dimensions: string[] = []) {
    super({
      loading: true,
      error: null,
      filters: {},
      dimensions: {},
    });
    this.koob = koob;

    this.fetchData(koob, dimensions);
  }

  private async fetchData(koob: string = '', dimensions: string[] = []) {
    const { data } = await axios.post(
      AppConfig.fixRequestUrl('/api/v3/koob/data'),
      {
        with: koob,
        columns: dimensions,
        filters: {},
        distinct: dimensions,
      }
    );

    if (!Array.isArray(data)) {
      this._updateWithError('No data');
      return;
    }

    const distinctDimensions = dimensions.reduce((dictionary, dimension) => {
      return {
        ...dictionary,
        [dimension]: Array.from(
          new Set(data.map((item) => item[dimension]))
        ).sort(),
      };
    }, {});

    this._updateWithData({
      dimensions: distinctDimensions,
    });
  }

  public updateFilter(dimension: string, values: any[]) {
    this._updateModel({
      filters: {
        ...this._model.filters,
        [dimension]: values,
      },
    });
  }

  public static createInstance(
    koob: string,
    dimensions: string[]
  ): OrdersFiltersService {
    if (!window.__ordersFiltersService) {
      window.__ordersFiltersService = {};
    }

    if (!window.__ordersFiltersService.hasOwnProperty(koob)) {
      window.__ordersFiltersService[koob] = new OrdersFiltersService(
        koob,
        dimensions
      );
    }

    return window.__ordersFiltersService[koob];
  }
}
