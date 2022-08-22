import styled, { keyframes } from 'styled-components';
import { PlayerLoadingSpinnerProps } from './index';

type WrapperProps = Pick<PlayerLoadingSpinnerProps, 'duration' | 'size'>;

const SIZE = '36px';

const spin = keyframes`
to {
  transform:  translateY(-50%) translateX(-50%) rotate(1turn);
}
`;

export const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: ${props => props.size || SIZE};
  aspect-ratio: 1;
  display: grid;
  mask: conic-gradient(from 22deg, #0001, #000);
  animation: ${spin} ${props => props.duration || 1}s steps(8) infinite;

  &,
  &:before {
    background: linear-gradient(hsl(230deg 100% 20%) 0 0) 50%/34% 8% space no-repeat,
    linear-gradient(hsl(230deg 100% 20%) 0 0) 50%/8% 34% no-repeat space;
  }

  &:before {
    content: "";
    transform: rotate(45deg);
  }
}

`;
