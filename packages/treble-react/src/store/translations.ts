import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import { ITranslationMap } from '../api/products';
import threekitAPI from '../api';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export interface TranslationsState {
  translations: undefined | ITranslationMap;
  language: string | undefined;
}

/*****************************************************
 * Actions
 ****************************************************/

//  Actions to be used only internally
export const setTranslations = createAction<ITranslationMap>(
  'treble/translations/set-translations'
);
export const setLanguage = createAction<string>(
  'treble/translations/set-language'
);
export const initTranslations =
  (language?: string) => async (dispatch: ThreekitDispatch) => {
    const translations = await threekitAPI.products.fetchTranslations();

    dispatch(setTranslations(translations));
    if (language) dispatch(setLanguage(language));
  };

/*****************************************************
 * State
 ****************************************************/

const initialState: TranslationsState = {
  //  Selected language
  translations: undefined,
  language: undefined,
};

const { reducer } = createSlice({
  name: 'translations',
  initialState,
  extraReducers: builder => {
    builder.addCase(setTranslations, (state, action) => {
      state.translations = action.payload;
    });
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

export const getTranslations = (
  state: RootState
): undefined | ITranslationMap => state.translations.translations;

export const getLanguageOptions = (state: RootState): Array<string> => {
  if (!state.treble.isThreekitInitialized || !state.translations.translations)
    return [];
  return Object.keys(Object.values(state.translations.translations)[0]);
};

export default reducer;
