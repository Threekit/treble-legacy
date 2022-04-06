import React, { Children } from 'react';
import { useThreekitSelector } from '../../store';
import ThreekitProvider, { ThreekitProviderProps } from '../ThreekitProvider';
import { getParams, loadTrebleConfig } from '../../utils';
import { TK_PRODUCT_ID_PARAM_KEY, IS_TREBLE_SCRIPTS } from '../../constants';
import { IProducts } from '../../types';
import { getProductId } from '../../store/product';

interface TrebleAppProps extends Omit<ThreekitProviderProps, 'children'> {
  productId?: string;
}

const productsMap: Record<string, IProducts> = {};
const productComponents: Array<React.FC> = [];
const productToComponentMap: Record<string, number> = {};

export const Products = () => {
  const productId = useThreekitSelector(getProductId);

  if (!productId) return null;

  const Product = productComponents[productToComponentMap[productId]];
  if (!Product) return null;

  return <Product />;
};

export default function TrebleApp(props: TrebleAppProps) {
  const {
    project,
    productId,
    playerConfig,
    threekitEnv,
    locale,
    theme,
    eventHandlers,
    reducer,
  } = props;

  const config = IS_TREBLE_SCRIPTS ? loadTrebleConfig() : {};

  if (!config.treble?.productsCtx) {
    console.error('Treble Config is not setup correctly');
    return null;
  }

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

  const preppedProject = Object.assign({}, project, {
    products: productsMap,
  });

  return (
    <ThreekitProvider
      productId={id}
      project={preppedProject}
      locale={locale}
      playerConfig={playerConfig}
      theme={theme}
      threekitEnv={threekitEnv}
      eventHandlers={eventHandlers}
      reducer={reducer}
    >
      <Products />
    </ThreekitProvider>
  );
}
