export default {
  serverUrl: process.env.SERVER_URL,

  credentials: {
    preview: {
      orgId: process.env.THREEKIT_PREVIEW_ORG_ID,
      publicToken: process.env.THREEKIT_PREVIEW_PUBLIC_TOKEN,
    },
    'admin-fts': {
      orgId: process.env.THREEKIT_ADMIN_FTS_ORG_ID,
      publicToken: process.env.THREEKIT_ADMIN_FTS_PUBLIC_TOKEN,
    },
  },

  products: {
    preview: {
      assetId: process.env.THREEKIT_PREVIEW_ASSET_ID,
      stageId: process.env.THREEKIT_PREVIEW_STAGE_ID,
    },
    'admin-fts': {
      assetId: process.env.THREEKIT_ADMIN_FTS_ASSET_ID,
      stageId: process.env.THREEKIT_ADMIN_FTS_STAGE_ID,
    },
  },
};
