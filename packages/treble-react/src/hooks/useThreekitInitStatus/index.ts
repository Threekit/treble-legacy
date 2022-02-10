import { useThreekitSelector } from '../../store';
import { isThreekitInitialized } from '../../store/treble';

const useThreekitInitStatus = () =>
  useThreekitSelector<boolean>(isThreekitInitialized);

export default useThreekitInitStatus;
