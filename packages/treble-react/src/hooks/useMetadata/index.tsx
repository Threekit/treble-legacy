import { useThreekitSelector } from '../../store';
import { getMetadata } from '../../store/product';
import { IMetadata } from '../../types';

const useMetadata = () => {
  const metadata = useThreekitSelector<undefined | IMetadata>(getMetadata);
  return metadata;
};

export default useMetadata;
