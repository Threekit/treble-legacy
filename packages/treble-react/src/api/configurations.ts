import http from '../http'
import { IConfigurationResponse } from '../http/configurations'
import { IConfiguration, IMetadata } from '../threekit'

interface ISaveConfiguration {
  assetId: string
  customerId?: string
  configuration: IConfiguration
  metadata?: IMetadata
  productVersion?: string
  files?: File
}

export const save = async (saveConfig: ISaveConfiguration) => {
  const {
    assetId,
    customerId,
    configuration,
    metadata,
    productVersion,
    files,
  } = saveConfig
  let error: string | undefined
  if (!assetId) error = 'Requires Asset Id'
  if (!configuration) error = 'Requires a configuration'
  if (error) throw new Error(error)

  const fd = new FormData()
  fd.append('productId', assetId)
  fd.append('variant', JSON.stringify(configuration))
  fd.append('productVersion', productVersion || 'v1')
  if (metadata && Object.keys(metadata))
    fd.append('metadata', JSON.stringify(metadata))
  if (customerId) fd.append('customerId', customerId)
  if (files) fd.append('files', files)

  return await http.configurations.postConfiguration(fd)
}

export const fetch = (configurationId: string) => {
  let error: undefined | string
  if (!configurationId) error = 'Requires Configuration Id'
  if (error) throw new Error(error)
  return http.configurations.getSavedConfiguration(configurationId)
}

export const fetchAll = () =>
  new Promise<Array<IConfigurationResponse>>(async (resolve) => {
    const configurations = await http.configurations.getConfigurations()
    resolve(configurations.data.configurations)
  })
