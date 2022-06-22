---
slug: getting-started-multi-products
title: Managing multiple products
category: 6261727455090d002780b880
parentDoc: 62603c47e065f503a3a80f3f
---

# Managing multiple products

## Overview

So far we've discussed building out a UI for a **single product**, however, the Treble Framework also supports **multiple products in a single app**. In this tutorial we'll convert the product configurator UI we've built into a Product Layout and set it up in our multi-product app.

## Product Layouts and the TrebleApp

To use the multi-product workflow, we'll swap out the `<ThreekitProvider />` for one or more `<ProductLayout />` components and a `<TrebleApp />`. We'll be using the Product Layout component to create individual UI layouts that can be used for one-or-more products and then use our TrebleApp to select which product to view.

### Creating a Product Layout

To convert our existing Product's UI to a Product Layout, we'll need to do 2 things:

- replace the `<ThreekitProvider />` with the `<ProductLayout />` component
- and provide our ProductLayout with a list of products it should be used for

Here is what that would look like for our app:

```jsx
import { ProductLayout, Player, Share } from '@threekit-tools/treble';
import Swatch from './components/Swatch';
import Dropdown from './components/Dropdown';

const products = {
  helmet: { preview: { assetId: '<ASSET_ID>' } },
};

const HelmetProduct = () => {
  return (
    <ProductLayout products={products}>
      <Player>
        <Player.TopRightWidgets>
          <Share />
        </Player.TopRightWidgets>
      </Player>
      <div>
        <Dropdown attribute="Exterior Material" />
        <Swatch attribute="Exterior Color" />
      </div>
    </ProductLayout>
  );
};
```

> 📘 products folder
>
> All product UIs built using the ProductLayouts must be place in the `src/products` folder.

### Using the TrebleApp

The TrebleApp is how to use and display the Product Layouts build in the `src/products` folder.

To select a product to display, pass in it's `productId` as a prop into the TrebleApp component. If a productId is not provided, it will use the first valid product found in the products folder, or look for a productId in the url param `tkProduct`.

Below, we'll setup the TrebleApp for the helmet product we created earlier.

```jsx
import ReactDOM from 'react-dom';
import { TrebleApp } from '@threekit-tools/treble';

ReactDOM.render(
  <TrebleApp productId="helmet" />,
  document.getElementById('tk-treble-root')
);
```
