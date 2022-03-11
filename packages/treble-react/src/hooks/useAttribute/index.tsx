import { useThreekitSelector, useThreekitDispatch } from '../../store';
import { getHydrationData, setConfiguration } from '../../store/attributes';
import { selectionToConfiguration } from '../../utils';
import {
  ISetConfiguration,
  IHydratedAttribute,
  IConfigurationColor,
} from '../../types';
import threekitAPI from '../../api';
import { hydrateAttribute } from '../../utils';

export type RawAttributeValue =
  | string
  | number
  | boolean
  | IConfigurationColor
  | File
  | undefined;

type UseAttributeError = [undefined, undefined];
type UseAttributeSuccess = [
  IHydratedAttribute,
  (val: RawAttributeValue) => Promise<void>
];

type UseAttributeHook = UseAttributeError | UseAttributeSuccess;

const useAttribute = (attributeName?: string): UseAttributeHook => {
  if (!attributeName) return [undefined, undefined];
  const dispatch = useThreekitDispatch();
  const [attributes, translations, language] =
    useThreekitSelector(getHydrationData);

  if (!attributeName || !attributes) return [undefined, undefined];
  const attribute = attributes[attributeName];
  if (!attribute) return [undefined, undefined];

  const preppedAttributes = hydrateAttribute(
    [{ [attributeName]: attribute }, translations, language],
    config => dispatch(setConfiguration(config))
  );

  const handleChange = async (value: RawAttributeValue) => {
    let preppedValue;
    if (attribute.type === 'Asset' && attribute.assetType === 'upload') {
      if (!value) preppedValue = selectionToConfiguration('', attribute.type);
      else {
        const assetId = await threekitAPI.catalog.uploadAsset(value as File);
        if (assetId)
          preppedValue = selectionToConfiguration(assetId, attribute.type);
      }
    } else preppedValue = selectionToConfiguration(value, attribute.type);
    dispatch(
      setConfiguration({
        [attributeName]: preppedValue,
      } as ISetConfiguration)
    );
  };

  return [preppedAttributes[attributeName], handleChange];
};

export default useAttribute;
