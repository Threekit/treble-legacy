import { useThreekitSelector } from '../../store';
import { getName } from '../../store/threekit';

const useName = () => useThreekitSelector<undefined | string>(getName);

export default useName;
