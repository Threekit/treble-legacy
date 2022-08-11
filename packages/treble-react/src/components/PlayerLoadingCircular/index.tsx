import React from 'react';
import { Wrapper, Progress } from './playerLoadingCircular.styles';
import useLoadingProgress from '../../hooks/useLoadingProgress';

export interface PlayerLoadingCircularProps {
  size?: string;
}

export function PlayerLoadingCircular(props: PlayerLoadingCircularProps) {
  const progress = useLoadingProgress();
  if (progress === 100 || progress === undefined) return null;
  return (
    <Wrapper size={props.size}>
      <Progress size={props.size} progress={progress} />
    </Wrapper>
  );
}

export default PlayerLoadingCircular;
