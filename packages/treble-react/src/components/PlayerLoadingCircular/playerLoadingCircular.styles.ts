import styled from 'styled-components';
import { PlayerLoadingCircularProps } from './index';

interface ProgressProps extends PlayerLoadingCircularProps {
  progress: number;
}

const PRIMARY_COLOR = '#369';
const SECONDARY_COLOR = '#adf';
const SIZE = '120px';

export const Wrapper = styled.div<Pick<ProgressProps, 'size'>>`
  height: ${props => props.size || SIZE};
  width: ${props => props.size || SIZE};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

export const Progress = styled.div<ProgressProps>`
  animation: progress 2s 0.5s forwards;
  width: ${props => props.size || SIZE};
  aspect-ratio: 1;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: conic-gradient(
      ${PRIMARY_COLOR} calc(${props => props.progress} * 1%),
      ${SECONDARY_COLOR} 0
    );
    mask: radial-gradient(#0000 55%, #000 0);
    mask-mode: alpha;
  }

  &::after {
    counter-reset: percentage ${props => props.progress};
    content: counter(percentage) '%';
    font-family: Helvetica, Arial, sans-serif;
    font-size: calc(${props => props.size || SIZE} / 5);
    color: ${PRIMARY_COLOR};
  }
`;
