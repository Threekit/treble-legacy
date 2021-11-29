import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import logger from 'redux-logger';

import threekit from './threekit';

const store = configureStore({
  reducer: { threekit },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type ThreekitDispatch = typeof store.dispatch;
export const useThreekitDispatch = () => useDispatch<ThreekitDispatch>();
export const useThreekitSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
