import { useState } from 'react';
import {
  Drawer,
  useWishlist,
  WishlistIcon,
  HeartIcon,
  DeleteIcon,
  ShareIcon,
} from '@threekit-tools/treble';

const BASE_BTN_STYLES =
  'h-11 min-w-11 px-3 bg-white cursor-pointer border border-solid rounded-sm';
const ICON_BTN_STYLES = `${BASE_BTN_STYLES} border-gray-300 text-gray-500 hover:text-primary hover:border-primary`;

export default function Wishlist() {
  const [showWishlist, setShowWishlist] = useState(false);
  const [
    wishlist,
    addToWishlist,
    removeFromWishlist,
    resumeWishlistItem,
    shareWishlistItem,
  ] = useWishlist();
  if (!wishlist) return null;

  const handleAddToWishlist = async () => {
    await addToWishlist();
    setShowWishlist(true);
  };

  const handleClickResume = (idx) => {
    resumeWishlistItem(idx);
    setShowWishlist(false);
  };
  return (
    <>
      <button className="trbl-wgt-btn" onClick={() => setShowWishlist(true)}>
        <WishlistIcon />
      </button>
      <button
        className="trbl-wgt-btn"
        onClick={() => handleAddToWishlist(true)}
      >
        <HeartIcon />
      </button>
      <Drawer
        title="My Wishlist"
        show={showWishlist}
        handleClose={() => setShowWishlist(false)}
      >
        <div className="grid grid-cols-2 gap-3 px-3">
          {wishlist.map((item, i) => (
            <div
              key={i}
              className="p-2 w-max border border-solid border-gray-300 shadow-wishlist rounded-sm"
            >
              <div className="h-50 w-50 mx-auto">
                <img
                  className="h-50 w-50 object-contain"
                  src={item.thumbnail}
                />
              </div>
              <div className="">{item.label}</div>
              <div className="flex flex-row space-x-1 mt-2">
                <button
                  onClick={() => handleClickResume(i)}
                  className={`${BASE_BTN_STYLES} flex-grow text-base border-primary text-primary hover:bg-primary hover:text-white`}
                >
                  Resume
                </button>
                <button
                  onClick={() => shareWishlistItem(i)}
                  className={ICON_BTN_STYLES}
                >
                  <ShareIcon />
                </button>
                <button
                  onClick={() => removeFromWishlist(i)}
                  className={ICON_BTN_STYLES}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
}
