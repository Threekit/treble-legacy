import threekitAPI from '../api';
// import connection from '../connection';
import {
  SNAPSHOT_FORMATS,
  ATTRIBUTES_RESERVED,
  SNAPSHOT_OUTPUTS,
  ATTRIBUTE_TYPES,
} from '../constants';
import {
  IThreekitConfigurator,
  IDisplayAttributeAsset,
  IDisplayAttributeString,
  IDisplayAttributeAssetValue,
  IDisplayAttributeStringValue,
} from '../types';
import {
  dataURItoBlob,
  dataURItoFile,
  regularToKebabCase,
  setCameraPosition,
  getCameraPosition,
  downloadSnapshot,
} from '../utils';

export type ISnapshotsCameras = undefined | string | Array<string | undefined>;

interface SnapshotSize {
  width: number;
  height: number;
}
export interface ITakeSnapshotsConfig {
  attributeName?: string;
  output?: string;
  format?: string;
  size?: SnapshotSize;
  filename?: string;
  useStage?: boolean;
}

type CamerasMap = Record<string, string | { assetId: string }>;

interface IGetSnapshot {
  size: SnapshotSize;
  format: string;
}

interface ISnapshots {
  getSnapshot(snapshotConfig: IGetSnapshot): Promise<string>;
  takeSnapshots(
    cameras: ISnapshotsCameras,
    config: ITakeSnapshotsConfig
  ): Promise<void | string[] | Blob[] | File[] | null>;
}

const DEFAULT_CAMERA_CONFIG = {
  filename: `snapshot`,
  size: { width: 1920, height: 1080 },
  format: SNAPSHOT_FORMATS.png,
  attributeName: ATTRIBUTES_RESERVED.camera,
  output: SNAPSHOT_OUTPUTS.blob,
  useStage: false,
};

let cameraValues: CamerasMap;

const getCameraValue = (
  configurator: IThreekitConfigurator,
  cameraAttrName: string = ATTRIBUTES_RESERVED.camera
) => {
  const attribute = configurator
    .getDisplayAttributes()
    .find(el => el.name === cameraAttrName);
  if (!attribute) return undefined;
  return attribute.value;
};

const getCamerasMap = (
  configurator: IThreekitConfigurator,
  cameraAttrName: string = ATTRIBUTES_RESERVED.camera
) => {
  if (cameraValues) return cameraValues;
  const attribute = configurator
    .getDisplayAttributes()
    .find(el => el.name === cameraAttrName);
  if (!attribute) {
    cameraValues = {};
    return cameraValues;
  }
  const cameraAttribute = attribute as
    | IDisplayAttributeAsset
    | IDisplayAttributeString;

  cameraAttribute.values.forEach(el => {
    const value =
      cameraAttribute.type === ATTRIBUTE_TYPES.asset
        ? { assetId: (el as IDisplayAttributeAssetValue).assetId }
        : (el as IDisplayAttributeStringValue).value;
    cameraValues = Object.assign(cameraValues || {}, {
      [el.label]: value,
    });
  }, {});

  return cameraValues;
};

const getSnapshot = ({ size, format }: IGetSnapshot) => {
  return window.threekit.player.snapshotAsync({
    size,
    mimeType: `image/${SNAPSHOT_FORMATS[format]}`,
  });
};

const getSnapshots = async (
  cameras: Array<string | undefined>,
  snapshotConfig: Pick<
    ITakeSnapshotsConfig,
    'attributeName' | 'format' | 'size' | 'useStage'
  >
) => {
  const attributeName =
    snapshotConfig.attributeName || DEFAULT_CAMERA_CONFIG.attributeName;
  const size = snapshotConfig.size || DEFAULT_CAMERA_CONFIG.size;
  const format = snapshotConfig.format || DEFAULT_CAMERA_CONFIG.format;

  const configurator = snapshotConfig?.useStage
    ? await window.threekit.player.getStageConfigurator()
    : window.threekit.configurator;

  const camerasMap = getCamerasMap(configurator, attributeName);
  if (!camerasMap) return Promise.resolve([]);
  let snapshots: Array<string> = [];
  return cameras.reduce((snapshotPromise, camera) => {
    return snapshotPromise.then(
      () =>
        new Promise(async resolve => {
          if (camera)
            await configurator.setConfiguration({
              [attributeName]: camerasMap[camera],
            });
          const snapshotStr = await getSnapshot({ size, format });
          snapshots.push(snapshotStr);
          resolve(snapshots);
        })
    );
  }, Promise.resolve(snapshots));
};

