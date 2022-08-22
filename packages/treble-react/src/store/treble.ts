import connection from '../connection';
import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import threekitAPI from '../api';
import { isUuid, getParams, loadTrebleConfig, runDebugger } from '../utils';
import {
  DEFAULT_PLAYER_CONFIG,
  TK_SAVED_CONFIG_PARAM_KEY,
  TK_PLAYER_ROOT_DIV,
  TK_PLAYER_LOADER_DIV,
} from '../constants';
import {
  SCENE_PHASES,
  IProject,
  ICredentials,
  IProducts,
  IPlayerConfig,
  IThreekitDisplayAttribute,
  ISetConfiguration,
  IConfiguration,
} from '../types';
import Treble from '../Treble';
import { setAttributes } from './attributes';
import { initPrice, updatePrice } from './price';
import { refreshWishlist } from './wishlist';
import { initTranslations } from './translations';
import {
  initProduct,
  setName,
  setMetadata,
  setProductId,
  IHydratedProducts,
} from './product';
import message from '../components/message';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export interface IPlayerInit {
  el: HTMLElement;
  authToken: string;
  assetId: string;
  stageId?: string;
  orgId: string;
  playerConfig: IPlayerConfig;
  initialConfiguration?: IConfiguration;
}

export interface ILaunchConfig {
  assetId?: string;
  productId: string;
  threekitEnv: string;
  serverUrl: string;
  locale: string;
  project: IProject;
  playerConfig: IPlayerConfig;
  eventHandlers: EventHandlers;
}

export interface IReloadConfig {
  label?: string;
  thumbnail?: string;
  configuration?: IConfiguration;
  assetId?: string;
  stageId?: string;
  configurationId?: string;
  cacheProduct?: boolean;
}

export interface TrebleState {
  //  The threekit env
  threekitEnv: string;
  //  Tracks configuration update
  isPlayerLoading: boolean;
  //  Tracks Threekit API initialization status
  isThreekitInitialized: boolean;
  //  Tracks first player render
  isFirstRenderComplete: boolean;
  //  HTML Player element's ID
  playerElId: undefined | string;
  //  Event based notifications
  notifications: boolean;
  //  Loading Progress
  loadingProgress: undefined | number;
  //  Tracks whether the user has interacted with the player
  awaitingFirstInteraction: undefined | boolean;
}

export interface NotificationEvent extends Event {
  detail: {
    message: string;
    type: string;
  };
}

interface EventHandlers {
  postConfigurationChange?: (
    updatedAttributes: Array<IThreekitDisplayAttribute>,
    configurationChange: ISetConfiguration,
    previousConfiguration: Array<IThreekitDisplayAttribute>
  ) => void | Promise<void>;
}

/*****************************************************
 * Helper Functions
 ****************************************************/

const createPlayerLoaderEl = (elementId: string): HTMLElement => {
  /**
   * By default the player is loaded into a player-loader div that
   * is placed outside the user's view. This is done because in
   * React the Threekit Initialization may happen before the
   * component with the player HTML element has loaded which would
   * otherwise throw an error.
   */
  let playerElement = document.getElementById(elementId);
  if (playerElement) return playerElement;

  playerElement = document.createElement('div');
  playerElement.setAttribute('id', elementId);
  playerElement.style.height = '100%';

  const playerLoader = document.createElement('div');
  playerLoader.setAttribute('id', TK_PLAYER_LOADER_DIV);
  playerLoader.appendChild(playerElement);
  playerLoader.style.opacity = '0';
  playerLoader.style.height = '1px';
  playerLoader.style.position = 'fixed';
  playerLoader.style.top = '-100%';

  document.body.appendChild(playerLoader);
  return playerElement;
};

/*****************************************************
 * Constants and Event Handlers
 ****************************************************/

let EVENTS: EventHandlers = {};

/*****************************************************
 * State
 ****************************************************/

const initialState: TrebleState = {
  threekitEnv: 'preview',
  isThreekitInitialized: false,
  isFirstRenderComplete: false,
  isPlayerLoading: false,
  playerElId: undefined,
  notifications: true,
  loadingProgress: undefined,
  awaitingFirstInteraction: undefined,
};

