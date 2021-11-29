import React from 'react';
import PropTypes from 'prop-types';
import { TwinButtonWrapper as Wrapper } from '../shared.styles';
import Button, { BUTTON_SHAPES, BUTTON_TYPES } from '../Button';
import { ZoomInIcon, ZoomOutIcon } from '../../icons';
import useThreekitInitStatus from '../../hooks/useThreekitInitStatus';
import useZoom from '../../hooks/useZoom';
import { generateWidgetClassName as generateClassName } from '../../utils';

const ORIENTATIONS = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

interface ZoomComponentProps {
  step?: number;
  shape?: BUTTON_SHAPES;
  type?: BUTTON_TYPES;
  className?: string;
}

interface ZoomProps extends ZoomComponentProps {
  orientation?: string;
}

export const ZoomOutComponent = (props: ZoomComponentProps) => {
  const { step, shape, type, className } = Object.assign(
    {
      step: -1,
      zoomOut: undefined,
      type: 'standard',
      shape: 'round',
    },
    props
  );
  const hasLoaded = useThreekitInitStatus();
  const [_, zoomOut] = useZoom();
  if (!hasLoaded) return null;

  const handleZoomOut = () => zoomOut(Math.abs(step));

  const cls = generateClassName('zoom', className);

  return (
    <Button
      className={`${cls} zoom-out`}
      shape={shape}
      type={type}
      icon={ZoomOutIcon.iconName}
      onClick={handleZoomOut}
    />
  );
};

export const ZoomInComponent = (props: ZoomComponentProps) => {
  const { step, shape, type, className } = Object.assign(
    {
      step: 1,
      type: 'threekit',
      shape: 'round',
    },
    props
  );
  const hasLoaded = useThreekitInitStatus();
  const [zoomIn, _] = useZoom();
  if (!hasLoaded) return null;

  const handleZoomOut = () => zoomIn(Math.abs(step));

  const cls = generateClassName('zoom', className);

  return (
    <Button
      className={`${cls} zoom-in`}
      shape={shape}
      type={type}
      icon={ZoomInIcon.iconName}
      onClick={handleZoomOut}
    />
  );
};

export const Zoom = (props: ZoomProps) => {
  const { step, shape, type, orientation, className } = Object.assign(
    {
      step: 1,
      zoomOut: undefined,
      type: 'standard',
      shape: 'round',
      orientation: ORIENTATIONS.horizontal,
    },
    props
  );

  const cls = generateClassName('zoom', className);

  const componentProps = {
    step,
    shape,
    type,
  };

  if (orientation === ORIENTATIONS.vertical)
    return (
      <Wrapper className={cls} orientation={orientation}>
        <ZoomInComponent {...props} {...componentProps} />
        <ZoomOutComponent {...props} {...componentProps} />
      </Wrapper>
    );
  return (
    <Wrapper className={cls} orientation={orientation}>
      <ZoomOutComponent {...props} {...componentProps} />
      <ZoomInComponent {...props} {...componentProps} />
    </Wrapper>
  );
};

Zoom.propTypes = {
  /**
   * The number of steps, for both zoom-in and out, that we want to increment the zoom by.
   */
  step: PropTypes.number,
  /**
   * Used to the set the orientation/alignment of the buttons.
   */
  orientation: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
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

Zoom.defaultProps = {
  step: undefined,
  orientation: ORIENTATIONS.horizontal,
  className: '',
  shape: 'round',
  type: 'threekit',
};

Zoom.componentName = 'zoom';
Zoom.Icon = ZoomInIcon;

Zoom.ZoomOut = ZoomOutComponent;
Zoom.ZoomIn = ZoomInComponent;

export default Zoom;
