import React from 'react';
import {
  WishlistItemWrapper as Wrapper,
  WishlistThumbnail as Thumbnail,
  WishlistTitle as Title,
  WishlistActionArea as ActionArea,
} from './wishlist.styles';
import { Button } from '../Button';
import { IMetadata } from '../../threekit';

interface WishlistItemProps {
  thumbnail?: string;
  metadata?: IMetadata;
  onResume: () => void;
  onShare: () => void;
  onDelete: () => void;
}

export const WishlistItem = (props: WishlistItemProps) => {
  const { thumbnail, metadata, onResume, onShare, onDelete } = props;
  const { name, _pdf } = metadata || {};

  const handleClickShare = (e: React.SyntheticEvent) => {
    onShare();
    e.stopPropagation();
  };

  const handleClickDelete = (e: React.SyntheticEvent) => {
    onDelete();
    e.stopPropagation();
  };

  return (
    <Wrapper onClick={onResume}>
      <Thumbnail>
        {thumbnail ? <img src={thumbnail} alt="saved-configuration" /> : null}
      </Thumbnail>
      <Title>{name}</Title>
      <ActionArea>
        {_pdf && typeof _pdf === 'string' ? (
          <Button
            type="accent"
            title="Open PDF"
            onClick={() => window.open(_pdf)}
          />
        ) : (
          <Button type="accent" icon="cart" title="Add to Cart" />
        )}
        <Button icon="share" onClick={handleClickShare} />
        <Button icon="delete" onClick={handleClickDelete} />
      </ActionArea>
    </Wrapper>
  );
};

export default WishlistItem;
