import React, { useEffect, useState } from 'react';
import { Wrapper, HandWrapper } from './draggableIndicator.styles';
import DraggableIcon from '../../icons/Draggable';
import useFirstPlayerInteraction from '../../hooks/useFirstPlayerInteraction';

export interface DraggableIndicatorProps {
  color?: string;
  duration?: number;
  timeout?: number;
}

export function DraggableIndicator(props: DraggableIndicatorProps) {
  const awaitingFirstInteraction = useFirstPlayerInteraction();
  const [hasTimeoutExpired, setHasTimeoutExpired] = useState(false);

  useEffect(() => {
    if (awaitingFirstInteraction && props.timeout)
      setTimeout(() => setHasTimeoutExpired(true), props.timeout);
  }, [awaitingFirstInteraction, props.timeout]);

  if (!awaitingFirstInteraction || hasTimeoutExpired) return null;
  return (
    <Wrapper>
      <HandWrapper color={props.color} duration={props.duration}>
        <div>
          <DraggableIcon />
        </div>
      </HandWrapper>
    </Wrapper>
  );
}

export default DraggableIndicator;
