---
slug: components-product-layout
title: Product Layout
category: 6261727455090d002780b880
parentDoc: 62b381c656b8c0008830a049
---

> 📘 Multi-product workflow
>
> The ProductLayout component works in conjunction with the TrebleApp component for multi-product implementations. To learn more about the TrebleApp component [click here](components-treble-app).

> 🚧 No ThreekitProvider required
>
> You **do not** need to use the ThreekitProvider if you are using the `<PlayerLayouts>` component to defined multiple products. The PlayerLayout component will setup the ThreekitProvider for you internally.

```jsx
<ProductLayout />
```

## Overview

The `<ProductLayout />` is a wrapper component used to define a UI for one-or-many products that require the same Configurator Form. It contains no UI of its own and will internally setup the ThreekitProvider for the product it encapsulates.

All ProductsLayouts must be in the `src/products` folder.

## Creating a ProductLayout

To create a Product Layout, you would build your UI view as normal and wrap the whole view inside the `<ProductLayout />` component.

Each product in the ProductLayout must have its own unique **productId**. This productId is how we tell our TrebleApp which product we want to be loaded in our app. We pass these productId's and their related product credentials to the ProductLayout component using the `products` prop.

> 🚧 File Names
>
> Product Layout files must be named to match the following pattern: `*.product.jsx`. For example, `Helmet.product.jsx`

## Using the TrebleApp

While the ProductLayout is used to define our Product's UI, its the TrebleApp component that will be used to render it out.

All the products defined correctly in the `src/products` folder, using the ProductLayout component are automatically available to the `<TrebleApp />` component. To select which product we want to display we just have to pass in the correct `productId` as a prop into the TrebleApp.

You can learn more about the TrebleApp by [clicking here](components-treble-app).

## Code Examples

#### Setting up a ProductLayout for multiple products

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

#### Using the Product through the TrebleApp

```jsx
import ReactDOM from 'react-dom';
import { TrebleApp } from '@threekit-tools/treble';

ReactDOM.render(
  <TrebleApp productId="helmet-small" />,
  document.getElementById('root')
);
```

## Props

| Name     | Descriptions                                                               | Type         | Default |
| -------- | -------------------------------------------------------------------------- | ------------ | ------- |
| products | An object, defining the products that the Product Layout will be used for. | `ProductObj` | -       |
