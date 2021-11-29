import { useThreekitSelector } from '../../store';
import { getPrice, IPrice } from '../../store/threekit';

const usePrice = () => useThreekitSelector<undefined | IPrice>(getPrice);

export default usePrice;
