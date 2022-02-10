import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import { ISaveConfigurationConfig, WishlistArray } from '../Treble';
import { IConfigurationResponse } from '../http/configurations';
import { setConfiguration } from './attributes';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export type WishlistState = WishlistArray;

/*****************************************************
 * State
 ****************************************************/

const initialState: WishlistState = [];

/*****************************************************
 * Standard Selectors
 ****************************************************/

export const setWishlist =
  createAction<Array<IConfigurationResponse>>('setWishlist');

/*****************************************************
 * Slice
 ****************************************************/

const { reducer } = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setWishlist, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

/*****************************************************
 * Standard Selectors
 ****************************************************/

//  Wishlist
export const getWishlist = (state: RootState) => state.wishlist;

export const addToWishlist =
  (config: ISaveConfigurationConfig) => async (dispatch: ThreekitDispatch) => {
    const wishlistData = await window.threekit.treble.wishlist.addItem(config);
    dispatch(setWishlist(wishlistData));
  };

export const removeFromWishlist =
  (idx: number) => (dispatch: ThreekitDispatch) => {
    const wishlistData = window.threekit.treble.wishlist.removeItemByIdx(idx);
    dispatch(setWishlist(wishlistData));
  };

export const resumeFromWishlist =
  (idx: number) => (dispatch: ThreekitDispatch, getState: () => RootState) => {
    const { wishlist } = getState();
    const savedConfiguration = wishlist[idx];
    if (!savedConfiguration) return;
    dispatch(setConfiguration(savedConfiguration.variant));
  };

export const clearWishlist = () => (dispatch: ThreekitDispatch) => {
  const wishlistData = window.threekit.treble.wishlist.clearWishlist();
  dispatch(setWishlist(wishlistData));
};

export default reducer;
