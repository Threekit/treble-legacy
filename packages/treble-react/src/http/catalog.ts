import threekitRequest from './request'

const CONFIGURATIONS_API_ROUTE = `/api/catalog`

export const uploadAsset = (formData: FormData) => {
  let error: undefined | string
  if (!formData) error = 'Requires Form Data'
  if (error) throw new Error(error)
  return threekitRequest.post({
    url: `${CONFIGURATIONS_API_ROUTE}/assets/upload`,
    formData,
  })
}

export const getJobStatus = (jobId: string) => {
  let error: undefined | string
  if (!jobId) error = 'Requires a jobId'
  if (error) throw new Error(error)
  return threekitRequest.get(`${CONFIGURATIONS_API_ROUTE}/jobs/${jobId}`)
}
