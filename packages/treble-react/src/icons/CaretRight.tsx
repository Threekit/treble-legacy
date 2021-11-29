import React from 'react';
import styled from 'styled-components';
import { IIcon } from './index';

const SVG = styled.svg`
  .tk-icon {
    stroke: ${props => props.theme.textColor};
  }
`;

export const CaretRight: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.5 17L13.5 10L6.5 3" className="tk-icon" strokeWidth="2" />
    </SVG>
  );
};

CaretRight.iconName = 'caret-right';

export default CaretRight;
