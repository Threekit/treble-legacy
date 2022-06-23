import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { Reducer } from 'redux';
import logger from 'redux-logger';
import { TREBLE_DEBUG } from '../constants';

import treble from './treble';
import product from './product';
import attributes from './attributes';
import wishlist from './wishlist';
import translations from './translations';
import price from './price';

const store = configureStore({
  reducer: {
    treble,
    product,
    attributes,
    translations,
    wishlist,
    price,
  },
  middleware: TREBLE_DEBUG
    ? getDefaultMiddleware => getDefaultMiddleware().concat(logger)
    : getDefaultMiddleware => getDefaultMiddleware(),
});

export const createStore = (reducer?: Record<string, Reducer>) => {
  if (!reducer) return store;
  return configureStore({
    reducer: {
      ...reducer,
      treble,
      product,
      attributes,
      translations,
      wishlist,
      price,
    },
    middleware: TREBLE_DEBUG
      ? getDefaultMiddleware => getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware => getDefaultMiddleware(),
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type ThreekitDispatch = typeof store.dispatch;
export const useThreekitDispatch = () => useDispatch<ThreekitDispatch>();
export const useThreekitSelector: TypedUseSelectorHook<RootState> = useSelector;

export default createStore;
