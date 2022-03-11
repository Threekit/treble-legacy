import { getHydrationData, setConfiguration } from '../../store/attributes';
import { ISetConfiguration, IHydratedAttribute } from '../../types';
import { useThreekitSelector, useThreekitDispatch } from '../../store';
import { hydrateAttribute } from '../../utils';

type UseConfiguratorError = [undefined, undefined];
type UseConfiguratorSuccess = [
  Record<string, IHydratedAttribute>,
  (configuration: ISetConfiguration) => void
];

type UseConfiguratorHook = UseConfiguratorError | UseConfiguratorSuccess;

const useConfigurator = (): UseConfiguratorHook => {
  const dispatch = useThreekitDispatch();
  const hydrationData = useThreekitSelector(getHydrationData);

  if (!hydrationData) return [undefined, undefined];

  const preppedAttributes = hydrateAttribute(hydrationData, config =>
    dispatch(setConfiguration(config))
  );

  const handleChange = (configuration: ISetConfiguration) =>
    dispatch(setConfiguration(configuration));

  return [preppedAttributes, handleChange];
};

export default useConfigurator;
