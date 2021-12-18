---
id: components-product-layout
title: Product Layout
sidebar_label: Product Layout
---

# Product Layout

```jsx
<ProductLayout />
```

## Overview

The `<ProductLayout />` component is used to create a UI layout for one-or-many products and make them accessible to the `<TrebleApp />`. The component contains no visual/UI elements of its own and is purely for facilitating a multi-product setup.

To create a Product Layout, you would build your UI view as normal and wrap the whole view inside the `<ProductLayout />` component. Each product in the ProductLayout must have its own **productId**, which must be unique across all products. Its through this productId that we define which product for our App to load.

:::caution File Names

Product Layout files must be named to match the following pattern: `*.product.jsx`. For example, `Helmet.product.jsx`

:::

## Code Examples

```jsx
import { ProductLayout, Player, FlatForm } from '@threekit-tools/treble';

const products = {
  'helmet-small': {
    preview: { assetId: '<ASSET ID>' },
  },
  'helmet-large': {
    preview: { assetId: '<ASSET ID>' },
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

| Name     | Descriptions                                                               | Type         | Default |
| -------- | -------------------------------------------------------------------------- | ------------ | ------- |
| products | An object, defining the products that the Product Layout will be used for. | `ProductObj` | -       |
