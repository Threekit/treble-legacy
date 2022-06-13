import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import { IMetadata, IConfiguration, IProduct } from '../types';
import connection, { IConnectionConfig } from '../connection';
import { IReloadConfig, reloadPlayer } from './treble';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export interface CachedProduct {
  id: undefined | string;
  name?: string;
  label?: string;
  thumbnail?: string;
  connection: IConnectionConfig;
  configuration: IConfiguration;
}

export interface LoadProductConfig {
  cacheProduct: boolean;
}

export interface CachedProductState
  extends Pick<CachedProduct, 'id' | 'name' | 'label' | 'thumbnail'> {
  data: string;
}

interface IEnvConfig extends Record<string, Partial<IProduct>> {}

export interface IHydratedProducts extends Record<string, IEnvConfig> {}

export interface ProductState {
  //  ID of initialized product
  id: undefined | string;
  //  Name of the Initialized product(Item)
  name: undefined | string;
  //  Initialized item's metadata
  metadata: undefined | IMetadata;
  //  Cache
  cache: Array<CachedProductState>;
  activeCacheIdx: number;
}

/*****************************************************
 * Constants
 ****************************************************/

export let PRODUCTS: IHydratedProducts;

/*****************************************************
 * Actions
 ****************************************************/

//  Actions to be used only internally
export const setProductId = createAction<undefined | string>(
  'treble/set-product-id'
);
export const setName = createAction<string>('treble/set-product-name');
export const setMetadata = createAction<IMetadata>('treble/set-metadata');
export const appendToCache = createAction<CachedProductState>(
  'treble/append-to-cache'
);
export const updateActiveProductCache = createAction<CachedProductState>(
  'treble/update-active-product-cache'
);
export const removeFromCache = createAction<number>('treble/remove-from-cache');
export const setActiveCacheIdx = createAction<number>(
  'treble/set-active-cache-idx'
);
export const incrementActiveCacheIdx = createAction<undefined>(
  'treble/increment-active-cache-idx'
);
export const decrementActiveCacheIdx = createAction<undefined>(
  'treble/decrement-active-cache-idx'
);

/*****************************************************
 * State
 ****************************************************/

const initialState: ProductState = {
  //  ID of initialized item
  id: undefined,
  //  Name of the Initialized Item
  name: undefined,
  //  Initialized item's metadata
  metadata: undefined,
  //  cached products. Does not include the active product
  cache: [],
  activeCacheIdx: 0,
};

const { reducer } = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    builder.addCase(setProductId, (state, action) => {
      return { ...state, id: action.payload };
    });
    builder.addCase(setName, (state, action) => {
      return { ...state, name: action.payload };
    });
    builder.addCase(setMetadata, (state, action) => {
      return { ...state, metadata: action.payload };
    });
    builder.addCase(appendToCache, (state, action) => {
      state.cache.push(action.payload);
      return state;
    });
    builder.addCase(removeFromCache, (state, action) => {
      state.cache.splice(action.payload, 1);
      return state;
    });
    builder.addCase(updateActiveProductCache, (state, action) => {
      state.cache[state.activeCacheIdx] = Object.assign(
        {},
        state.cache[state.activeCacheIdx],
        action.payload
      );
      return state;
    });
    builder.addCase(setActiveCacheIdx, (state, action) => {
      state.activeCacheIdx = action.payload;
      return state;
    });
    builder.addCase(incrementActiveCacheIdx, state => {
      state.activeCacheIdx =
        state.activeCacheIdx >= state.cache.length
          ? state.activeCacheIdx
          : state.activeCacheIdx + 1;
      return state;
    });
    builder.addCase(decrementActiveCacheIdx, state => {
      state.activeCacheIdx =
        state.activeCacheIdx === 0 ? 0 : state.activeCacheIdx - 1;
      return state;
    });
  },
  reducers: {},
});

/*****************************************************
 * Standard Selectors
 ****************************************************/

export const getProductId = (state: RootState): undefined | string =>
  state.product.id;

export const getName = (state: RootState): undefined | string =>
  state.product.name;

//  Metadata
export const getMetadata = (state: RootState): undefined | IMetadata =>
  state.product.metadata;

//  Product Cache
export const getActiveCacheIdx = (state: RootState): number =>
  state.product.activeCacheIdx;

export const getProductCache = (
  state: RootState
): Array<Pick<CachedProduct, 'name' | 'label' | 'thumbnail'>> =>
  state.product.cache.map(prod =>
    Object.assign(
      {
        name: prod.name,
      },
      prod.label ? { label: prod.label } : {},
      prod.thumbnail ? { thumbnail: prod.thumbnail } : {}
    )
  );