/*****************************************************
 * Actions
 ****************************************************/

export const setThreekitEnv = createAction<string>('treble/set-threekit-env');
export const setThreekitInitialized = createAction<boolean>(
  'treble/set-threekit-initialized'
);
export const setIsFirstRenderComplete = createAction<boolean>(
  'treble/set-is-first-render-complete'
);
export const setPlayerLoading = createAction<boolean>(
  'treble/set-player-loading'
);
export const setPlayerElement = createAction<string>(
  'treble/set-player-element'
);
export const reloadTreble = createAction<Partial<TrebleState>>('treble/reload');

export const updateLoadingProgress = createAction<number>(
  'treble/update-loading-progress'
);

export const setPlayerInteraction = createAction<boolean>(
  'treble/set-player-interaction'
);

/*****************************************************
 * Slice
 ****************************************************/

const { reducer } = createSlice({
  name: 'treble',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setThreekitEnv, (state, action) => {
      state.threekitEnv = action.payload;
      return state;
    });
    builder.addCase(setThreekitInitialized, (state, action) => {
      state.isThreekitInitialized = action.payload;
      return state;
    });
    builder.addCase(setIsFirstRenderComplete, (state, action) => {
      state.isFirstRenderComplete = action.payload;
      return state;
    });
    builder.addCase(setPlayerLoading, (state, action) => {
      state.isPlayerLoading = action.payload;
      return state;
    });
    builder.addCase(setPlayerElement, (state, action) => {
      state.playerElId = action.payload;
      return state;
    });
    builder.addCase(reloadTreble, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(updateLoadingProgress, (state, action) => {
      state.loadingProgress = Math.round(action.payload * 100);
      return state;
    });
    builder.addCase(setPlayerInteraction, (state, action) => {
      return { ...state, awaitingFirstInteraction: action.payload };
    });
  },
});

/*****************************************************
 * Standard Selectors
 ****************************************************/

//  Loading Trackers
export const getThreekitEnv = (state: RootState): string =>
  state.treble.threekitEnv;

//  Loading Trackers
export const isThreekitInitialized = (state: RootState): boolean =>
  state.treble.isThreekitInitialized;

export const isFirstRenderComplete = (state: RootState): boolean =>
  state.treble.isFirstRenderComplete;

export const isPlayerLoading = (state: RootState): boolean =>
  state.treble.isPlayerLoading;

//  Player's HTML element
export const getPlayerElementId = (state: RootState): undefined | string =>
  state.treble.playerElId;

//  Player's Loading Progress
export const getLoadingProgress = (state: RootState): undefined | number =>
  state.treble.loadingProgress;

//  The initial interaction status
export const getPlayerInteraction = (state: RootState): undefined | boolean =>
  state.treble.awaitingFirstInteraction;

/*****************************************************
 * Complex Actions
 ****************************************************/

export const initPlayer =
  (config: IPlayerInit) =>
  async (dispatch: ThreekitDispatch, getState: () => RootState) => {
    const {
      el,
      authToken,
      assetId,
      stageId,
      orgId,
      playerConfig,
      initialConfiguration,
    } = config;

    dispatch(updateLoadingProgress(0));
    const player = await window.threekitPlayer({
      el: el as HTMLElement,
      // Variables to sort out
      authToken,
      stageId,
      assetId,
      ...playerConfig,
      initialConfiguration,
      onLoadingProgress: progress => {
        dispatch(updateLoadingProgress(progress));
        playerConfig?.onLoadingProgress?.(progress);
      },
    });

    const configurator = await player.getConfigurator();

    if (window.threekit) {
      window.threekit = Object.assign(window.threekit, {
        player,
        configurator,
      });
    } else
      window.threekit = {
        player,
        configurator,
        services: threekitAPI,
        treble: new Treble({
          player,
          orgId,
          initialConfiguration: configurator.getConfiguration(),
        }),
      };

    dispatch(setThreekitInitialized(true));
    dispatch(setPlayerLoading(false));
    dispatch(updateLoadingProgress(1));
    dispatch(setPlayerInteraction(true));

    window.threekit.player.on(SCENE_PHASES.RENDERED, () => {
      dispatch(setIsFirstRenderComplete(true));
    });

    const ruleName = 'use-first-player-interaction';
    window.threekit.player.tools.addTool({
      key: ruleName,
      label: 'use-first-player-interaction',
      active: true,
      enabled: true,
      handlers: {
        mousedown: async () => {
          dispatch(setPlayerInteraction(false));
          window.threekit.player.tools.removeTool(ruleName);
        },
      },
    });

    if (window.threekit.treble._debugMode) runDebugger();

    window.threekit.player.on('setConfiguration', async () => {
      const { attributes } = getState();
      const previousAttributes = Object.values(attributes);
      const updatedAttributes =
        window.threekit.configurator.getDisplayAttributes();

      dispatch(setAttributes(updatedAttributes));

      await EVENTS.postConfigurationChange?.(
        updatedAttributes,
        {},
        previousAttributes
      );
    });

    return;
  };

