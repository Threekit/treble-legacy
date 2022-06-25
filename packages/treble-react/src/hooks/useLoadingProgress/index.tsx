import { useThreekitSelector } from '../../store';
import { getLoadingProgress } from '../../store/treble';

const useLoadingProgress = () => {
  const progress = useThreekitSelector<number>(getLoadingProgress);
  return progress;
};

export default useLoadingProgress;
