import threekitAPI from '../api'
import connection from '../connection'
import {
  SNAPSHOT_FORMATS,
  ATTRIBUTES_RESERVED,
  SNAPSHOT_OUTPUTS,
  ATTRIBUTE_TYPES,
} from '../constants'
import {
  IDisplayAttributeAsset,
  IDisplayAttributeString,
  IDisplayAttributeAssetValue,
  IDisplayAttributeStringValue,
} from '../threekit'
import {
  dataURItoBlob,
  dataURItoFile,
  regularToKebabCase,
  setCameraPosition,
  getCameraPosition,
} from '../utils'

export type ISnapshotsCameras = undefined | string | Array<string | undefined>

interface SnapshotSize {
  width: number
  height: number
}
export interface ITakeSnapshotsConfig {
  attributeName?: string
  output?: string
  format?: string
  size?: SnapshotSize
  filename?: string
}

type CamerasMap = Record<string, string | { assetId: string }>

interface IGetSnapshot {
  size: SnapshotSize
  format: string
}

interface ISnapshots {
  getSnapshot(snapshotConfig: IGetSnapshot): Promise<string>
  getSnapshots(
    cameras: Array<string | undefined>,
    snapshotConfig: Pick<
      ITakeSnapshotsConfig,
      'attributeName' | 'format' | 'size'
    >
  ): Promise<Array<string>>
  takeSnapshots(
    cameras: ISnapshotsCameras,
    config: ITakeSnapshotsConfig
  ): Promise<void | string[] | Blob[] | null>
}

const DEFAULT_CAMERA_CONFIG = {
  filename: `snapshot`,
  size: { width: 1920, height: 1080 },
  format: SNAPSHOT_FORMATS.png,
  attributeName: ATTRIBUTES_RESERVED.camera,
  output: SNAPSHOT_OUTPUTS.blob,
}

let cameraValues: CamerasMap

const getCameraValue = (
  cameraAttrName: string = ATTRIBUTES_RESERVED.camera
) => {
  const attribute = window.threekit.configurator
    .getDisplayAttributes()
    .find((el) => el.name === cameraAttrName)
  if (!attribute) return undefined
  return attribute.value
}

const getCamerasMap = (cameraAttrName: string = ATTRIBUTES_RESERVED.camera) => {
  if (cameraValues) return cameraValues
  const attribute = window.threekit.configurator
    .getDisplayAttributes()
    .find((el) => el.name === cameraAttrName)
  if (!attribute) {
    cameraValues = {}
    return cameraValues
  }
  const cameraAttribute = attribute as
    | IDisplayAttributeAsset
    | IDisplayAttributeString

  cameraAttribute.values.forEach((el) => {
    const value =
      cameraAttribute.type === ATTRIBUTE_TYPES.asset
        ? { assetId: (el as IDisplayAttributeAssetValue).assetId }
        : (el as IDisplayAttributeStringValue).value
    cameraValues = Object.assign(cameraValues || {}, {
      [el.label]: value,
    })
  }, {})

  return cameraValues
}

class Snapshots implements ISnapshots {
  constructor() {}

  getSnapshot = ({ size, format }: IGetSnapshot) => {
    return window.threekit.player.snapshotAsync({
      size,
      mimeType: `image/${SNAPSHOT_FORMATS[format]}`,
    })
  }

  getSnapshots = (
    cameras: Array<string | undefined>,
    snapshotConfig: Pick<
      ITakeSnapshotsConfig,
      'attributeName' | 'format' | 'size'
    >
  ) => {
    const attributeName =
      snapshotConfig.attributeName || DEFAULT_CAMERA_CONFIG.attributeName
    const size = snapshotConfig.size || DEFAULT_CAMERA_CONFIG.size
    const format = snapshotConfig.format || DEFAULT_CAMERA_CONFIG.format
    const camerasMap = getCamerasMap(attributeName)
    if (!camerasMap) return Promise.resolve([])
    let snapshots: Array<string> = []
    return cameras.reduce((snapshotPromise, camera) => {
      return snapshotPromise.then(
        () =>
          new Promise(async (resolve) => {
            if (camera)
              await window.threekit.configurator.setConfiguration({
                [attributeName]: camerasMap[camera],
              })
            const snapshotStr = await this.getSnapshot({ size, format })
            snapshots.push(snapshotStr)
            resolve(snapshots)
          })
      )
    }, Promise.resolve(snapshots))
  }

