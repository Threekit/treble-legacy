import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeartIcon from '../../icons/Heart';
import WishlistIcon from '../../icons/Wishlist';
import { Button, BUTTON_SHAPES, BUTTON_TYPES } from '../Button';
import Drawer from '../Drawer';
import { TwinButtonWrapper } from '../shared.styles';
import { generateWidgetClassName as generateClassName } from '../../utils';
import WishlistItem from './WishlistItem';
import { WishlistWrapper as Wrapper } from './wishlist.styles';
import useWishlist from '../../hooks/useWishlist';

interface WidgetButtonProps {
  title?: string;
  type?: BUTTON_TYPES;
  shape?: BUTTON_SHAPES;
  className?: string;
  onClick: () => void;
}

interface WishlistProps {
  showLabel?: boolean;
  type?: BUTTON_TYPES;
  shape?: BUTTON_SHAPES;
  className?: string;
}

export const AddWishlistButton = (props: WidgetButtonProps) => {
  const { title, type, shape, className, onClick } = props;
  return (
    <Button
      title={title}
      icon={HeartIcon.iconName}
      className={className}
      onClick={onClick}
      type={type}
      shape={shape}
    />
  );
};

export const WishlistButton = (props: WidgetButtonProps) => {
  const { title, type, shape, className, onClick } = props;
  return (
    <Button
      title={title}
      icon={WishlistIcon.iconName}
      className={className}
      onClick={onClick}
      type={type}
      shape={shape}
    />
  );
};

export const Wishlist = (props: WishlistProps) => {
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlist, addToWishlist] = useWishlist();
  const { className, showLabel } = props;
  const shape = props.shape || 'round';
  const type = props.type || 'threekit';

  const cls = generateClassName('wishlist', className);

  if (!wishlist || !addToWishlist) return null;

  const handleAddToWishlist = async () => {
    await addToWishlist();
    setShowWishlist(true);
  };

  return (
    <React.Fragment>
      <TwinButtonWrapper>
        <AddWishlistButton
          title={showLabel ? 'Add to Wishlist' : undefined}
          className={cls}
          onClick={handleAddToWishlist}
          type={type}
          shape={shape}
        />
        <WishlistButton
          title={showLabel ? 'Open Wishlist' : undefined}
          className={cls}
          onClick={() => setShowWishlist(true)}
          type={type}
          shape={shape}
        />
      </TwinButtonWrapper>
      <Drawer
        title="Wishlist"
        show={showWishlist}
        handleClose={() => setShowWishlist(false)}
      >
        <Wrapper>
          {wishlist.map((el, i) => (
            <WishlistItem
              key={i}
              thumbnail={el.thumbnail || undefined}
              metadata={el.metadata || undefined}
              onDelete={el.handleRemove}
              onResume={() => {
                el.handleSelect();
                setShowWishlist(false);
              }}
              onShare={el.handleShare}
            />
          ))}
        </Wrapper>
      </Drawer>
    </React.Fragment>
  );
};

Wishlist.propTypes = {
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

Wishlist.defaultProps = {
  classname: '',
  shape: 'round',
  type: 'threekit',
};

Wishlist.componentName = 'wishlist';
Wishlist.Icon = WishlistIcon;

export default Wishlist;
