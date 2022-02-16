import threekitRequest from './request';

const CATALOG_API_ROUTE = `/api/catalog`;

export interface IJob {
  createdAt: string;
  createdBy: string;
  duration: null;
  id: string;
  orgId: string;
  parameters: { files: Array<any>; image: string };
  priority: number;
  schedulerState: string | 'active';
  status: string | 'pending' | 'stopped';
  taskCount: number;
  taskProgress: null | number;
  taskResultFailures: number;
  taskResultSuccesses: number;
  taskStatusPending: number;
  taskStatusRunning: number;
  taskStatusStopped: number;
  tasks: Array<any>;
  timeElapsed: string;
  timeRemaining: string;
  title: string;
  type: string | 'import';
  updatedAt: string;
}

export interface IUploadAsset {
  name: string;
  assetId: string;
}

export interface IUploadResponse {
  job: IJob;
  jobId: string;
  msg: string;
}

export interface IJobResponse {
  job: IJob;
  output?: {
    font: Array<any>;
    lut: Array<any>;
    material: Array<any>;
    model: Array<any>;
    scene: Array<any>;
    texture: Array<IUploadAsset>;
    upload: Array<any>;
    vector: Array<IUploadAsset>;
    vfb: Array<any>;
    video: Array<any>;
  };
}

export const uploadAsset = (formData: FormData) => {
  let error: undefined | string;
  if (!formData) error = 'Requires Form Data';
  if (error) throw new Error(error);
  return threekitRequest.post<Array<IUploadResponse>>({
    url: `${CATALOG_API_ROUTE}/assets/upload`,
    formData,
  });
};

export const getJobStatus = (jobId: string) => {
  let error: undefined | string;
  if (!jobId) error = 'Requires a jobId';
  if (error) throw new Error(error);
  return threekitRequest.get<IJobResponse>(
    `${CATALOG_API_ROUTE}/jobs/${jobId}`
  );
};
