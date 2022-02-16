import http from '../http';

export const uploadAsset = async (file: File) => {
  let error: undefined | string;
  if (!file) error = 'Requires a File';
  if (error) throw new Error(error);

  const formData = new FormData();
  formData.append('files', file, file.name);

  const uploadResponse = await http.catalog.uploadAsset(formData);
  const jobId = uploadResponse.data[0].jobId;

  let assetId;
  let count = 30;

  while (count > 1 && !assetId) {
    await new Promise(resolve =>
      setTimeout(() => resolve(undefined), 0.5 * 1000)
    );
    const checkRes = await http.catalog.getJobStatus(jobId);
    ++count;
    if (checkRes.data.output) {
      const { output } = checkRes.data;
      if (output.texture.length) {
        assetId = output.texture[0].assetId;
      } else if (output.vector.length) {
        assetId = output.vector[0].assetId;
      }
    }
  }
  return assetId;
};
