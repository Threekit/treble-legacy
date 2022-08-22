import { useThreekitSelector } from '../../store';
import { isFirstRenderComplete } from '../../store/treble';

const useAnimationStart = () =>
  useThreekitSelector<boolean>(isFirstRenderComplete);

export default useAnimationStart;
