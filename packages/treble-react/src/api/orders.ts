import http from '../http';
import { ICartItem, STATUSES, IOrderResponse } from '../http/orders';
import connection from '../connection';

export interface ICreateOrder {
  name?: string;
  metadata?: Record<string, string>;
  platform?: Record<string, string>;
  status?: STATUSES;
  cart: Array<ICartItem>;
}

export const getOrder = async (orderId: string) => {
  return new Promise<IOrderResponse>(async resolve => {
    const orders = await http.orders.getOrder(orderId);
    resolve(orders.data);
  });
};

export const fetchOrders = async (metadataQuery: Record<string, string>) => {
  return new Promise<Array<IOrderResponse>>(async resolve => {
    const orders = await http.orders.fetchOrders();

    let output = orders.data.orders;

    if (metadataQuery) {
      const [key, value] = Object.entries(metadataQuery)[0];
      output = orders.data.orders.filter(
        order => order.metadata?.[key] === value
      );
    }

    resolve(output);
  });
};

export const createOrder = async (order: ICreateOrder) => {
  return new Promise<IOrderResponse>(async resolve => {
    const { orgId } = connection.getConnection();
    const { name, cart, metadata, platform, status } = order;
    const data = {
      name,
      cart,
      orgId,
      platform: platform || {},
      metadata: metadata || {},
      status: status || 'List',
    };

    const createOrder = await http.orders.createOrder(data);

    resolve(createOrder.data);
  });
};

export const editOrder = async (orderId: string, data: Array<ICartItem>) => {
  return new Promise<IOrderResponse>(async resolve => {
    if (!orderId) throw new Error('Missing Order ID');
    if (!data) throw new Error('Missing New Cart data for Cart Order update.');

    const cart = await http.orders.editOrderCart(orderId, data);
    resolve(cart.data);
  });
};
