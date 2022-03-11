import threekitRequest from './request';

const DATATABLES_API_ROUTE = `/api/datatables`;

interface IDatatable {
  id: string;
  orgId: string;
  name: string;
  version: number;
  columnInfo: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  deletedBy: null | string;
}

export const getDatatablesList = () =>
  threekitRequest.get<{ datatables: Array<IDatatable> }>(DATATABLES_API_ROUTE);

export const getDatatable = (datatableId: string) => {
  let error: undefined | string;
  if (!datatableId) error = 'Requires a datatableId';
  if (error) throw new Error(error);
  //   return threekitRequest.get<Array<IDatatable>>(
  return threekitRequest.get<string>(
    `${DATATABLES_API_ROUTE}/${datatableId}/download`
  );
};
