import React from 'react';
import styled from 'styled-components';
import { IIcon } from './index';

const SVG = styled.svg`
  .tk-icon {
    stroke: ${props => props.theme.textColor};
  }
`;

export const Drag: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.75 10.5C12.4739 10.5 12.25 10.2761 12.25 10C12.25 9.72386 12.4739 9.5 12.75 9.5C13.0261 9.5 13.25 9.72386 13.25 10C13.25 10.2761 13.0261 10.5 12.75 10.5Z"
        className="tk-icon"
        strokeWidth="2"
      />
      <path
        d="M7.25 10.5C6.97386 10.5 6.75 10.2761 6.75 10C6.75 9.72386 6.97386 9.5 7.25 9.5C7.52614 9.5 7.75 9.72386 7.75 10C7.75 10.2761 7.52614 10.5 7.25 10.5Z"
        className="tk-icon"
        strokeWidth="2"
      />
      <path
        d="M12.75 5C12.4739 5 12.25 4.77614 12.25 4.5C12.25 4.22386 12.4739 4 12.75 4C13.0261 4 13.25 4.22386 13.25 4.5C13.25 4.77614 13.0261 5 12.75 5Z"
        className="tk-icon"
        strokeWidth="2"
      />
      <path
        d="M7.25 5C6.97386 5 6.75 4.77614 6.75 4.5C6.75 4.22386 6.97386 4 7.25 4C7.52614 4 7.75 4.22386 7.75 4.5C7.75 4.77614 7.52614 5 7.25 5Z"
        className="tk-icon"
        strokeWidth="2"
      />
      <path
        d="M12.75 16C12.4739 16 12.25 15.7761 12.25 15.5C12.25 15.2239 12.4739 15 12.75 15C13.0261 15 13.25 15.2239 13.25 15.5C13.25 15.7761 13.0261 16 12.75 16Z"
        className="tk-icon"
        strokeWidth="2"
      />
      <path
        d="M7.25 16C6.97386 16 6.75 15.7761 6.75 15.5C6.75 15.2239 6.97386 15 7.25 15C7.52614 15 7.75 15.2239 7.75 15.5C7.75 15.7761 7.52614 16 7.25 16Z"
        className="tk-icon"
        strokeWidth="2"
      />
    </SVG>
  );
};

Drag.iconName = 'drag';

export default Drag;
