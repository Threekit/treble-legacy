import React from 'react';
import styled, { keyframes } from 'styled-components';

interface ISpinnerProps {
  size?: string;
}

function Spinner(props: ISpinnerProps) {
  return <Wrapper size={props.size} />;
}

const spin = keyframes`
to {
    transform: rotate(360deg);
}
`;

const Wrapper = styled.div<ISpinnerProps>`
  display: inline-block;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border: 5px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${spin} 1s ease-in-out infinite;
`;

Spinner.iconName = 'spinner';
export default Spinner;
