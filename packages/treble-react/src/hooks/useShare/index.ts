import { useThreekitSelector } from '../../store';
import { isThreekitInitialized } from '../../store/treble';
import message from '../../components/message';
import { copyToClipboard } from '../../utils';

type UseShareHook =
  | undefined
  | ((msg: string | undefined) => Promise<undefined | string>);

const useShare = (): UseShareHook => {
  const isLoaded = useThreekitSelector<boolean>(isThreekitInitialized);

  if (!isLoaded) return undefined;

  const handleShare = async (msg: string | undefined = 'Link copied') => {
    const configuration = await window.threekit.treble.saveConfiguration();
    if (!configuration) return Promise.resolve(undefined);
    copyToClipboard(configuration.resumableUrl);
    if (msg?.length) message.info(msg);
    return Promise.resolve(configuration?.resumableUrl || undefined);
  };

  return handleShare;
};

export default useShare;
