import threekitAPI from '../../api';
import { setConfiguration } from '../../store/attributes';
import { useThreekitDispatch } from '../../store';

const useConfigurationLoader = () => {
  const dispatch = useThreekitDispatch();

  const loadConfiguration = async (configurationId: string) => {
    if (!configurationId) return;
    const configuration = await threekitAPI.configurations.fetch(
      configurationId
    );
    if (!configuration) return;
    await dispatch(setConfiguration(configuration.data.variant));
    return Promise.resolve();
  };

  return loadConfiguration;
};

export default useConfigurationLoader;
