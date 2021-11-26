import threekitAPI from '../api'
import connection from '../connection'
import {
  IThreekitPlayer,
  IDisplayAttributeAsset,
  IDisplayAttributeString,
  IDisplayAttributeAssetValue,
  IDisplayAttributeStringValue,
  IMetadata,
} from '../threekit'
import {
  SNAPSHOT_FORMATS,
  ATTRIBUTES_RESERVED,
  SNAPSHOT_OUTPUTS,
  ATTRIBUTE_TYPES,
  WISHLIST_LOCALSTORAGE_KEY,
  TK_SAVED_CONFIG_PARAM_KEY,
} from '../constants'
import {
  dataURItoBlob,
  dataURItoFile,
  regularToKebabCase,
  setCameraPosition,
  getCameraPosition,
  getParams,
  objectToQueryStr,
} from '../utils'
import { IConfigurationResponse } from '../http/configurations'

interface ITreble {
  player: IThreekitPlayer
}

export type ISnapshotsCameras = undefined | string | Array<string | undefined>

export interface ITakeSnapshotsConfig {
  attributeName?: string
  output?: string
  format?: string
  size?: { width: number; height: number }
  filename?: string
}

export interface ISaveConfigurationConfig {
  customerId?: string
  metadata?: IMetadata
  productVersion?: string
  snapshot?:
    | true
    | {
        camera: string | undefined
        config: ITakeSnapshotsConfig
      }
}

type CamerasMap = Record<string, string | { assetId: string }>

const DEFAULT_CAMERA_CONFIG = {
  filename: `snapshot`,
  size: { width: 1920, height: 1080 },
  format: SNAPSHOT_FORMATS.png,
  attributeName: ATTRIBUTES_RESERVED.camera,
  output: SNAPSHOT_OUTPUTS.blob,
}

class Treble {
  _api: typeof threekitAPI
  _player: IThreekitPlayer
  private _cameraValues?: CamerasMap
  private _wishlist?: Array<IConfigurationResponse>

  constructor({ player }: ITreble) {
    //  Threekit API
    this._api = threekitAPI
    this._player = player
    // this._player = player.enableApi('player')
  }

  private _getCameraValue(cameraAttrName: string) {
    const attribute = window.threekit.configurator
      .getDisplayAttributes()
      .find((el) => el.name === cameraAttrName)
    if (!attribute) return undefined
    return attribute.value
  }

  private _getCamerasMap(cameraAttrName: string) {
    if (this._cameraValues) return this._cameraValues
    const attribute = window.threekit.configurator
      .getDisplayAttributes()
      .find((el) => el.name === cameraAttrName)
    if (!attribute) {
      this._cameraValues = {}
      return this._cameraValues
    }

    const cameraAttribute = attribute as
      | IDisplayAttributeAsset
      | IDisplayAttributeString

    cameraAttribute.values.forEach((el) => {
      const value =
        cameraAttribute.type === ATTRIBUTE_TYPES.asset
          ? { assetId: (el as IDisplayAttributeAssetValue).assetId }
          : (el as IDisplayAttributeStringValue).value
      this._cameraValues = Object.assign(this._cameraValues || {}, {
        [el.label]: value,
      })
    }, {})

    return this._cameraValues
  }

