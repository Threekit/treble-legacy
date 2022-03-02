import {
  getProductCache,
  getActiveProductIdx,
  changeActiveProductIdx,
  loadNewProduct,
  removeProductIdx,
  CachedProduct,
} from '../../store/product';
import { useThreekitSelector, useThreekitDispatch } from '../../store';
import { IReloadConfig } from '../../store/treble';

interface HydratedCacheProduct
  extends Pick<CachedProduct, 'name' | 'label' | 'thumbnail'> {
  selected: boolean;
  handleSelect: () => Promise<void>;
  handleRemove: () => Promise<void>;
}
interface CacheData {
  cache: Array<HydratedCacheProduct>;
}

type UseProductCache = [
  CacheData,
  (config?: string | IReloadConfig) => Promise<void>
];

const useProductCache = (): UseProductCache => {
  const dispatch = useThreekitDispatch();
  const cache = useThreekitSelector(getProductCache);
  const activeProductIdx = useThreekitSelector(getActiveProductIdx);

  const handleLoadNewProduct = (config?: string | IReloadConfig) => {
    return dispatch(loadNewProduct(config));
  };

  const hydratedCache: Array<HydratedCacheProduct> = cache.map((el, i) =>
    Object.assign({}, el, {
      selected: activeProductIdx === i,
      handleRemove: () => dispatch(removeProductIdx(i)),
      handleSelect:
        activeProductIdx === i
          ? () => Promise.resolve()
          : () => dispatch(changeActiveProductIdx(i)),
    })
  );

  return [{ cache: hydratedCache }, handleLoadNewProduct];
};

export default useProductCache;
