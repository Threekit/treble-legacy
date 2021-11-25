import Treble from './Treble'

type SCENE_PHASES = 'LOADED' | 'PRELOADED' | 'RENDERED'

type PRIVATE_APIS = 'scene' | 'player'

type IAttributeTypes = 'String' | 'Asset' | 'Color' | 'Number'

export type IMetadata = Record<string, string | number | null>

/***************************************************
 *  Scene
 **************************************************/

export interface ISceneQuery {
  all?: boolean
  id?: string
  name?: string | RegExp
  type?: string | Array<string>
  names?: Array<RegExp>
  properties?: any
  property?: string
  child?: string
  parent?: boolean
  includeParent?: boolean
  from?: ISceneQuery
  hasPlug?: string
  operator?: any
  operatorIndex?: number
  evalNode?: boolean
  evalPlug?: string
  plug?: string
  shallow?: boolean
  skipModels?: boolean
  configurator?: boolean
  attributeIndex?: number
  attributes?: any
  tags?: Array<RegExp>
  hierarchial?: boolean
}

export interface ISceneResult {
  name: string
  configurator: IThreekitPrivateConfigurator
}

/***************************************************
 *  Configuration
 **************************************************/

export interface IConfigurationAsset {
  assetId: string
  configuration?: string
  type?: string
}

export interface IConfigurationColor {
  r: number
  g: number
  b: number
}

export type IConfigurationAttribute =
  | IConfigurationAsset
  | IConfigurationColor
  | string
  | number
  | undefined

export type IConfiguration = Record<string, IConfigurationAttribute>
export type ISetConfiguration = Record<string, IConfigurationAttribute>

/***************************************************
 *  ATTRIBUTES
 *
 *  This section covers both getAttributes() and getDisplayAttributes()
 **************************************************/
interface IDisplayAttributeConfig {
  includeHidden?: boolean
}

//  Base Interface for all Attribute Types
interface IAttributeBase<
  T extends IAttributeTypes,
  V extends IConfigurationAttribute
> {
  type: T
  id: string
  name: string
  value: V
  //  The label is added by the translations
  label: string
}

/****** ASSET TYPE ATTRIBUTE *******/
export interface IConfigurationAssetValue {
  assetId: string
  name: string
  configuration?: Record<string, IThreekitDisplayAttribute>
}

//  Asset Attribute Value - getDisplayAttributes()
export interface IDisplayAttributeAssetValue extends IConfigurationAssetValue {
  enabled: boolean
  visible: boolean
  metadata: IMetadata
  tags: Array<string>
  //  The label is added by the translations
  label: string
}

//  Generic Asset Type Attribute
export interface IAttributeAssetBase<V>
  extends IAttributeBase<'Asset', IConfigurationAsset> {
  assetType: string
  blacklist: []
  defaultValue: IConfigurationAsset
  hiddenValues?: Array<string>
  disabledValues?: Array<string>
  values: Array<V>
}

//  Asset Type Attribute - getDisplayAttributes()
export type IDisplayAttributeAsset =
  IAttributeAssetBase<IDisplayAttributeAssetValue>
export type IAttributeAsset = IAttributeAssetBase<IConfigurationAssetValue>

/****** String TYPE ATTRIBUTE *******/
//  String Attribute Value - getDisplayAttributes()
export interface IDisplayAttributeStringValue {
  label: string
  value: string
}

export interface IAttributeStringBase<V>
  extends IAttributeBase<'String', string> {
  blacklist: []
  defaultValue: string
  hiddenValues?: Array<string>
  disabledValues?: Array<string>
  values: Array<V>
}

export type IDisplayAttributeString =
  IAttributeStringBase<IDisplayAttributeStringValue>
export type IAttributeString = IAttributeStringBase<string>

/****** STRING TYPE ATTRIBUTE *******/
export interface IAttributeColor
  extends IAttributeBase<'Color', IConfigurationColor> {
  defaultValue: IConfigurationColor
}

