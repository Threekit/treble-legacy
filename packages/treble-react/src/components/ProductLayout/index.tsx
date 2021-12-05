import React from 'react';

interface ProductLayoutProps {
  products: string | Array<string> | Record<string, string>;
}

const ProductLayout: React.FC<ProductLayoutProps> = props => {
  return <>{props.children}</>;
};

export default ProductLayout;