export const launch =
  (launchConfig?: Partial<ILaunchConfig>) =>
  async (dispatch: ThreekitDispatch) => {
    if (window.threekit) return;

    const config = loadTrebleConfig();

    let productId: string;
    const credentials: ICredentials =
      launchConfig?.project?.credentials || config.project?.credentials || {};
    let productsRaw: IProducts | Record<string, IProducts> =
      launchConfig?.project?.products || config.project?.products || {};

    if (!launchConfig?.productId?.length) {
      productsRaw = { default: productsRaw };
      productId = 'default';
    } else productId = launchConfig.productId;

    const products: IHydratedProducts = Object.entries(
      productsRaw as Record<string, IProducts>
    ).reduce((output, [prodId, envs]) => {
      const updatedEnvs = Object.entries(envs).reduce((result, [env, conf]) => {
        let initialConfiguration: Record<string, any> | undefined;
        let assetId: string | undefined;
        let stageId: string | undefined;
        let configurationId: string | undefined;

        if (typeof conf === 'string') {
          if (isUuid(conf)) assetId = conf;
          else configurationId = conf;
        } else {
          stageId = conf.stageId;
          if (conf.configurationId) configurationId = conf.configurationId;
          else if (isUuid(conf.assetId)) assetId = conf.assetId;
          else configurationId = conf.assetId;
        }

        return Object.assign(result, {
          [env]: {
            assetId,
            stageId,
            configurationId,
            initialConfiguration,
          },
        });
      }, {});
      return Object.assign(output, { [prodId]: updatedEnvs });
    }, {} as IHydratedProducts);

    if (!Object.keys(credentials).length || !Object.keys(products).length)
      return console.error('Missing credentials');

    dispatch(initProduct(products));
    dispatch(setProductId(productId));

    const threekitEnv: string =
      launchConfig?.threekitEnv || process.env.THREEKIT_ENV || 'preview';
    const serverUrl = launchConfig?.serverUrl || config?.project?.serverUrl;

    const playerConfig: IPlayerConfig = Object.assign(
      {},
      DEFAULT_PLAYER_CONFIG,
      config.player,
      launchConfig?.playerConfig
    );

    const envCredentials = credentials[threekitEnv];
    const {
      assetId: assetIdRaw,
      stageId,
      configurationId,
      initialConfiguration: initialConfigurationRaw,
    } = products[productId][threekitEnv] || {};
    const assetId = launchConfig?.assetId || assetIdRaw;
    // const product = products[threekitEnv];
    const threekitDomainRaw =
      envCredentials.threekitDomain || `${threekitEnv}.threekit.com`;
    const { orgId, publicToken: authToken } = envCredentials;

    //  We get or create the player HTML element
    let el;
    if (playerConfig.elementId) {
      el = document.getElementById(playerConfig.elementId);
      if (el) dispatch(setPlayerElement(playerConfig.elementId));
    } else {
      el = createPlayerLoaderEl(TK_PLAYER_ROOT_DIV);
      dispatch(setPlayerElement(TK_PLAYER_ROOT_DIV));
    }

    //  Connection
    connection.connect({
      authToken,
      orgId,
      assetId,
      threekitDomain: threekitDomainRaw,
      serverUrl,
    });

    //  We use the threekitDomain returned by the connection object
    //  As it ensures the env base url starts with 'https://'
    const { threekitDomain } = connection.getConnection();

    //  Initial Configuration from Params
    let initialConfiguration = { ...initialConfigurationRaw };
    let updatedAssetId = assetId;
    const params = getParams();

    const configId = params[TK_SAVED_CONFIG_PARAM_KEY]?.length
      ? params[TK_SAVED_CONFIG_PARAM_KEY]
      : configurationId;
    if (configId) {
      const configuration = await threekitAPI.configurations.fetch(
        configId as string
      );
      if (configuration) {
        initialConfiguration = Object.assign(
          {},
          initialConfigurationRaw,
          configuration.data.variant
        );
        connection.connect({ assetId: configuration.data.productId });
        updatedAssetId = configuration.data.productId;
      }
    }
    if (!updatedAssetId) return console.error('missing assetId');

    //  We create the threekit script
    await new Promise<void>(resolve => {
      const script = document.createElement('script');
      script.src = `${threekitDomain}/app/js/threekit-player-bundle.js`;
      script.id = 'threekit-player-bundle';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });

    await dispatch(
      initPlayer({
        el: el as HTMLElement,
        orgId,
        authToken,
        stageId,
        assetId: updatedAssetId,
        playerConfig,
        initialConfiguration,
      })
    );

    document.addEventListener('treble:notification', (e: NotificationEvent) => {
      message.info(e.detail.message);
    });

    EVENTS = Object.assign(EVENTS, launchConfig?.eventHandlers);

    dispatch(setName());
    dispatch(setMetadata());
    dispatch(initProduct());
    dispatch(setThreekitEnv(threekitEnv));
    dispatch(initTranslations(launchConfig?.locale));
    dispatch(initPrice());
    dispatch(updatePrice());
    dispatch(refreshWishlist());

    return;
  };

