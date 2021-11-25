import threekitRequest, { IMultiPageResponse } from './request'

const ORDERS_API_ROUTE = '/api/orders'

export type STATUSES = 'List'

interface ICartItem {
  count: number
  metadata: null | Record<string, string>
  configurationId: string
}

export interface ICart {
  cart: Array<ICartItem>
}

interface IOrderShared extends ICart {
  name: string
  orgId: string
  platform: Record<string, any>
  metadata: Record<string, string>
  status: STATUSES
}

interface IOrderRequest extends IOrderShared {}

export interface IOrderResponse extends IOrderShared {
  id: string
  shortId: string
  customerId: null | string
  originOrgId: string
  derivative: Record<string, string>
  createdAt: string
  updatedAt: string
}

interface IOrdersResponse extends IMultiPageResponse {
  orders: Array<IOrderResponse>
}

export const createOrder = (data: IOrderRequest) => {
  let error: undefined | string
  if (!data) error = 'Requires Order Data'
  if (error) throw new Error(error)
  return threekitRequest.post<IOrderResponse>({
    url: ORDERS_API_ROUTE,
    data,
  })
}

export const editOrderCart = (orderId: string, data: ICart) => {
  let error: undefined | string
  if (!data) error = 'Requires Order Data'
  if (!orderId) error = 'Requires Order ID'
  if (error) throw new Error(error)
  return threekitRequest.put<IOrderResponse>({
    url: `${ORDERS_API_ROUTE}/${orderId}`,
    data,
  })
}

export const getOrder = (orderId: string) => {
  let error: undefined | string
  if (!orderId) error = 'Requires Order Id'
  if (error) throw new Error(error)
  return threekitRequest.get<IOrderResponse>(`${ORDERS_API_ROUTE}/${orderId}`)
}

export const fetchOrders = () =>
  threekitRequest.get<IOrdersResponse>({
    url: ORDERS_API_ROUTE,
    includeOrgId: true,
  })
