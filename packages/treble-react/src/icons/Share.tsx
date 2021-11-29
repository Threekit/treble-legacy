import React from 'react';
import styled from 'styled-components';
import { IIcon } from './index';

const SVG = styled.svg`
  .tk-icon {
    stroke: ${props => props.theme.textColor};
  }
`;

export const Share: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.88487 2L18 7.92105L9.88487 13.8421V10.6842C4.99998 10.6842 3.50001 12.5 2 16C1.50001 12.5 0.146679 5.15789 9.88486 5.15789L9.88487 2Z"
        className="tk-icon"
        strokeWidth="2"
      />
    </SVG>
  );
};

Share.iconName = 'share';

export default Share;
