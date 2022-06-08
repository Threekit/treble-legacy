import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './productDescription.styles';
import useMetadata from '../../hooks/useMetadata';
import { generateDisplayClassName as generateClassName } from '../../utils';

interface IProductDescription {
  description?: string;
  className?: string;
}

export const ProductDescriptionComponent = (props: IProductDescription) => {
  const { description, className: customClassName } = Object.assign(
    { className: '' },
    props
  );
  const cls = generateClassName('description', customClassName);
  return <Wrapper className={cls}>{description}</Wrapper>;
};

const ProductDescription = (props: IProductDescription) => {
  const { description, className } = Object.assign(
    {
      description: undefined,
    },
    props
  );
  const metadata = useMetadata();
  if (!description && !metadata?._description) return null;

  if (!description) return null;

  return (
    <ProductDescriptionComponent
      className={className}
      description={metadata?._description?.toString() || description}
    />
  );
};

ProductDescriptionComponent.propTypes = {
  /**
   * The description displayed to the user
   */
  description: PropTypes.string,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */
  className: PropTypes.string,
};

ProductDescriptionComponent.defaultProps = {
  description: undefined,
  className: '',
};

export default ProductDescription;
