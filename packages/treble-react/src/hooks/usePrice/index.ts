import { useThreekitSelector } from '../../store';
import { getPrice, IPrice } from '../../store/price';

const usePrice = () => useThreekitSelector<undefined | IPrice>(getPrice);

export default usePrice;
