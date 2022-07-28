import { useThreekitSelector } from '../../store';
import { getLoadingProgress } from '../../store/treble';

const useLoadingProgress = () => {
  const progress = useThreekitSelector(getLoadingProgress);
  return progress;
};

export default useLoadingProgress;
