---
id: components-product-layout
title: Product Layout
sidebar_label: Product Layout
---

# Product Layout

```js
<ProductLayout />
```

## Overview

The `<ProductLayout>` component is used to wrap a single UI for one-or-more products, in order for them to be accessible in the `<TrebleApp>` component.

The ProductLayout products prop which specifies which products from the Threekit Platform this product layout should be used to display.

:::caution File Names

Product Layout files must be named to match the following pattern: `*.product.jsx`. For example, `Helmet.product.jsx`

:::

## Code Examples

```jsx
import ReactDOM from 'react-dom';
import { ProductLayout, Player, FlatForm } from '@threekit-tools/treble';

const products = {
  'helmet-small': {
    preview: '<ASSET ID>',
  },
  'helmet-large': {
    preview: '<ASSET ID>',
  },
};

export default function HelmetProduct() {
  return (
    <ProductLayout products={products}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 400px',
          gridGap: '15px',
        }}
      >
        <Player />
        <FlatForm />
      </div>
    </ProductLayout>
  );
}
```

## Props

| Name     | Descriptions                                                | Type   | Default |
| -------- | ----------------------------------------------------------- | ------ | ------- |
| products | All the products that this Product Layout will be used for. | string | -       |
