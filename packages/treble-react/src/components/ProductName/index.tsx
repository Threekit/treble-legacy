import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './productName.styles';
import useName from '../../hooks/useName';
import { generateDisplayClassName as generateClassName } from '../../utils';

interface ITitle {
  title?: string;
  className?: string;
  align?: string;
}

export const ProductName = (props: ITitle) => {
  const {
    title,
    className: customClassName,
    align,
  } = Object.assign({ className: '', align: 'left' }, props);
  const name = useName();
  if (!title?.length && !name) return null;

  const cls = generateClassName('title', customClassName);

  return (
    <Wrapper align={align} className={cls}>
      {name || title}
    </Wrapper>
  );
};

ProductName.propTypes = {
  /**
   * The title displayed to the user
   */
  title: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
  /**
   * The CSS Text alignment property. Options: 'left' | 'center' | 'right'
   */
  align: PropTypes.string,
};

ProductName.defaultProps = {
  className: '',
  align: 'left',
};

export default ProductName;
