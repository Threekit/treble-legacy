import http from '../http';
import { IConfigurationResponse } from '../http/configurations';
import { IConfiguration, IMetadata } from '../threekit';

export interface ISaveConfiguration {
  assetId: string;
  customerId?: string;
  configuration: IConfiguration;
  metadata?: IMetadata;
  productVersion?: string;
  attachments?: Record<string, File>;
}

export const save = async (saveConfig: ISaveConfiguration) => {
  const {
    assetId,
    customerId,
    configuration,
    metadata,
    productVersion,
    attachments,
  } = saveConfig;
  let error: string | undefined;
  if (!assetId) error = 'Requires Asset Id';
  if (!configuration) error = 'Requires a configuration';
  if (error) throw new Error(error);

  const fd = new FormData();
  fd.append('productId', assetId);
  fd.append('variant', JSON.stringify(configuration));
  fd.append('productVersion', productVersion || 'v1');
  if (metadata && Object.keys(metadata))
    fd.append('metadata', JSON.stringify(metadata));
  if (customerId) fd.append('customerId', customerId);
  if (attachments && Object.keys(attachments).length) {
    let attachmentsPrepped = {};
    Object.entries(attachments).forEach(([key, file]) => {
      fd.append('files', file);
      attachmentsPrepped = Object.assign({}, attachmentsPrepped, {
        [key]: file.name,
      });
    });
    fd.append('attachments', JSON.stringify(attachmentsPrepped));
  }

  return http.configurations.postConfiguration(fd);
};

export const fetch = (configurationId: string) => {
  let error: undefined | string;
  if (!configurationId) error = 'Requires Configuration Id';
  if (error) throw new Error(error);
  return http.configurations.getSavedConfiguration(configurationId);
};

export const fetchAll = () =>
  new Promise<Array<IConfigurationResponse>>(async resolve => {
    const configurations = await http.configurations.getConfigurations();
    resolve(configurations.data.configurations);
  });
