import React from 'react';
import styled from 'styled-components';
import { IIcon } from './index';

const SVG = styled.svg`
  .tk-icon {
    stroke: ${props => props.theme.textColor};
  }
`;

export const Cart: IIcon = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 15H5.5L6.5 12M1.5 3H3.5L4.16667 5M6.5 12H14.5L17 5H4.16667M6.5 12L4.16667 5"
        className="tk-icon"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle cx="5" cy="16.5" r="1" className="tk-icon" strokeWidth="1" />
      <circle cx="15" cy="16.5" r="1" className="tk-icon" strokeWidth="1" />
    </SVG>
  );
};

Cart.iconName = 'cart';

export default Cart;
