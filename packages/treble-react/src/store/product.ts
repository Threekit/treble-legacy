import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import { IMetadata } from '../threekit';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export interface ProductState {
  //  Name of the Initialized Item
  name: undefined | string;
  //  Initialized item's metadata
  metadata: undefined | IMetadata;
}

/*****************************************************
 * Actions
 ****************************************************/

//  Actions to be used only internally
export const setName = createAction<string>('treble/product/set-name');
export const setMetadata = createAction<IMetadata>(
  'treble/product/set-metadata'
);

export const initProduct = () => (dispatch: ThreekitDispatch) => {
  const name = window.threekit.player.scene.get({
    id: window.threekit.player.assetId,
  }).name;
  const metadata = window.threekit.configurator.getMetadata();
  dispatch(setName(name));
  dispatch(setMetadata(metadata));
};

/*****************************************************
 * State
 ****************************************************/

const initialState: ProductState = {
  //  Name of the Initialized Item
  name: undefined,
  //  Initialized item's metadata
  metadata: undefined,
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

export default reducer;
