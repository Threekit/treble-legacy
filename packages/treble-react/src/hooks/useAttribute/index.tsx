import { useThreekitSelector, useThreekitDispatch } from '../../store';
import { getAttributes, setConfiguration } from '../../store/attributes';
import { selectionToConfiguration } from '../../utils';
import { ASSET_TYPES } from '../../constants';
import {
  ISetConfiguration,
  IThreekitDisplayAttribute,
  IConfigurationColor,
} from '../../threekit';
import threekitAPI from '../../api';

export type RawAttributeValue =
  | string
  | number
  | boolean
  | IConfigurationColor
  | File
  | undefined;

type UseAttributeError = [undefined, undefined];
type UseAttributeSuccess = [
  IThreekitDisplayAttribute,
  (val: RawAttributeValue) => Promise<void>
];

type UseAttributeHook = UseAttributeError | UseAttributeSuccess;

const useAttribute = (attributeName?: string): UseAttributeHook => {
  if (!attributeName) return [undefined, undefined];
  const dispatch = useThreekitDispatch();
  const attributes = useThreekitSelector(getAttributes);

  if (!attributeName || !attributes) return [undefined, undefined];
  const attribute = attributes[attributeName];
  if (!attribute) return [undefined, undefined];

  const handleChange = async (value: RawAttributeValue) => {
    let preppedValue;
    if (
      attribute.type === 'Asset' &&
      attribute.assetType === ASSET_TYPES.upload
    ) {
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

  return [attribute, handleChange];
};

export default useAttribute;
