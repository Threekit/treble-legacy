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

interface CacheData {
  activeProductIdx: number;
  cache: Array<Pick<CachedProduct, 'name' | 'label' | 'thumbnail'>>;
}

type UseProductCache = [
  CacheData,
  (config?: string | IReloadConfig) => Promise<void>,
  (idx: number) => Promise<void>,
  (idx: number) => Promise<void>
];

const useProductCache = (): UseProductCache => {
  const dispatch = useThreekitDispatch();
  const cache = useThreekitSelector(getProductCache);
  const activeProductIdx = useThreekitSelector(getActiveProductIdx);

  const data = {
    cache,
    activeProductIdx,
  };

  const handleChangeActiveProduct = (idx: number) => {
    if (idx === undefined) return Promise.resolve();
    if (idx === activeProductIdx) return Promise.resolve();
    if (!cache || idx >= cache?.length) return Promise.resolve();
    return dispatch(changeActiveProductIdx(idx));
  };

  const handleLoadNewProduct = (config?: string | IReloadConfig) => {
    return dispatch(loadNewProduct(config));
  };

  const handleRemoveProduct = (idx: number) => {
    return dispatch(removeProductIdx(idx));
  };

  return [
    data,
    handleLoadNewProduct,
    handleChangeActiveProduct,
    handleRemoveProduct,
  ];
};

export default useProductCache;
