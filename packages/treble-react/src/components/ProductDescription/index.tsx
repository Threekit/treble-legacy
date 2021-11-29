import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './description.styles';
import useMetadata from '../../hooks/useMetadata';
import { generateDisplayClassName as generateClassName } from '../../utils';

interface IProductDescription {
  description?: string;
  className?: string;
}

export const ProductDescription = (props: IProductDescription) => {
  const { description, className: customClassName } = Object.assign(
    {
      description: undefined,
      className: '',
    },
    props
  );
  const metadata = useMetadata();
  if (!description && !metadata?._description) return null;

  const cls = generateClassName('description', customClassName);

  return (
    <Wrapper className={cls}>{metadata?._description || description}</Wrapper>
  );
};

ProductDescription.propTypes = {
  /**
   * The description displayed to the user
   */
  description: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

ProductDescription.defaultProps = {
  description: undefined,
  className: '',
};

export default ProductDescription;
