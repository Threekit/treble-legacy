import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import { IMetadata, IConfiguration, IProducts } from '../threekit';
import connection, { IConnectionConfig } from '../connection';
import { IReloadConfig, reloadPlayer } from './treble';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export interface CachedProduct {
  name?: string;
  label?: string;
  thumbnail?: string;
  connection: IConnectionConfig;
  configuration: IConfiguration;
}

export interface CachedProductState
  extends Pick<CachedProduct, 'name' | 'label' | 'thumbnail'> {
  data: string;
}

export interface ProductState {
  //  Name of the Initialized Item
  name: undefined | string;
  //  Initialized item's metadata
  metadata: undefined | IMetadata;
  cachedProducts: Array<CachedProductState>;
  activeProductIdx: number;
}

/*****************************************************
 * Constants
 ****************************************************/

export let PRODUCTS: IProducts;

/*****************************************************
 * Actions
 ****************************************************/

//  Actions to be used only internally
export const setName = createAction<string>('treble/product/set-name');
export const setMetadata = createAction<IMetadata>(
  'treble/product/set-metadata'
);
export const addProductToCache = createAction<CachedProductState>(
  'treble/add-product-to-cache'
);
export const updateActiveProductCache = createAction<CachedProductState>(
  'treble/update-active-product-cache'
);
export const removeProductFromCache = createAction<number>(
  'treble/remove-product-from-cache'
);
export const setActiveProductIdx = createAction<number>(
  'treble/set-active-product-idx'
);
export const incrementActiveProductIdx = createAction<undefined>(
  'treble/increment-active-product-idx'
);
export const decrementActiveProductIdx = createAction<undefined>(
  'treble/decrement-active-product-idx'
);

/*****************************************************
 * State
 ****************************************************/

const initialState: ProductState = {
  //  Name of the Initialized Item
  name: undefined,
  //  Initialized item's metadata
  metadata: undefined,
  //  cached products. Does not include the active product
  cachedProducts: [],
  activeProductIdx: 0,
};

const { reducer } = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    builder.addCase(setName, (state, action) => {
      return { ...state, name: action.payload };
    });
    builder.addCase(setMetadata, (state, action) => {
      return { ...state, metadata: action.payload };
    });
    builder.addCase(addProductToCache, (state, action) => {
      state.cachedProducts.push(action.payload);
      return state;
    });
    builder.addCase(removeProductFromCache, (state, action) => {
      state.cachedProducts.splice(action.payload, 1);
      return state;
    });
    builder.addCase(updateActiveProductCache, (state, action) => {
      state.cachedProducts[state.activeProductIdx] = Object.assign(
        {},
        state.cachedProducts[state.activeProductIdx],
        action.payload
      );
      return state;
    });
    builder.addCase(setActiveProductIdx, (state, action) => {
      state.activeProductIdx = action.payload;
      return state;
    });
    builder.addCase(incrementActiveProductIdx, state => {
      state.activeProductIdx =
        state.activeProductIdx >= state.cachedProducts.length
          ? state.activeProductIdx
          : state.activeProductIdx + 1;
      return state;
    });
    builder.addCase(decrementActiveProductIdx, state => {
      state.activeProductIdx =
        state.activeProductIdx === 0 ? 0 : state.activeProductIdx - 1;
      return state;
    });
  },
  reducers: {},
});

/*****************************************************
 * Standard Selectors
 ****************************************************/

export const getName = (state: RootState): undefined | string =>
  state.product.name;

//  Metadata
export const getMetadata = (state: RootState): undefined | IMetadata =>
  state.product.metadata;

//  Product Cache
export const getActiveProductIdx = (state: RootState): number =>
  state.product.activeProductIdx;

export const getProductCache = (
  state: RootState
): Array<Pick<CachedProduct, 'name' | 'label' | 'thumbnail'>> =>
  state.product.cachedProducts.map(prod =>
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
  (prods?: IProducts) =>
  (dispatch: ThreekitDispatch, getState: () => RootState) => {
    if (prods) PRODUCTS = prods;
    const state = getState();
    const name = window.threekit.player.scene.get({
      id: window.threekit.player.assetId,
    }).name;
    const metadata = window.threekit.configurator.getMetadata();
    dispatch(setName(name));
    dispatch(setMetadata(metadata));
    if (!state.product.cachedProducts.length) {
      dispatch(setActiveProductIdx(0));
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
      { name: state.product.name, data: JSON.stringify(data) },
      label ? { label } : {},
      thumbnail ? { thumbnail } : {}
    );

    return dispatch(updateActiveProductCache(product));
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
    await dispatch(reloadPlayer(config));
    if (shouldCacheProduct) {
      dispatch(incrementActiveProductIdx());
      dispatch(cacheActiveProduct({ label, thumbnail }));
    }
  };

export const changeActiveProductIdx =
  (idx: number) =>
  async (dispatch: ThreekitDispatch, getState: () => RootState) => {
    const state = getState();
    const { cachedProducts } = state.product;

    if (idx >= cachedProducts.length) return Promise.resolve();

    dispatch(cacheActiveProduct());

    const cachedProduct = { ...state.product.cachedProducts[idx] };
    const data: Pick<CachedProduct, 'connection' | 'configuration'> =
      JSON.parse(cachedProduct.data);

    connection.connect(data.connection);

    dispatch(setActiveProductIdx(idx));
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
    const { cachedProducts, activeProductIdx } = state.product;

    if (cachedProducts.length <= 1) return Promise.resolve();

    if (!idx || idx === activeProductIdx) {
      if (activeProductIdx === state.product.cachedProducts.length - 1) {
        await dispatch(changeActiveProductIdx(activeProductIdx - 1));
        dispatch(removeProductFromCache(activeProductIdx));
      } else {
        dispatch(removeProductFromCache(activeProductIdx));
        await dispatch(changeActiveProductIdx(activeProductIdx));
      }
    } else if (idx >= activeProductIdx) {
      dispatch(removeProductFromCache(idx));
    } else if (idx <= activeProductIdx) {
      dispatch(decrementActiveProductIdx());
      dispatch(removeProductFromCache(idx));
    }

    return Promise.resolve();
  };

export default reducer;
