import { useThreekitSelector } from '../../store';
import { isThreekitLoaded } from '../../store/threekit';
import message from '../../components/message';
import { copyToClipboard } from '../../utils';

const useShare = (): undefined | (() => Promise<void>) => {
  const isLoaded = useThreekitSelector<boolean>(isThreekitLoaded);

  if (!isLoaded) return undefined;

  const handleShare = async () => {
    const configuration = await window.threekit.treble.saveConfiguration();
    if (!configuration) return;
    copyToClipboard(configuration.resumableUrl);
    message.info('Link copied!');
  };

  return handleShare;
};

export default useShare;
