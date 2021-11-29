import { useThreekitSelector } from '../../store';
import { isThreekitLoaded } from '../../store/threekit';

const useThreekitInitStatus = () =>
  useThreekitSelector<boolean>(isThreekitLoaded);

export default useThreekitInitStatus;
