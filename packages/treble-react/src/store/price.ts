import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import threekitAPI from '../api';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export interface IPriceConfig {
  id: string;
  currency: string;
}

export interface IPrice {
  currency: string;
  price: number;
}

export interface PriceState {
  id: undefined | string;
  currency: undefined | string;
  price: undefined | number;
}

/*****************************************************
 * Actions
 ****************************************************/

//  Actions to be used only internally
export const setPriceConfig = createAction<IPriceConfig>(
  'treble/price/set-price-config'
);
export const setPrice = createAction<number>('treble/price/set-price');

export const initPrice = () => async (dispatch: ThreekitDispatch) => {
  const pricebook = await threekitAPI.price.getPricebooksList();

  if (pricebook.length) {
    const id = pricebook[0].id;
    const currency = pricebook[0].currencies[0];

    dispatch(setPriceConfig({ id, currency }));
    const price = window.threekit.configurator.getPrice(id, currency);
    dispatch(setPrice(price));
  }
};

/*****************************************************
 * State
 ****************************************************/

const initialState: PriceState = {
  //  Selected language
  id: undefined,
  currency: undefined,
  price: undefined,
};

const { reducer } = createSlice({
  name: 'price',
  initialState,
  extraReducers: builder => {
    builder.addCase(setPriceConfig, (state, action) => {
      const { id, currency } = action.payload;
      state.id = id;
      state.currency = currency;
      return state;
    });
    builder.addCase(setPrice, (state, action) => {
      state.price = action.payload;
      return state;
    });
  },
  reducers: {},
});

/*****************************************************
 * Standard Selectors
 ****************************************************/

export const getPrice = (state: RootState): undefined | IPrice => {
  const { price, currency } = state.price;
  if (!price || !currency) return undefined;
  return { price, currency };
};

export const getPriceConfig = (state: RootState): undefined | IPriceConfig => {
  const { id, currency } = state.price;
  if (!id || !currency) return undefined;
  return { id, currency };
};

/*****************************************************
 * Complex Actions
 ****************************************************/

export const updatePrice =
  () => (dispatch: ThreekitDispatch, getState: () => RootState) => {
    const { price } = getState();
    if (!price.id || !price.currency) return;
    dispatch(
      setPrice(window.threekit.configurator.getPrice(price.id, price.currency))
    );
  };

export default reducer;