  takeSnapshots = async (
    camerasList: ISnapshotsCameras,
    snapshotsConfig: ITakeSnapshotsConfig
  ) => {
    const { threekitDomain } = connection.getConnection()
    const filename = snapshotsConfig?.filename || DEFAULT_CAMERA_CONFIG.filename
    const size = snapshotsConfig?.size || DEFAULT_CAMERA_CONFIG.size
    const format = snapshotsConfig?.format || DEFAULT_CAMERA_CONFIG.format
    const attributeName =
      snapshotsConfig?.attributeName || DEFAULT_CAMERA_CONFIG.attributeName
    const output = snapshotsConfig?.output || DEFAULT_CAMERA_CONFIG.output

    let cameras = Array.isArray(camerasList) ? camerasList : [camerasList]
    let snapshotsRaw: Array<string>

    if (cameras.length === 1 && cameras[0] === undefined) {
      const snapshotData = await this.getSnapshot({ size, format })
      snapshotsRaw = [snapshotData]
    } else {
      const camerasMap = getCamerasMap(attributeName)
      if (!camerasMap) return null
      cameras = cameras.filter(
        (el) => el === undefined || Object.keys(camerasMap).includes(el)
      )

      const currentCamera = getCameraValue(attributeName)
      const cameraPosition = getCameraPosition(window.threekit.player.camera)
      snapshotsRaw = await this.getSnapshots(cameras, camerasMap)
      await window.threekit.configurator.setConfiguration({
        [attributeName]: currentCamera,
      })
      setCameraPosition(window.threekit.player.camera, cameraPosition)
    }

    switch (output) {
      case SNAPSHOT_OUTPUTS.url:
        const savedSnapshots = await Promise.all(
          snapshotsRaw.map((snapshotBlob, idx) => {
            const cameraName = camerasList?.[idx]
              ? `-${regularToKebabCase(camerasList[idx] || 'default')}`
              : ''
            return saveSnapshotToPlatform(
              snapshotBlob,
              `${filename}${cameraName}.${format}`
            )
          })
        )
        return Promise.resolve(savedSnapshots)
      case SNAPSHOT_OUTPUTS.download:
        snapshotsRaw.forEach((snapshotBlob, idx) => {
          const cameraName = camerasList?.[idx]
            ? `-${regularToKebabCase(camerasList[idx] || 'default')}`
            : ''
          downloadSnapshot(snapshotBlob, `${filename}${cameraName}.${format}`)
        })
        return Promise.resolve()
      case SNAPSHOT_OUTPUTS.blob:
        const snapshotBlobs = snapshotsRaw.map((el) => dataURItoBlob(el))
        return Promise.resolve(snapshotBlobs)
      case SNAPSHOT_OUTPUTS.file:
        const snapshotFiles = snapshotsRaw.map((el, idx) => {
          const cameraName = camerasList?.[idx]
            ? `-${regularToKebabCase(camerasList[idx] || 'default')}`
            : ''
          return dataURItoFile(el, `${filename}${cameraName}.${format}`)
        })
        return Promise.resolve(snapshotFiles)
      case SNAPSHOT_OUTPUTS.dataUrl:
      default:
        return Promise.resolve(snapshotsRaw)
    }

    // function getSnapshot() {
    //   return window.threekit.player.snapshotAsync({
    //     size,
    //     mimeType: `image/${SNAPSHOT_FORMATS[format]}`,
    //   })
    // }

    // function getSnapshots(
    //   cameras: Array<string | undefined>,
    //   camerasMap: CamerasMap
    // ) {
    //   let snapshots: Array<string> = []
    //   return cameras.reduce((snapshotPromise, camera) => {
    //     return snapshotPromise.then(
    //       () =>
    //         new Promise(async (resolve) => {
    //           if (camera)
    //             await window.threekit.configurator.setConfiguration({
    //               [attributeName]: camerasMap[camera],
    //             })
    //           const snapshotStr = await getSnapshot()
    //           snapshots.push(snapshotStr)
    //           resolve(snapshots)
    //         })
    //     )
    //   }, Promise.resolve(snapshots))
    // }

    async function saveSnapshotToPlatform(snapshot: string, filename: string) {
      const files = dataURItoFile(snapshot, filename)

      const response = await threekitAPI.configurations.save({
        assetId: window.threekit.player.assetId,
        configuration: window.threekit.configurator.getConfiguration(),
        files,
      })

      return `${threekitDomain}/api/files/hash/${response.data.thumbnail}`
    }

    async function downloadSnapshot(snapshot: string, filename: string) {
      const blob = dataURItoBlob(snapshot)
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a') // Or maybe get it from the current document
      link.href = blobUrl
      link.download = filename
      const clickHandler = () => {
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl)
          link.removeEventListener('click', clickHandler)
        }, 150)
      }

      link.addEventListener('click', clickHandler)
      document.body.appendChild(link)

      link.click()
    }
  }
}

export default Snapshots
