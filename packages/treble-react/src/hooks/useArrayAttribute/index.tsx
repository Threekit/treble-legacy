import { useThreekitSelector, useThreekitDispatch } from '../../store';
import { getHydrationData, setConfiguration } from '../../store/attributes';
import {
  IConfigurationAsset,
  IDisplayAttributeAssetArray,
  IDisplayAttributeAssetValue,
} from '../../types';
import message from '../../components/message';

interface IMoveArrayConfig {
  method: 'move' | 'clone';
}

type UseArrayAttributeError = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined
];
type UseArrayAttributeSuccess = [
  Array<IDisplayAttributeAssetValue>,
  Array<any>,
  (assetId: string, addToIdx: number) => Promise<void>,
  (fromIdx: number, toIdx: number, config: IMoveArrayConfig) => Promise<void>,
  (idx: number) => Promise<void>
];

type UseArrayAttributeHook = UseArrayAttributeError | UseArrayAttributeSuccess;

const useArrayAttribute = (attributeName: string): UseArrayAttributeHook => {
  const dispatch = useThreekitDispatch();
  const [attributes] = useThreekitSelector(getHydrationData);
  // const [attributes, translations, language] =
  //   useThreekitSelector(getHydrationData);

  if (!attributeName || attributes[attributeName]?.type !== 'Array')
    return [undefined, undefined, undefined, undefined, undefined];

  const attribute = attributes[attributeName] as IDisplayAttributeAssetArray;
  const options = [...attribute.values];
  const state = [...attribute.value];

  const addItem = async (assetId: string, addToIdx?: number) => {
    if (addToIdx !== undefined && addToIdx < 0) return Promise.resolve();

    if (attribute.value.length === attribute.maxLength) {
      message.info(`Max items reached for ${attribute.name}`);
      return Promise.resolve();
    }

    let updatedState: Array<IConfigurationAsset>;
    if (addToIdx === undefined || addToIdx >= attribute.value.length)
      updatedState = [...attribute.value, { assetId }];
    else
      updatedState = attribute.value.reduce((output, val, idx) => {
        if (idx === addToIdx) output.push({ assetId });
        output.push(val);
        return output;
      }, [] as Array<IConfigurationAsset>);

    await dispatch(setConfiguration({ [attributeName]: updatedState }));
    return Promise.resolve();
  };

  const deleteItem = async (idx: number) => {
    if (idx === undefined) return Promise.resolve();
    if (idx >= attribute.value.length || idx < 0) return Promise.resolve();

    const updatedState = attribute.value.reduce((output, val, i) => {
      if (idx === i) return output;
      output.push(val);
      return output;
    }, [] as Array<IConfigurationAsset>);

    await dispatch(setConfiguration({ [attributeName]: updatedState }));
    return Promise.resolve();
  };

  const moveItem = async (
    fromIdx: number,
    toIdx: number,
    config?: IMoveArrayConfig
  ) => {
    const { method } = Object.assign({ method: 'move' }, config);

    let updatedState: Array<IConfigurationAsset>;
    switch (method) {
      case 'move':
      default:
        updatedState = attribute.value.reduce((output, val, idx, srcArray) => {
          if (idx === fromIdx) return output;
          if (idx === toIdx) output.push(srcArray[fromIdx]);
          output.push(val);
          return output;
        }, [] as Array<IConfigurationAsset>);
        break;
    }

    await dispatch(setConfiguration({ [attributeName]: updatedState }));
    return Promise.resolve();
  };

  return [options, state, addItem, moveItem, deleteItem];
};

export default useArrayAttribute;
