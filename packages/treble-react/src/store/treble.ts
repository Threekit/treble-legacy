import connection from '../connection';
import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import threekitAPI from '../api';
import {
  isUuid,
  getParams,
  createThreekitScriptEl,
  loadTrebleConfig,
} from '../utils';
import {
  DEFAULT_PLAYER_CONFIG,
  TK_SAVED_CONFIG_PARAM_KEY,
  TK_PLAYER_ROOT_DIV,
  TK_PLAYER_LOADER_DIV,
} from '../constants';
import {
  IProject,
  ICredentials,
  IProducts,
  IPlayerConfig,
  IThreekitDisplayAttribute,
  ISetConfiguration,
} from '../threekit';
import Treble from '../Treble';
import { setAttributes } from './attributes';
import { initPrice, updatePrice } from './price';
import { refreshWishlist } from './wishlist';
import { initTranslations } from './translations';
import { initProduct } from './product';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export interface ILaunchConfig {
  threekitEnv: string;
  locale: string;
  project: IProject;
  playerConfig: IPlayerConfig;
  eventHandlers: EventHandlers;
}

export interface TrebleState {
  //  Tracks configuration update
  isPlayerLoading: boolean;
  //  Tracks Threekit API initialization status
  isThreekitInitialized: boolean;
  //  HTML Player element's ID
  playerElId: undefined | string;
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
  isThreekitInitialized: false,
  isPlayerLoading: false,
  playerElId: undefined,
};

/*****************************************************
 * Actions
 ****************************************************/

export const setThreekitInitialized = createAction<undefined>(
  'treble/set-threekit-initialized'
);
export const setPlayerLoading = createAction<boolean>(
  'treble/set-player-loading'
);
export const setPlayerElement = createAction<string>(
  'treble/set-player-element'
);

/*****************************************************
 * Slice
 ****************************************************/

const { reducer } = createSlice({
  name: 'treble',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setThreekitInitialized, (state, _) => {
      state.isThreekitInitialized = true;
    });
    builder.addCase(setPlayerLoading, (state, action) => {
      state.isPlayerLoading = action.payload;
    });
    builder.addCase(setPlayerElement, (state, action) => {
      state.playerElId = action.payload;
    });
  },
});

/*****************************************************
 * Standard Selectors
 ****************************************************/

//  Loading Trackers
export const isThreekitInitialized = (state: RootState): boolean =>
  state.treble.isThreekitInitialized;

export const isPlayerLoading = (state: RootState): boolean =>
  state.treble.isPlayerLoading;

//  Player's HTML element
export const getPlayerElementId = (state: RootState): undefined | string =>
  state.treble.playerElId;

/*****************************************************
 * Complex Actions
 ****************************************************/

export const launch =
  (launchConfig?: Partial<ILaunchConfig>) =>
  async (dispatch: ThreekitDispatch) => {
    if (window.threekit) return;

    const config = loadTrebleConfig();

    const credentials: ICredentials = Object.assign(
      {},
      config.project?.credentials || {},
      launchConfig?.project?.credentials || {}
    );
    const products: IProducts = Object.assign(
      {},
      config.project?.products || {},
      launchConfig?.project?.products || {}
    );
    if (!Object.keys(credentials).length || !Object.keys(products).length)
      return console.error('Missing credentials');

    const threekitEnv: string =
      launchConfig?.threekitEnv || process.env.THREEKIT_ENV || 'preview';

    const playerConfig: IPlayerConfig = Object.assign(
      {},
      DEFAULT_PLAYER_CONFIG,
      config.player,
      launchConfig?.playerConfig
    );

    const envCredentials = credentials[threekitEnv];
    const product = products[threekitEnv];
    const threekitDomainRaw =
      envCredentials.threekitDomain || `${threekitEnv}.threekit.com`;
    const { orgId, publicToken: authToken } = envCredentials;
    let initialConfigurationRaw: Record<string, any> | undefined;
    let assetId: string | undefined;
    let stageId: string | undefined;
    let configurationId: string | undefined;

    if (typeof product === 'string') {
      if (isUuid(product)) assetId = product;
      else configurationId = product;
    } else {
      stageId = product.stageId;
      if (product.configurationId) configurationId = product.configurationId;
      else if (isUuid(product.assetId)) assetId = product.assetId;
      else configurationId = product.assetId;
    }

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
    await createThreekitScriptEl(threekitDomain);

    const player = await window.threekitPlayer({
      el: el as HTMLElement,
      // Variables to sort out
      authToken,
      stageId,
      assetId: updatedAssetId,
      ...playerConfig,
      initialConfiguration,
    });

    window.threekit = {
      player,
      configurator: await player.getConfigurator(),
      treble: new Treble({ player, orgId }),
    };

    dispatch(setThreekitInitialized());
    dispatch(setPlayerLoading(false));

    window.threekit.player.on('setConfiguration', () => {
      dispatch(
        setAttributes(window.threekit.configurator.getDisplayAttributes())
      );
      dispatch(updatePrice());
    });

    EVENTS = Object.assign(EVENTS, launchConfig?.eventHandlers);

    dispatch(initTranslations(launchConfig?.locale));
    dispatch(initPrice());
    dispatch(initProduct());
    dispatch(refreshWishlist());

    return;
  };

export default reducer;
