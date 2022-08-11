import React from 'react';
import { Wrapper } from './playerLoadingSpinner.styles';
import useThreekitInitStatus from '../../hooks/useThreekitInitStatus';

export interface PlayerLoadingSpinnerProps {
  duration?: number;
  size?: string;
}

export function PlayerLoadingSpinner(props: PlayerLoadingSpinnerProps) {
  const hide = useThreekitInitStatus();
  if (hide) return null;
  return <Wrapper size={props.size} duration={props.duration} />;
}

export default PlayerLoadingSpinner;
