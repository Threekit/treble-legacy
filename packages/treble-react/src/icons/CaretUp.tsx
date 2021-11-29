import React from 'react';
import styled from 'styled-components';
import { IIcon } from './index';

const SVG = styled.svg`
  .tk-icon {
    stroke: ${props => props.theme.textColor};
  }
`;

export const CaretUp: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 14L10 7L3 14" className="tk-icon" strokeWidth="2" />
    </SVG>
  );
};

CaretUp.iconName = 'caret-up';

export default CaretUp;
