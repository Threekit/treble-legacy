import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './totalPrice.styles';
import usePrice from '../../hooks/usePrice';
import { generateDisplayClassName as generateClassName } from '../../utils';

interface IPrice {
  price?: string;
  className?: string;
}

export const TotalPriceComponent = (props: IPrice) => {
  const { price, className: customClassName } = props;
  const cls = generateClassName('price', customClassName);
  return <Wrapper className={cls}>{price}</Wrapper>;
};

export const TotalPrice = (props: IPrice) => {
  const { price, className } = props;
  const priceData = usePrice();

  let preppedPrice = props.price;

  if (priceData) preppedPrice = `${priceData.price} ${priceData.currency}`;

  if (!price && !priceData) return null;
  return <TotalPriceComponent className={className} price={preppedPrice} />;
};

TotalPriceComponent.propTypes = {
  /**
   * The price displayed to the user
   */
  price: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

TotalPriceComponent.defaultProps = {
  price: undefined,
  className: '',
};

export default TotalPrice;
