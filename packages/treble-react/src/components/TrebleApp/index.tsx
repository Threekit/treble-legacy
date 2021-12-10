import React, { Children } from 'react';
import ThreekitProvider, { ThreekitProviderProps } from '../ThreekitProvider';
import { getParams, loadTrebleConfig } from '../../utils';
import { TK_PRODUCT_ID_PARAM_KEY } from '../../constants';
import { IProducts } from '../../threekit';

interface TrebleAppProps extends Omit<ThreekitProviderProps, 'children'> {
  productId?: string;
}

const productsMap: Record<string, IProducts> = {};
const productComponents: Array<React.FC> = [];
const productToComponentMap: Record<string, number> = {};

export default function TrebleApp(props: TrebleAppProps) {
  const { project, productId, playerConfig, threekitEnv, locale, theme } =
    props;

  const config = loadTrebleConfig();

  if (!config.treble?.productsCtx) return null;

  if (!productComponents.length) {
    config.treble.productsCtx.keys().forEach(fileName => {
      if (!fileName.includes('product.js')) return;
      if (fileName.includes('].product.js')) return;
      productComponents.push(config.treble?.productsCtx(fileName).default);
    });

    Children.forEach(
      Object.values(productComponents).map(el => el({})),
      (jsx, i) => {
        if (!jsx) return;
        if (jsx.type.name !== 'ProductLayout') return;
        if (!jsx.props.products) return;

        let products: Record<string, IProducts> = jsx.props.products;

        Object.entries(products).forEach(([prodKey, prodObj]) => {
          productsMap[prodKey] = prodObj;
          productToComponentMap[prodKey] = i;
        });
      }
    );
  }

  const params = getParams();

  let id: undefined | string = productId;

  if (!id) {
    if (params[TK_PRODUCT_ID_PARAM_KEY])
      id = Object.keys(productToComponentMap).find(
        el => params[TK_PRODUCT_ID_PARAM_KEY] === el
      );
    else id = Object.keys(productToComponentMap)[0];
  }

  if (!id) return null;

  const Product = productComponents[productToComponentMap[id]];
  if (!Product) return null;

  const preppedProject = Object.assign({}, project, {
    products: productsMap[id],
  });

  return (
    <ThreekitProvider
      project={preppedProject}
      locale={locale}
      playerConfig={playerConfig}
      theme={theme}
      threekitEnv={threekitEnv}
    >
      <Product />
    </ThreekitProvider>
  );
}
