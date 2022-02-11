import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import { ISaveConfigurationConfig, WishlistArray } from '../Treble';

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

export const refreshWishlist = createAsyncThunk(
  'treble/wishlist/refresh-data',
  async () => {
    const wishlistData = await window.threekit.treble.wishlist.getWishlist();
    return wishlistData;
  }
);

export const addToWishlist = createAsyncThunk(
  'treble/wishlist/add-item',
  async (config: ISaveConfigurationConfig) => {
    const wishlistData = await window.threekit.treble.wishlist.addItem(config);
    return wishlistData;
  }
);

export const clearWishlist = createAction('treble/wishlist/clear', () => {
  const wishlistData = window.threekit.treble.wishlist.clearWishlist();
  return { payload: wishlistData };
});

export const removeFromWishlist = createAction(
  'treble/wishlist/remove-item',
  (idx: number) => {
    const wishlistData = window.threekit.treble.wishlist.removeItemByIdx(idx);
    return { payload: wishlistData };
  }
);

/*****************************************************
 * Slice
 ****************************************************/

const { reducer } = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(refreshWishlist.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(addToWishlist.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(removeFromWishlist, (_, action) => {
      return action.payload;
    });
    builder.addCase(clearWishlist, (_, action) => {
      return action.payload;
    });
  },
});

/*****************************************************
 * Standard Selectors
 ****************************************************/

//  Wishlist
export const getWishlist = (state: RootState) => state.wishlist;

export const resumeFromWishlist =
  (idx: number) => (_: ThreekitDispatch, getState: () => RootState) => {
    const { wishlist } = getState();
    const savedConfiguration = wishlist[idx];
    if (!savedConfiguration) return;
    window.threekit.configurator.setConfiguration(savedConfiguration.variant);
  };

export default reducer;
