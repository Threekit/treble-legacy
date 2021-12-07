import React from 'react';
import { IProducts } from '../../threekit';

export interface ProductLayoutProps {
  products: Record<string, IProducts>;
}

const ProductLayout: React.FC<ProductLayoutProps> = props => {
  return <>{props.children}</>;
};

export default ProductLayout;
