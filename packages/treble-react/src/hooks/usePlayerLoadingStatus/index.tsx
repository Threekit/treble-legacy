import { useThreekitSelector } from '../../store';
import { isPlayerLoading } from '../../store/threekit';

const usePlayerLoadingStatus = () =>
  useThreekitSelector<boolean>(isPlayerLoading);

export default usePlayerLoadingStatus;
