import React from 'react';
import PropTypes from 'prop-types';
import Button, { BUTTON_SHAPES, BUTTON_TYPES } from '../Button';
import { ShareIcon } from '../../icons';
import useThreekitInitStatus from '../../hooks/useThreekitInitStatus';
import useShare from '../../hooks/useShare';
import { generateWidgetClassName as generateClassName } from '../../utils';

interface ShareProps {
  shape?: BUTTON_SHAPES;
  type?: BUTTON_TYPES;
  className?: string;
  message?: string;
}

export const Share = (props: ShareProps) => {
  const { shape, type, className, message } = Object.assign(
    { type: 'threekit', shape: 'round', message: 'Link copied!' },
    props
  );

  const hasLoaded = useThreekitInitStatus();
  const handleShare = useShare();
  if (!hasLoaded || !handleShare) return null;

  const cls = generateClassName('share', className);

  const handleClick = () => {
    handleShare(message);
  };

  return (
    <Button
      className={cls}
      shape={shape}
      type={type}
      icon={ShareIcon.iconName}
      onClick={handleClick}
    />
  );
};

Share.propTypes = {
  className: PropTypes.string,
  /**
   * The presentational type of the input component. Options
   * include: `hollow`, `standard`, `accent`, `primary`
   */
  type: PropTypes.string,
  /**
   * Used to set the shape of the Widget button. Options
   * include: `square`, `round`
   */
  shape: PropTypes.string,
  /**
   * Used to set an overwrite of the message presented to the user
   * when the share URL has been successfully copied.
   */
  message: PropTypes.string,
};

Share.defaultProps = {
  className: '',
  shape: 'round',
  type: 'threekit',
  message: 'Link copied!',
};

export default Share;
