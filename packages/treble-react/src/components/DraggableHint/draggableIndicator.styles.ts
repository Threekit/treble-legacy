import styled, { keyframes } from 'styled-components';
import { DraggableIndicatorProps } from './index';

type HandWrapperProps = Pick<DraggableIndicatorProps, 'color' | 'duration'>;

const bounce = keyframes`
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(-100px);
    }

    100% {
        transform: translateX(0);
    }
`;

export const Wrapper = styled.div`
  width: max-content;
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

export const HandWrapper = styled.div<HandWrapperProps>`
  height: 56px;
  width: 56px;
  background: ${props => props.color || '#78c4a299'};
  margin: 0 auto;
  border-radius: 50%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  animation: ${bounce} ${props => props.duration || 2.5}s ease infinite;

  & > div {
    height: max-content;
    width: max-content;
    margin: 0 auto;
  }
`;
