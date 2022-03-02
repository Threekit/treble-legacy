import { createSlice, createAction, createSelector } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import {
  ISetConfiguration,
  IThreekitDisplayAttribute,
  IHydratedAttribute,
} from '../threekit';
import { setPlayerLoading, setThreekitInitialized } from './treble';
import { getLanguage, getTranslations } from './translations';
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

export const getHydratedAttributes = createSelector(
  getAttributes,
  getTranslations,
  getLanguage,
  (
    attributes: Record<string, IThreekitDisplayAttribute>,
    translations: undefined | ITranslationMap,
    language: undefined | string
  ): Record<string, IHydratedAttribute> => {
    const hasTranslation = !!language && !!translations;
    return Object.values(attributes).reduce(
      (
        output: Record<string, IHydratedAttribute>,
        attribute: IThreekitDisplayAttribute
      ) =>
        Object.assign(output, {
          [attribute.name]: Object.assign(
            {},
            attribute,
            {
              label: hasTranslation
                ? translations?.[attribute.name]?.[language] || attribute.name
                : attribute.name,
            },
            attribute.type === 'String'
              ? {
                  values: attribute.values.map(el =>
                    Object.assign({}, el, {
                      label: hasTranslation
                        ? translations?.[el.label]?.[language] || el.label
                        : el.label,
                      handleSelect: () =>
                        window.threekit.configurator.setConfiguration({
                          [attribute.name]: el.value,
                        }),
                      selected: attribute.value === el.value,
                    })
                  ),
                }
              : attribute.type === 'Asset'
              ? {
                  values: attribute.values.map(el =>
                    Object.assign({}, el, {
                      label: hasTranslation
                        ? translations?.[el.name]?.[language] || el.name
                        : el.name,
                      handleSelect: () =>
                        window.threekit.configurator.setConfiguration({
                          [attribute.name]: el.assetId,
                        }),
                      selected: attribute.value.assetId === el.assetId,
                    })
                  ),
                }
              : undefined
          ),
        }),
      {} as Record<string, IHydratedAttribute>
    );
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
