import { useThreekitSelector } from '../../store';
import { isPlayerLoading } from '../../store/treble';

const usePlayerLoadingStatus = () =>
  useThreekitSelector<boolean>(isPlayerLoading);

export default usePlayerLoadingStatus;
