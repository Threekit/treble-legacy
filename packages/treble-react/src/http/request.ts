import axios from 'axios';
import connection, { ThreekitConnection } from '../connection';
import { objectToQueryStr } from '../utils';

interface IRequest {
  url: string;
  data?: { [key: string]: any };
  params?: { [key: string]: string };
  config?: { [key: string]: any };
  formData?: FormData;
  includeOrgId?: boolean;
}

export interface IMultiPageResponse {
  count: number;
  page: number;
  perPage: number;
  sort: string;
}

const prepRequest = (request: IRequest, connection: ThreekitConnection) => {
  const { url, data, formData, params, config, includeOrgId } = Object.assign(
    {
      params: {},
      includeOrgId: false,
      data: undefined,
      formData: undefined,
      config: undefined,
    },
    request
  );

  const { authToken, orgId, threekitDomain } = connection.getConnection();

  const urlRaw = `${threekitDomain}${url}`;

  const query = objectToQueryStr(
    Object.assign({}, includeOrgId ? { orgId } : {}, params)
  );
  let urlPrepped = `${urlRaw}${query}`;

  urlPrepped += `${query.length ? `&` : `?`}bearer_token=${authToken}`;

  return { url: urlPrepped, data: formData || data, config };
};

const get = <T>(request: IRequest | string) => {
  if (!request) throw new Error('Request missing');
  const requestObj = typeof request === 'string' ? { url: request } : request;
  const { url, config } = prepRequest(requestObj, connection);
  return axios.get<T>(url, config);
};

const post = <T>(request: IRequest) => {
  if (!request) throw new Error('Request missing');
  const { url, data, config } = prepRequest(request, connection);
  return axios.post<T>(url, data, config);
};

const put = <T>(request: IRequest) => {
  if (!request) throw new Error('Request missing');
  const { url, data, config } = prepRequest(request, connection);
  return axios.put<T>(url, data, config);
};

const del = <T>(request: IRequest) => {
  if (!request) throw new Error('Request missing');
  const { url, config } = prepRequest(request, connection);
  return axios.delete<T>(url, config);
};

export default {
  get,
  post,
  put,
  delete: del,
};
