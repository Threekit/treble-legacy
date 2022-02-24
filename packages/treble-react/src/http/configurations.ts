import threekitRequest, { IMultiPageResponse } from './request';
import { IConfiguration } from '../threekit';

const CONFIGURATIONS_API_ROUTE = `/api/configurations`;

export interface IConfigurationResponse {
  createdAt: string;
  customerId: null | string;
  id: string;
  identifier: null;
  metadata: null | Record<string, any>;
  orgId: string;
  productId: string;
  productVersion: string;
  scope: null;
  shortId: string;
  thumbnail: null | string;
  variant: IConfiguration;
  attachments: Record<string, string>;
}

interface IConfigurationsResponse extends IMultiPageResponse {
  configurations: Array<IConfigurationResponse>;
}

export const postConfiguration = (formData: FormData) => {
  let error: undefined | string;
  if (!formData) error = 'Requires Form Data';
  if (error) throw new Error(error);
  return threekitRequest.post<IConfigurationResponse>({
    url: CONFIGURATIONS_API_ROUTE,
    formData,
  });
};

export const getSavedConfiguration = (configurationId: string) => {
  let error: undefined | string;
  if (!configurationId) error = 'Requires Configuration ID';
  if (error) throw new Error(error);
  return threekitRequest.get<IConfigurationResponse>(
    `${CONFIGURATIONS_API_ROUTE}/${configurationId}`
  );
};

export const getConfigurations = () =>
  threekitRequest.get<IConfigurationsResponse>({
    url: `${CONFIGURATIONS_API_ROUTE}`,
    includeOrgId: true,
  });
