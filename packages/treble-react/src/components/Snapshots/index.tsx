import React from 'react';
import PropTypes from 'prop-types';
import Button, { BUTTON_SHAPES, BUTTON_TYPES } from '../Button';
import DownloadIcon from '../../icons/Download';
import useThreekitInitStatus from '../../hooks/useThreekitInitStatus';
import useSnapshot from '../../hooks/useSnapshot';
import { ISnapshotsCameras, ITakeSnapshotsConfig } from '../../Treble';
import { generateWidgetClassName as generateClassName } from '../../utils';

interface SnapshotProps {
  shape?: BUTTON_SHAPES;
  type?: BUTTON_TYPES;
  cameras: ISnapshotsCameras;
  config: ITakeSnapshotsConfig;
  className?: string;
}

export const Snapshots = (props: SnapshotProps) => {
  const { cameras, config, shape, type, className } = Object.assign(
    { type: 'threekit', shape: 'round' },
    props
  );

  const preppedConfig = Object.assign({ output: 'download' }, config);

  const hasLoaded = useThreekitInitStatus();
  const takeSnapshot = useSnapshot(cameras || undefined, preppedConfig);
  if (!hasLoaded) return null;

  const cls = generateClassName('snapshots', className);

  return (
    <Button
      className={cls}
      shape={shape}
      type={type}
      icon={DownloadIcon.iconName}
      onClick={takeSnapshot}
    />
  );
};

Snapshots.propTypes = {
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

Snapshots.defaultProps = {
  className: '',
  shape: 'round',
  type: 'threekit',
};

export default Snapshots;
