/*****************************************************
 * Treble Config
 ****************************************************/

export const DEFAULT_CLASS_NAME = 'threekit-react';
export const CLASS_NAME_PREFIX = 'tk';

export const INPUT_COMPONENT_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-input`;
export const WIDGET_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-widget`;
export const LAYOUT_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-layout`;
export const TOOL_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-tool`;
export const DISPLAY_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-display`;
export const FORM_CLASS_NAME = `${DEFAULT_CLASS_NAME} ${CLASS_NAME_PREFIX}-form`;

export const IS_TREBLE_SCRIPTS =
  process.env.TREBLE_SCRIPTS?.toString() === 'true';

/*****************************************************
 * Treble Products Workflow
 ****************************************************/

export const TK_PRODUCT_ID_PARAM_KEY = 'tkProduct';

/*****************************************************
 * Saved Configuration Workflow
 ****************************************************/

export const TK_SAVED_CONFIG_PARAM_KEY = 'tkConfigId';

/*****************************************************
 * Threekit Player Initialization Defaults
 ****************************************************/

export const TK_PLAYER_ROOT_DIV = 'tk-ply-root';

export const DEFAULT_PLAYER_CONFIG = {
  // authToken: undefined,
  // elementId: undefined,
  // cache: undefined,
  // stageId: undefined,
  // assetId: undefined,
  showConfigurator: false,
  // initialConfiguration: undefined,
  showLoadingThumbnail: false,
  showLoadingProgress: true,
  // onLoadingProgress: undefined,
  showAR: false,
  showShare: false,
  // locale: undefined,
  allowMobileVerticalOrbit: false,
  // publishStage: undefined,
};

/*****************************************************
 * Attributes
 ****************************************************/

export const ATTRIBUTE_TYPES = {
  asset: 'Asset',
  string: 'String',
  number: 'Number',
  color: 'Color',
  boolean: 'Boolean',
};

export const SORT_OPTIONS = {
  ascending: 'ascending',
  descending: 'descending',
};

export const ATTRIBUTES_RESERVED = {
  camera: '_camera',
};

/*****************************************************
 * Reserved Catalog Item Metadata Properties
 ****************************************************/

export const METADATA_RESERVED = {
  description: '_description',
  thumbnail: '_thumbnail',
  sku: '_sku',
  filters: '_filters',
  tooltip: '_tooltip',
  price: '_price',
  translate: '_translate',
  rotate: '_rotate',
  scale: '_scale',
};

/*****************************************************
 * Snapshot
 ****************************************************/

export const SNAPSHOT_FORMATS = {
  png: 'png',
  jpeg: 'jpeg',
};

export const SNAPSHOT_OUTPUTS = {
  url: 'url',
  download: 'download',
  dataUrl: 'dataUrl',
  blob: 'blob',
  file: 'file',
};

/*****************************************************
 * Wishlist
 ****************************************************/

export const WISHLIST_LOCALSTORAGE_KEY = 'tk_wishlist';
