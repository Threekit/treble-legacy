import {
  getProductCache,
  getActiveCacheIdx,
  changeActiveCacheIdx,
  loadNewProduct,
  removeProductIdx,
  CachedProduct,
  PRODUCTS,
  loadProduct,
} from '../../store/product';
import { useThreekitSelector, useThreekitDispatch } from '../../store';
import { IReloadConfig } from '../../store/treble';

interface HydratedCacheProduct
  extends Pick<CachedProduct, 'name' | 'label' | 'thumbnail'> {
  selected: boolean;
  handleSelect: () => Promise<void>;
  handleRemove: () => Promise<void>;
}

interface ISelectableProduct {
  id: string;
  label: string;
  handleSelect: () => void;
}

interface CacheData {
  cache: Array<HydratedCacheProduct>;
  products: Array<ISelectableProduct>;
}

type UseProductCache = [
  CacheData,
  (config?: string | IReloadConfig) => Promise<void>
];

const useProductCache = (): UseProductCache => {
  const dispatch = useThreekitDispatch();
  const cache = useThreekitSelector(getProductCache);
  const activeProductIdx = useThreekitSelector(getActiveCacheIdx);

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
          : () => dispatch(changeActiveCacheIdx(i)),
    })
  );

  const products: Array<ISelectableProduct> = Object.keys(PRODUCTS).map(
    prod => ({
      id: prod,
      label: prod,
      handleSelect: () => dispatch(loadProduct(prod)),
    })
  );

  return [{ cache: hydratedCache, products }, handleLoadNewProduct];
};

export default useProductCache;