  async takeSnapshots(
    cameras: ISnapshotsCameras,
    config: ITakeSnapshotsConfig
  ) {
    const { threekitDomain } = connection.getConnection()
    const filename = config.filename || DEFAULT_CAMERA_CONFIG.filename
    const size = config.size || DEFAULT_CAMERA_CONFIG.size
    const format = config.format || DEFAULT_CAMERA_CONFIG.format
    const attributeName =
      config.attributeName || DEFAULT_CAMERA_CONFIG.attributeName
    const output = config.output || DEFAULT_CAMERA_CONFIG.output

    let camerasList = Array.isArray(cameras) ? cameras : [cameras]
    let snapshotsRaw: Array<string>

    if (camerasList.length === 1 && camerasList[0] === undefined) {
      const snapshotData = await getSnapshot()
      snapshotsRaw = [snapshotData]
    } else {
      const camerasMap = this._getCamerasMap(attributeName)
      if (!camerasMap) return null
      camerasList = camerasList.filter(
        (el) => el === undefined || Object.keys(camerasMap).includes(el)
      )

      const currentCamera = this._getCameraValue(attributeName)
      const cameraPosition = getCameraPosition(window.threekit.player.camera)
      snapshotsRaw = await getSnapshots(camerasList, camerasMap)
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

    function getSnapshot() {
      return window.threekit.player.snapshotAsync({
        size,
        mimeType: `image/${SNAPSHOT_FORMATS[format]}`,
      })
    }

    function getSnapshots(
      cameras: Array<string | undefined>,
      camerasMap: CamerasMap
    ) {
      let snapshots: Array<string> = []
      return cameras.reduce((snapshotPromise, camera) => {
        return snapshotPromise.then(
          () =>
            new Promise(async (resolve) => {
              if (camera)
                await window.threekit.configurator.setConfiguration({
                  [attributeName]: camerasMap[camera],
                })
              const snapshotStr = await getSnapshot()
              snapshots.push(snapshotStr)
              resolve(snapshots)
            })
        )
      }, Promise.resolve(snapshots))
    }

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

  async saveConfiguration(config?: ISaveConfigurationConfig) {
    const { threekitDomain } = connection.getConnection()
    const { customerId, metadata, productVersion, snapshot } = Object.assign(
      {},
      config
    )

    let files: File | undefined = undefined

    if (snapshot) {
      let { filename, size, format, attributeName } = DEFAULT_CAMERA_CONFIG
      let snapshotRaw

      if (snapshot === true || !snapshot.camera) {
        snapshotRaw = await await window.threekit.player.snapshotAsync({
          size,
          mimeType: `image/${SNAPSHOT_FORMATS[format]}`,
        })
      } else {
        filename = `${filename}${snapshot.camera || ''}`
        size = snapshot.config?.size || DEFAULT_CAMERA_CONFIG.size
        format = snapshot.config?.format || DEFAULT_CAMERA_CONFIG.format
        attributeName =
          snapshot.config?.attributeName || DEFAULT_CAMERA_CONFIG.attributeName

        const camerasMap = this._getCamerasMap(attributeName)
        if (!camerasMap) return null

        const currentCamera = this._getCameraValue(attributeName)
        const cameraPosition = getCameraPosition(window.threekit.player.camera)
        await window.threekit.configurator.setConfiguration({
          [attributeName]: camerasMap[snapshot.camera],
        })
        snapshotRaw = await await window.threekit.player.snapshotAsync({
          size,
          mimeType: `image/${SNAPSHOT_FORMATS[format]}`,
        })
        await window.threekit.configurator.setConfiguration({
          [attributeName]: currentCamera,
        })
        setCameraPosition(window.threekit.player.camera, cameraPosition)
      }

      files = dataURItoFile(snapshotRaw, `${filename}.${format}`)
    }

    const response = await threekitAPI.configurations.save({
      assetId: window.threekit.player.assetId,
      configuration: window.threekit.configurator.getConfiguration(),
      customerId,
      metadata,
      productVersion,
      files,
    })

    const params = Object.assign(getParams(), {
      [TK_SAVED_CONFIG_PARAM_KEY]: response.data.shortId,
    })
    const url = window.location.href.replace(window.location.search, '')

    return Object.assign(
      {
        resumableUrl: `${url}${objectToQueryStr(params)}`,
      },
      response.data,
      response.data.thumbnail?.length
        ? {
            thumbnail: `${threekitDomain}/api/files/hash/${response.data.thumbnail}`,
          }
        : undefined
    )
  }

  async getWishlist() {
    if (this._wishlist) return this._wishlist
    const { threekitDomain } = connection.getConnection()

    const wishlistListStr = localStorage.getItem(WISHLIST_LOCALSTORAGE_KEY)
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]')

    const wishlistData = await Promise.all(
      wishlistList.map((el) => threekitAPI.configurations.fetch(el))
    )

    this._wishlist = wishlistData.map((el) =>
      Object.assign(
        {},
        el.data,
        el.data.thumbnail?.length
          ? {
              thumbnail: `${threekitDomain}/api/files/hash/${el.data.thumbnail}`,
            }
          : undefined
      )
    )

    return this._wishlist
  }

  async addToWishlist(config?: ISaveConfigurationConfig) {
    if (!this._wishlist) {
      this._wishlist = []
      localStorage.setItem(WISHLIST_LOCALSTORAGE_KEY, JSON.stringify([]))
    }

    const configPrepped = Object.assign({ snapshot: true }, config)

    const savedConfiguration = await this.saveConfiguration(configPrepped)
    if (!savedConfiguration) return this._wishlist

    this._wishlist = [...this._wishlist, savedConfiguration]
    const wishlistListStr = localStorage.getItem(WISHLIST_LOCALSTORAGE_KEY)
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]')
    wishlistList.push(savedConfiguration.shortId)
    localStorage.setItem(
      WISHLIST_LOCALSTORAGE_KEY,
      JSON.stringify(wishlistList)
    )

    return this.getWishlist()
  }

  removeFromWishlist(idx: number) {
    if (!this._wishlist) {
      this._wishlist = []
      localStorage.setItem(WISHLIST_LOCALSTORAGE_KEY, JSON.stringify([]))
      return this._wishlist
    }

    if (idx > this._wishlist.length - 1) return this._wishlist

    const updatedWishlist = [...this._wishlist]
    updatedWishlist.splice(idx, 1)
    this._wishlist = updatedWishlist

    const wishlistListStr = localStorage.getItem(WISHLIST_LOCALSTORAGE_KEY)
    const wishlistList: Array<string> = JSON.parse(wishlistListStr || '[]')
    wishlistList.splice(idx, 1)

    localStorage.setItem(
      WISHLIST_LOCALSTORAGE_KEY,
      JSON.stringify(wishlistList)
    )

    return this._wishlist
  }

  clearWishlist() {
    this._wishlist = []
    localStorage.setItem(WISHLIST_LOCALSTORAGE_KEY, JSON.stringify([]))
    return this._wishlist
  }
}

export default Treble
