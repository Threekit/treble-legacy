import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import { ITranslationMap } from '../api/products';
import threekitAPI from '../api';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export interface TranslationsState {
  language: string | undefined;
}

/*****************************************************
 * Constants
 ****************************************************/

export let TRANSLATIONS: undefined | ITranslationMap;

/*****************************************************
 * Actions
 ****************************************************/

export const setLanguage = createAction<string>(
  'treble/translations/set-language'
);
export const initTranslations =
  (language?: string) => async (dispatch: ThreekitDispatch) => {
    TRANSLATIONS = await threekitAPI.products.fetchTranslations();
    if (language) dispatch(setLanguage(language));
  };

/*****************************************************
 * State
 ****************************************************/

const initialState: TranslationsState = {
  //  Selected language
  language: undefined,
};

const { reducer } = createSlice({
  name: 'translations',
  initialState,
  extraReducers: builder => {
    builder.addCase(setLanguage, (state, action) => {
      state.language = action.payload;
    });
  },
  reducers: {},
});

/*****************************************************
 * Standard Selectors
 ****************************************************/

export const getLanguage = (state: RootState): undefined | string =>
  state.translations.language;

export const getLanguageOptions = (state: RootState): Array<string> => {
  if (!state.treble.isThreekitInitialized || !TRANSLATIONS) return [];
  return Object.keys(Object.values(TRANSLATIONS)[0]);
};

export default reducer;
