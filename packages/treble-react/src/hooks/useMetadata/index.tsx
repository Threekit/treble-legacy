import { useThreekitSelector } from '../../store';
import { getMetadata } from '../../store/product';
import { IMetadata } from '../../threekit';

const useMetadata = () => {
  const metadata = useThreekitSelector<undefined | IMetadata>(getMetadata);
  return metadata;
};

export default useMetadata;
