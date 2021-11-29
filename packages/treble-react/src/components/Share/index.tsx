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
}

export const Share = (props: ShareProps) => {
  const { shape, type, className } = Object.assign(
    { type: 'threekit', shape: 'round' },
    props
  );

  const hasLoaded = useThreekitInitStatus();
  const handleShare = useShare();
  if (!hasLoaded) return null;

  const cls = generateClassName('share', className);

  return (
    <Button
      className={cls}
      shape={shape}
      type={type}
      icon={ShareIcon.iconName}
      onClick={handleShare}
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
};

Share.defaultProps = {
  className: '',
  shape: 'round',
  type: 'threekit',
};

export default Share;