/*****************************************************
 * Complex Actions
 ****************************************************/

export const initProduct =
  (prods?: IHydratedProducts) =>
  (dispatch: ThreekitDispatch, getState: () => RootState) => {
    if (prods) PRODUCTS = prods;
    const state = getState();
    const name = window.threekit.player.scene.get({
      id: window.threekit.player.assetId,
    }).name;
    const metadata = window.threekit.configurator.getMetadata();
    dispatch(setName(name));
    dispatch(setMetadata(metadata));
    if (!state.product.cache.length) {
      dispatch(setActiveCacheIdx(0));
      dispatch(cacheActiveProduct());
    }
  };

export const cacheActiveProduct =
  (config?: Pick<IReloadConfig, 'label' | 'thumbnail'>) =>
  (dispatch: ThreekitDispatch, getState: () => RootState) => {
    const state = getState();
    const label = config?.label;
    const thumbnail = config?.thumbnail;
    const connectionObj: Partial<IConnectionConfig> =
      connection.getConnection();
    delete connectionObj.threekitDomain;
    const configuration = window.threekit.configurator.getConfiguration();
    const data = { connection: connectionObj, configuration };

    const product: CachedProductState = Object.assign(
      {
        id: state.product.id,
        name: state.product.name,
        data: JSON.stringify(data),
      },
      label ? { label } : {},
      thumbnail ? { thumbnail } : {}
    );

    return dispatch(updateActiveProductCache(product));
  };

export const loadProduct =
  (id: string, config?: LoadProductConfig) =>
  async (dispatch: ThreekitDispatch, getState: () => RootState) => {
    const { cacheProduct } = config || { cacheProduct: true };
    const state = getState();
    const productsList = Object.keys(PRODUCTS);

    if (!productsList.includes(id)) return;

    const productConfig = PRODUCTS[id][state.treble.threekitEnv];

    dispatch(setProductId(id));
    if (cacheProduct) dispatch(cacheActiveProduct());
    await dispatch(reloadPlayer(productConfig));
    if (cacheProduct) {
      dispatch(incrementActiveCacheIdx());
      dispatch(cacheActiveProduct());
    }
  };

export const loadNewProduct =
  (config: undefined | string | IReloadConfig) =>
  async (dispatch: ThreekitDispatch) => {
    let label: string | undefined;
    let thumbnail: string | undefined;
    let shouldCacheProduct = true;

    if (typeof config === 'object') {
      label = config.label;
      thumbnail = config.thumbnail;
      if (config.cacheProduct === false) shouldCacheProduct = false;
    }

    if (shouldCacheProduct) dispatch(cacheActiveProduct({ label, thumbnail }));
    if (config) dispatch(setProductId(undefined));
    await dispatch(reloadPlayer(config));
    if (shouldCacheProduct) {
      dispatch(incrementActiveCacheIdx());
      dispatch(cacheActiveProduct({ label, thumbnail }));
    }
  };

export const changeActiveCacheIdx =
  (idx: number) =>
  async (dispatch: ThreekitDispatch, getState: () => RootState) => {
    const state = getState();
    const { cache } = state.product;

    if (idx >= cache.length) return Promise.resolve();

    dispatch(cacheActiveProduct());

    const cachedProduct = { ...state.product.cache[idx] };
    const data: Pick<CachedProduct, 'connection' | 'configuration'> =
      JSON.parse(cachedProduct.data);

    connection.connect(data.connection);

    dispatch(setActiveCacheIdx(idx));
    dispatch(setProductId(cachedProduct.id));
    await dispatch(
      reloadPlayer({
        assetId: data.connection.assetId,
        configuration: data.configuration,
      })
    );
  };

export const removeProductIdx =
  (idx?: number) =>
  async (dispatch: ThreekitDispatch, getState: () => RootState) => {
    const state = getState();
    const { cache, activeCacheIdx } = state.product;

    if (cache.length <= 1) return Promise.resolve();

    if (!idx || idx === activeCacheIdx) {
      if (activeCacheIdx === state.product.cache.length - 1) {
        await dispatch(changeActiveCacheIdx(activeCacheIdx - 1));
        dispatch(removeFromCache(activeCacheIdx));
      } else {
        dispatch(removeFromCache(activeCacheIdx));
        await dispatch(changeActiveCacheIdx(activeCacheIdx));
      }
    } else if (idx >= activeCacheIdx) {
      dispatch(removeFromCache(idx));
    } else if (idx <= activeCacheIdx) {
      dispatch(decrementActiveCacheIdx());
      dispatch(removeFromCache(idx));
    }

    return Promise.resolve();
  };

export default reducer;
