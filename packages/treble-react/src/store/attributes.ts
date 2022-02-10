import { createSlice, createAction } from '@reduxjs/toolkit';
import { RootState, ThreekitDispatch } from './index';
import { ISetConfiguration, IThreekitDisplayAttribute } from '../threekit';
import { setPlayerLoading } from './treble';

/*****************************************************
 * Types and Interfaces
 ****************************************************/

export type AttributesState = Record<string, IThreekitDisplayAttribute>;

// export interface AttributesState {
//   attributes: Record<string, IThreekitDisplayAttribute>;
// }
/*****************************************************
 * Actions
 ****************************************************/

export const setAttributes =
  createAction<Array<IThreekitDisplayAttribute>>('setAttributes');

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
    builder.addCase(setAttributes, (state, action) => {
      state = action.payload.reduce(
        (output, attr) => Object.assign(output, { [attr.name]: attr }),
        {} as Record<string, IThreekitDisplayAttribute>
      );
      return state;
    });
  },
});

/*****************************************************
 * Standard Selectors
 ****************************************************/

//  Attributes
export const getAttributes = (
  state: RootState
): undefined | Record<string, IThreekitDisplayAttribute> => {
  //   const { isThreekitLoaded, attributes, language, translations } =
  //     state.threekit;
  const { attributes } = state;
  const { isThreekitInitialized } = state.treble;
  const { language, translations } = state.translations;

  if (!isThreekitInitialized) return undefined;
  if (!attributes) return undefined;

  const hasTranslation = !!language && !!translations;
  return Object.values(attributes).reduce(
    (
      output: Record<string, IThreekitDisplayAttribute>,
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
                  })
                ),
              }
            : undefined
        ),
      }),
    {} as Record<string, IThreekitDisplayAttribute>
  );
};

//  Configurator
export const setConfiguration =
  (config: ISetConfiguration) => async (dispatch: ThreekitDispatch) => {
    dispatch(setPlayerLoading(true));
    await window.threekit.configurator.setConfiguration(config);
    dispatch(setPlayerLoading(false));
  };

export default reducer;
