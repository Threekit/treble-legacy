import {
  getHydratedAttributes,
  setConfiguration,
} from '../../store/attributes';
import { ISetConfiguration, IHydratedAttribute } from '../../threekit';
import { useThreekitSelector, useThreekitDispatch } from '../../store';

type UseConfiguratorError = [undefined, undefined];
type UseConfiguratorSuccess = [
  Record<string, IHydratedAttribute>,
  (configuration: ISetConfiguration) => void
];

type UseConfiguratorHook = UseConfiguratorError | UseConfiguratorSuccess;

const useConfigurator = (): UseConfiguratorHook => {
  const dispatch = useThreekitDispatch();
  const attributes = useThreekitSelector<
    undefined | Record<string, IHydratedAttribute>
  >(getHydratedAttributes);

  if (!attributes) return [undefined, undefined];

  const handleChange = (configuration: ISetConfiguration) =>
    dispatch(setConfiguration(configuration));

  return [attributes, handleChange];
};

export default useConfigurator;
