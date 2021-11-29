import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  resumeFromWishlist,
  clearWishlist,
  isThreekitLoaded,
} from '../../store/threekit';
import { ISaveConfigurationConfig, WishlistArray } from '../../Treble';
import { useThreekitSelector, useThreekitDispatch } from '../../store';
import { copyToClipboard, getResumableUrl } from '../../utils';
import message from '../../components/message';

type UseWishlistHook =
  | [
      WishlistArray,
      (config?: ISaveConfigurationConfig) => Promise<void>,
      (idx: number) => void,
      (idx: number) => void,
      (idx: number) => void,
      () => void
    ]
  | [undefined, undefined, undefined, undefined, undefined, undefined];

const useWishlist = (): UseWishlistHook => {
  const dispatch = useThreekitDispatch();
  const isLoaded = useThreekitSelector<boolean>(isThreekitLoaded);
  const wishlist = useThreekitSelector(getWishlist);

  if (!isLoaded)
    return [undefined, undefined, undefined, undefined, undefined, undefined];

  const handleAddToWishlist = (config: ISaveConfigurationConfig) =>
    dispatch(addToWishlist(config));

  const handleRemoveFromWishlist = (idx: number) => {
    dispatch(removeFromWishlist(idx));
    message.info('Item removed from wishlist');
  };
  const handleResumeItem = (idx: number) => {
    dispatch(resumeFromWishlist(idx));
  };

  const handleShareItem = (idx: number) => {
    const url = getResumableUrl(wishlist[idx].shortId);
    copyToClipboard(url);
    message.info('Link copied!');
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist);
  };

  return [
    wishlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleResumeItem,
    handleShareItem,
    handleClearWishlist,
  ];
};

export default useWishlist;
