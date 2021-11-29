import { useThreekitSelector, useThreekitDispatch } from '../../store';
import { getAttributes, setConfiguration } from '../../store/threekit';
import { selectionToConfiguration } from '../../utils';
import {
  IConfigurationColor,
  ISetConfiguration,
  IThreekitDisplayAttribute,
} from '../../threekit';

export type AttributeValue = string | number | IConfigurationColor;

type UseAttributeError = [undefined, undefined];
type UseAttributeSuccess = [
  IThreekitDisplayAttribute,
  (val: AttributeValue) => void
];

type UseAttributeHook = UseAttributeError | UseAttributeSuccess;

const useAttribute = (attributeName?: string): UseAttributeHook => {
  if (!attributeName) return [undefined, undefined];
  const dispatch = useThreekitDispatch();
  const attributes = useThreekitSelector(getAttributes);

  if (!attributeName || !attributes) return [undefined, undefined];
  const attribute = attributes[attributeName];
  if (!attribute) return [undefined, undefined];

  const handleChange = (value: AttributeValue) => {
    const preppedValue = selectionToConfiguration(value, attribute.type);
    if (!preppedValue) return;
    dispatch(
      setConfiguration({
        [attributeName]: preppedValue,
      } as ISetConfiguration)
    );
  };

  return [attribute, handleChange];
};

export default useAttribute;
