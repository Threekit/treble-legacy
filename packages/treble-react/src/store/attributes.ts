import { createSlice, createAction, createSelector } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import { ISetConfiguration, IThreekitDisplayAttribute } from '../types';
import { setPlayerLoading, setThreekitInitialized } from './treble';
import { getLanguage, TRANSLATIONS } from './translations';
import { ITranslationMap } from '../api/products';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export type AttributesState = Record<string, IThreekitDisplayAttribute>;

/*****************************************************
 * Actions
 ****************************************************/

export const setAttributes = createAction(
  'treble/attributes/set-attributes',
  (attributes: Array<IThreekitDisplayAttribute>) => {
    const payload = attributes.reduce(
      (output, attr) => Object.assign(output, { [attr.name]: attr }),
      {} as Record<string, IThreekitDisplayAttribute>
    );
    return { payload };
  }
);

/*****************************************************
 * State and Data
 ****************************************************/

const initialState: AttributesState = {};

/*****************************************************
 * Slice
 ****************************************************/

const { reducer } = createSlice({
  name: 'attributes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setThreekitInitialized, () => {
      const attributes = window.threekit.configurator.getDisplayAttributes();
      return attributes.reduce(
        (output, attr) => Object.assign(output, { [attr.name]: attr }),
        {} as Record<string, IThreekitDisplayAttribute>
      );
    });
    builder.addCase(setAttributes, (_, action) => {
      return action.payload;
    });
  },
});

/*****************************************************
 * Standard Selectors
 ****************************************************/

export const getAttributes = (state: RootState) => state.attributes;

export const getHydrationData = createSelector(
  getAttributes,
  getLanguage,
  (
    attributes: Record<string, IThreekitDisplayAttribute>,
    language: undefined | string
  ): [
    Record<string, IThreekitDisplayAttribute>,
    undefined | ITranslationMap,
    undefined | string
  ] => {
    return [attributes, TRANSLATIONS, language];
  }
);

//  Configurator
export const setConfiguration =
  (config: ISetConfiguration) => async (dispatch: ThreekitDispatch) => {
    dispatch(setPlayerLoading(true));
    await window.threekit.configurator.setConfiguration(config);
    dispatch(setPlayerLoading(false));
  };

export default reducer;
