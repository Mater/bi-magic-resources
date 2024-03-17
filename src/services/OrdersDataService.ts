import { BaseService, IBaseModel } from '../../bi-internal/core';

declare global {
  interface Window {
    __ordersDataService: Record<string, OrdersDataService>;
  }
}

export class OrdersDataService extends BaseService<IBaseModel> {
  private readonly id: string;
  private constructor(koobId: string) {
    super({
      loading: false,
      error: null,
    });
    this.id = koobId;
  }

  public static createInstance(koobId: string): OrdersDataService {
    if (!window.__ordersDataService) {
      window.__ordersDataService = {};
    }

    // @ts-ignore hasOwnproperty
    if (!window.__ordersDataService.hasOwnproperty(koobId)) {
      window.__ordersDataService[koobId] = new OrdersDataService(koobId);
    }

    return window.__ordersDataService[koobId];
  }
}