export const unloadPlayer = () => async (dispatch: ThreekitDispatch) => {
  dispatch(setThreekitInitialized(false));
  dispatch(setPlayerLoading(true));
  dispatch(setAttributes([]));
  dispatch(setName(''));
  dispatch(setMetadata({}));
  await window.threekit.player.unload();
};

export const reloadPlayer =
  (
    config:
      | undefined
      | string
      | Pick<
          IReloadConfig,
          'assetId' | 'stageId' | 'configurationId' | 'configuration'
        >
  ) =>
  async (dispatch: ThreekitDispatch, getState: () => RootState) => {
    const connectionObj = connection.getConnection();
    let assetId: string;
    let stageId: string | undefined;
    let initialConfiguration: IConfiguration | undefined;

    //  If no asset is specified, we reload the player with
    //  the current asset
    if (config === undefined) {
      assetId = connectionObj.assetId;
    } else if (typeof config === 'string') {
      assetId = config;
    } else {
      assetId = config?.assetId || connectionObj.assetId;
      stageId = config?.stageId;
      initialConfiguration = config?.configuration || {};
      if (config?.configurationId) {
        const configuration = await threekitAPI.configurations.fetch(
          config?.configurationId
        );
        if (configuration) {
          initialConfiguration = Object.assign(
            {},
            initialConfiguration,
            configuration.data.variant
          );
          assetId = configuration.data.productId;
        }
      }
    }

    //  Update connection
    if (assetId !== connectionObj.assetId) connection.connect({ assetId });

    //  Player re-initialization
    const state = getState();
    const trebleConfig = loadTrebleConfig();
    const playerConfig: IPlayerConfig = Object.assign(
      {},
      DEFAULT_PLAYER_CONFIG,
      trebleConfig.player
    );

    const el = document.getElementById(state.treble.playerElId as string);

    if (state.treble.isThreekitInitialized) await dispatch(unloadPlayer());

    await dispatch(
      initPlayer({
        el: el as HTMLElement,
        orgId: connectionObj.orgId,
        authToken: connectionObj.authToken,
        stageId,
        assetId,
        playerConfig,
        initialConfiguration,
      })
    );

    dispatch(updatePrice());
    dispatch(initProduct());
  };

export default reducer;