class Snapshots implements ISnapshots {
  constructor() {}

  getSnapshot = getSnapshot;

  takeSnapshots = async (
    camerasList: ISnapshotsCameras,
    snapshotsConfig: ITakeSnapshotsConfig
  ): Promise<void | string[] | Blob[] | File[] | null> => {
    const filename =
      snapshotsConfig?.filename || DEFAULT_CAMERA_CONFIG.filename;
    const size = snapshotsConfig?.size || DEFAULT_CAMERA_CONFIG.size;
    const format = snapshotsConfig?.format || DEFAULT_CAMERA_CONFIG.format;
    const attributeName =
      snapshotsConfig?.attributeName || DEFAULT_CAMERA_CONFIG.attributeName;
    const output = snapshotsConfig?.output || DEFAULT_CAMERA_CONFIG.output;
    const configurator = snapshotsConfig?.useStage
      ? await window.threekit.player.getStageConfigurator()
      : window.threekit.configurator;

    let cameras = Array.isArray(camerasList) ? camerasList : [camerasList];
    let snapshotsRaw: Array<string>;

    if (cameras.length === 1 && cameras[0] === undefined) {
      const snapshotData = await this.getSnapshot({ size, format });
      snapshotsRaw = [snapshotData];
    } else {
      const camerasMap = getCamerasMap(configurator, attributeName);
      if (!camerasMap) return null;
      cameras = cameras.filter(
        el => el === undefined || Object.keys(camerasMap).includes(el)
      );

      const currentCamera = getCameraValue(configurator, attributeName);
      const cameraPosition = getCameraPosition(window.threekit.player.camera);
      snapshotsRaw = await getSnapshots(cameras, snapshotsConfig);
      await configurator.setConfiguration({
        [attributeName]: currentCamera,
      });
      setCameraPosition(window.threekit.player.camera, cameraPosition);
    }

    switch (output) {
      case SNAPSHOT_OUTPUTS.url:
        const attachments = snapshotsRaw.reduce((output, el, idx) => {
          const cameraName = camerasList?.[idx]
            ? regularToKebabCase(camerasList[idx] || 'default')
            : filename;
          const preppedFilename =
            cameraName === filename
              ? `${filename}.${format}`
              : `${filename}-${cameraName}.${format}`;
          const file = dataURItoFile(el, preppedFilename);
          return Object.assign(output, { [cameraName]: file });
        }, {});
        const response = await threekitAPI.configurations.save({
          assetId: window.threekit.player.assetId,
          configuration: window.threekit.configurator.getConfiguration(),
          attachments,
        });
        const urlsArray = Object.values(response.data.attachments);
        return Promise.resolve(urlsArray);
      case SNAPSHOT_OUTPUTS.download:
        snapshotsRaw.forEach((snapshotBlob, idx) => {
          const cameraName = camerasList?.[idx]
            ? `-${regularToKebabCase(camerasList[idx] || 'default')}`
            : '';
          downloadSnapshot(snapshotBlob, `${filename}${cameraName}.${format}`);
        });
        return Promise.resolve();
      case SNAPSHOT_OUTPUTS.blob:
        const snapshotBlobs = snapshotsRaw.map(el => dataURItoBlob(el));
        return Promise.resolve(snapshotBlobs);
      case SNAPSHOT_OUTPUTS.file:
        const snapshotFiles = snapshotsRaw.map((el, idx) => {
          const cameraName = camerasList?.[idx]
            ? `-${regularToKebabCase(camerasList[idx] || 'default')}`
            : '';
          return dataURItoFile(el, `${filename}${cameraName}.${format}`);
        });
        return Promise.resolve(snapshotFiles);
      case SNAPSHOT_OUTPUTS.dataUrl:
      default:
        return Promise.resolve(snapshotsRaw);
    }
  };
}

export default Snapshots;
