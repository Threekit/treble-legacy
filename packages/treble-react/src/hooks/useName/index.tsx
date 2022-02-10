import { useThreekitSelector } from '../../store';
import { getName } from '../../store/product';

const useName = () => useThreekitSelector<undefined | string>(getName);

export default useName;
