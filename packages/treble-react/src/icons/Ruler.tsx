import React from 'react';
import styled from 'styled-components';
import { IIcon } from './index';

const SVG = styled.svg`
  .tk-icon {
    stroke: ${props => props.theme.textColor};
  }
`;

export const Ruler: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5.75735"
        y="1.51472"
        width="18"
        height="6"
        transform="rotate(45 5.75735 1.51472)"
        className="tk-icon"
        strokeWidth="2"
      />
      <path
        d="M8.93934 4.6967L6.11091 7.52513M11.0607 6.81802L8.93934 8.93934M13.182 8.93934L11.0607 11.0607M15.3033 11.0607L12.4749 13.8891"
        className="tk-icon"
        strokeWidth="1"
      />
    </SVG>
  );
};

Ruler.iconName = 'ruler';

export default Ruler;
