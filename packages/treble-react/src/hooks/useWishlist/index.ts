import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  resumeFromWishlist,
  clearWishlist,
} from '../../store/wishlist';
import { isThreekitInitialized } from '../../store/treble';
import { IConfigurationResponse } from '../../http/configurations';
import { ISaveConfiguration } from '../../api/configurations';
import { useThreekitSelector, useThreekitDispatch } from '../../store';
import { copyToClipboard, getResumableUrl } from '../../utils';
import message from '../../components/message';

interface HydratedWishlistItem extends IConfigurationResponse {
  handleSelect: () => void;
  handleRemove: () => void;
  handleShare: () => void;
}

type UseWishlistHook =
  | [
      Array<HydratedWishlistItem>,
      (config?: Omit<ISaveConfiguration, 'configurator'>) => void,
      () => void
    ]
  | [undefined, undefined, undefined];

const useWishlist = (): UseWishlistHook => {
  const dispatch = useThreekitDispatch();
  const isLoaded = useThreekitSelector<boolean>(isThreekitInitialized);
  const wishlistData = useThreekitSelector(getWishlist);

  if (!isLoaded) return [undefined, undefined, undefined];

  const handleAddToWishlist = (
    config: Omit<ISaveConfiguration, 'configurator'>
  ) => dispatch(addToWishlist(config));

  const handleClearWishlist = () => {
    dispatch(clearWishlist);
  };

  const wishlist: Array<HydratedWishlistItem> = wishlistData.map((el, i) =>
    Object.assign({}, el, {
      handleSelect: () => dispatch(resumeFromWishlist(i)),
      handleRemove: () => {
        dispatch(removeFromWishlist(i));
        message.info('Item removed from wishlist');
      },
      handleShare: () => {
        copyToClipboard(getResumableUrl(el.shortId));
        message.info('Link copied!');
      },
    })
  );

  return [wishlist, handleAddToWishlist, handleClearWishlist];
};

export default useWishlist;
