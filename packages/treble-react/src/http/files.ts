import threekitRequest from './request';

const FILES_API_ROUTE = `/api/files`;

enum ENCODING_OPTIONS {
  RAW = 'raw',
  GZIP = 'gzip',
  BROTLI = 'brotli',
}

interface IFile {
  id: string;
  userId: string;
  hash: string;
  encodings: Partial<Record<ENCODING_OPTIONS, { size: number }>>;
  filename: string;
  size: number;
  extension: string;
}

export interface IFileResponse {
  files: Array<IFile>;
}

export const postFile = (formData: FormData) => {
  let error: undefined | string;
  if (!formData) error = 'Requires Form Data';
  if (error) throw new Error(error);
  return threekitRequest.post<IFileResponse>({
    url: FILES_API_ROUTE,
    formData,
  });
};
