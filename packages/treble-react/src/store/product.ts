import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState } from './index';
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
export const setName = createAction<string>('setName');
export const setMetadata = createAction<IMetadata>('setMetadata');

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
    //  Language
    builder.addCase(setName, (state, action) => {
      state.name = action.payload;
    });
    builder.addCase(setMetadata, (state, action) => {
      state.metadata = action.payload;
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
