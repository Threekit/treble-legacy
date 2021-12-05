import React, { Children } from 'react';
import ThreekitProvider, { ThreekitProviderProps } from '../ThreekitProvider';

interface IProducts {
  ctx: __WebpackModuleApi.RequireContext;
}

interface ProductLoaderProps extends Omit<ThreekitProviderProps, 'children'> {
  productId: string;
  products: IProducts;
}

const productAssetId: Record<string, string> = {};
const productComponents: Array<React.FC> = [];
const productToComponentMap: Record<string, number> = {};

export default function ProductLoader(props: ProductLoaderProps) {
  const { productId, products, credentials, playerConfig, theme, threekitEnv } =
    props;
  if (!productId || !products) return null;

  if (!productComponents.length) {
    products.ctx.keys().forEach(fileName => {
      if (!fileName.includes('product.js')) return;
      if (fileName.includes('].product.js')) return;
      productComponents.push(products.ctx(fileName).default);
    });

    Children.forEach(
      Object.values(productComponents).map(el => el({})),
      (jsx, i) => {
        if (!jsx) return;
        if (jsx.type.name !== 'ProductLayout') return;
        if (!jsx.props.products) return;

        let products: Record<string, string>;

        if (Array.isArray(jsx.props.products))
          products = (jsx.props.products as Array<string>).reduce(
            (output, id) => Object.assign(output, { [id]: id }),
            {}
          );
        else if (typeof jsx.props.products === 'string') {
          const prdStr = jsx.props.products as string;
          products = { [prdStr]: prdStr };
        } else {
          products = jsx.props.products as Record<string, string>;
        }

        Object.entries(products).forEach(([key, assetId]) => {
          productAssetId[key] = assetId;
          productToComponentMap[key] = i;
        });
      }
    );
  }

  const Product = productComponents[productToComponentMap[props.productId]];
  if (!Product) return null;
  const assetId = productAssetId[props.productId];

  const env = threekitEnv || 'preview';

  const preppedCredentials = Object.assign({}, credentials);
  preppedCredentials[env] = Object.assign(preppedCredentials[env], {
    assetId,
  });

  return (
    <ThreekitProvider
      credentials={preppedCredentials}
      playerConfig={Object.assign({}, playerConfig)}
      theme={theme}
    >
      <Product />
    </ThreekitProvider>
  );
}
