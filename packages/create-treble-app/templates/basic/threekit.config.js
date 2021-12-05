const credentials = {
  preview: {
    assetId: process.env.THREEKIT_PREVIEW_ASSET_ID,
    stageId: process.env.THREEKIT_PREVIEW_STAGE_ID,
    orgId: process.env.THREEKIT_PREVIEW_ORG_ID,
    publicToken: process.env.THREEKIT_PREVIEW_PUBLIC_TOKEN,
  },
  'admin-fts': {
    assetId: process.env.THREEKIT_ADMIN_FTS_ASSET_ID,
    stageId: process.env.THREEKIT_PREVIEW_STAGE_ID,
    orgId: process.env.THREEKIT_ADMIN_FTS_ORG_ID,
    publicToken: process.env.THREEKIT_ADMIN_FTS_PUBLIC_TOKEN,
  },
};

const playerConfig = {
  showConfigurator: false,
  initialConfiguration: undefined,
  showLoadingThumbnail: false,
  showLoadingProgress: true,
  // onLoadingProgress: undefined,
  showAR: false,
  showShare: false,
  // locale: undefined,
  allowMobileVerticalOrbit: false,
  // publishStage: undefined,
};

const products = {
  ctx: require.context('./src/products', false, /.product.(jsx)$/),
};

export default {
  credentials,
  playerConfig,
  products,
};
