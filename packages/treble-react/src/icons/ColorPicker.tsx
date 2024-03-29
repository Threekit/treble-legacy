import React from 'react';
import styled from 'styled-components';
import { IIcon } from './index';

const SVG = styled.svg`
  .tk-icon {
    stroke: ${props => props.theme.textColor};
  }
`;

export const ColorPicker: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0052 10.0732L10.1768 7.24479L2.75216 14.6694C2.09319 15.3284 1.99019 16.3328 2.44316 17.0997L2.04505 17.4978C1.84979 17.6931 1.84979 18.0097 2.04505 18.2049C2.24031 18.4002 2.5569 18.4002 2.75216 18.2049L3.15027 17.8068C3.91722 18.2598 4.92162 18.1568 5.58059 17.4978L13.0052 10.0732Z"
        className="tk-icon"
        strokeWidth="2"
      />
      <path
        d="M17.955 5.12347C18.736 4.34242 18.736 3.07609 17.955 2.29505C17.1739 1.514 15.9076 1.514 15.1265 2.29505L13.0052 4.41637L11.591 3.00215C11.2005 2.61163 10.5673 2.61163 10.1768 3.00215L8.76257 4.41637C8.37204 4.80689 8.37204 5.44006 8.76257 5.83058L14.4194 11.4874C14.8099 11.878 15.4431 11.878 15.8336 11.4874L17.2478 10.0732C17.6384 9.6827 17.6384 9.04953 17.2478 8.65901L15.8336 7.24479L17.955 5.12347Z"
        className="tk-icon"
        strokeWidth="2"
      />
    </SVG>
  );
};

ColorPicker.iconName = 'color-picker';

export default ColorPicker;
