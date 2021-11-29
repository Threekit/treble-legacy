import threekitRequest, { IMultiPageResponse } from './request';
import connection from '../connection';

export interface IPricebook {
  createdAt: string;
  createdBy: string;
  currencies: Array<string>;
  deletedAt: null | string;
  id: string;
  name: string;
  orgId: string;
}

interface IPricebookList extends IMultiPageResponse {
  pricebooks: Array<IPricebook>;
}

export const getList = () => {
  const { orgId } = connection.getConnection();
  return threekitRequest.get<IPricebookList>(`/api/orgs/${orgId}/pricebooks`);
};