/****** NUMBER TYPE ATTRIBUTE *******/
export interface IAttributeNumber extends IAttributeBase<'Number', number> {
  defaultValue: number
  lockToStep: boolean
  max?: number
  min?: number
  step: number
}

/****** getAttributes() *******/
export type IThreekitAttribute =
  | IAttributeAsset
  | IAttributeColor
  | IAttributeString
  | IAttributeNumber

/****** getDisplayAttributes() *******/
export type IThreekitDisplayAttribute =
  | IDisplayAttributeAsset
  | IAttributeColor
  | IDisplayAttributeString
  | IAttributeNumber

/***************************************************
 *  Camera
 **************************************************/

export interface ICoordinates {
  x: number
  y: number
  z: number
}

export interface IQuaternion extends ICoordinates {
  w: number
}

export interface ISnapshotConfig {
  mimeType?: string
  size?: { width: number; height: number }
}

export type SNAPSHOT_FORMAT_TYPES = 'jpg' | 'png'

/***************************************************
 *  Threekit Api
 **************************************************/

export interface IThreekitConfigurator {
  getMetadata: () => IMetadata
  getAttributes: () => Array<IThreekitAttribute>
  getConfiguration: () => IConfiguration
  setConfiguration: (
    configuration: ISetConfiguration | IConfiguration
  ) => Promise<IConfiguration>
  getPrice: (pricebookId: string, currency: string) => number
  getDisplayAttributes: (
    config?: IDisplayAttributeConfig
  ) => Array<IThreekitDisplayAttribute>
}

export interface IThreekitScene {
  PHASES: {
    LOADED: 'loaded'
    PRELOADED: 'preloaded'
    RENDERED: 'rendered'
  }
  get: (query: ISceneQuery | string) => ISceneResult
}

export interface IThreekitTools {
  addTool: (tool: string) => void
  addTools: (tools: string[]) => void
  removeTool: (tool: string) => void
  removeTools: (tools: string[]) => void
  setPrimary: (tool: string) => void
  getPrimaryTool: () => string
  setTool: () => void
  setTools: () => void
}

export interface IThreekitCamera {
  frameBoundingSphere: () => void
  getPosition: () => ICoordinates
  getQuaternion: () => IQuaternion
  orbit: (deltaX: number, deltaY: number) => void
  pan: (deltaX: number, deltaY: number) => void
  setPosition: (position: ICoordinates) => void
  setQuaternion: (quaternion: IQuaternion) => void
  zoom: (delta: number) => void
}

export interface IThreekitPlayer {
  assetId: string
  instanceId: string
  scene: IThreekitScene
  tools: IThreekitTools
  camera: IThreekitCamera
  setActiveCamera: () => void
  on: (phase: SCENE_PHASES) => void
  getConfigurator: () => Promise<IThreekitConfigurator>
  enableApi: (api: PRIVATE_APIS) => any
  snapshotAsync: (snapshotConfig: ISnapshotConfig) => Promise<string>
}

export interface IThreekitPrivateConfigurator extends IThreekitConfigurator {
  getAppliedConfiguration: (attributeName: string) => string
}

export interface IThreekitPrivatePlayer {
  getConfigurator: () => IThreekitPrivateConfigurator
  configurator: { getFullConfiguration: () => IConfiguration }
}

export interface ThreekitInitConfig {
  authToken: string
  el: HTMLElement
  assetId: string
  stageId?: string
  orgId?: string
  showConfigurator?: boolean
  initialConfiguration?: object
  showAR?: boolean
  showShare?: boolean
  showLoadingThumbnail?: boolean
  showLoadingProgress?: boolean
  onLoadingProgress?: boolean
  locale?: string
  allowMobileVerticalOrbit?: boolean
  publishStage?: string
}

/***************************************************
 *  Global Declaration
 **************************************************/

declare global {
  interface Window {
    threekitPlayer: (arg0: ThreekitInitConfig) => Promise<IThreekitPlayer>
    threekit: {
      player: IThreekitPlayer
      configurator: IThreekitConfigurator
      treble: Treble
    }
  }
}
