---
slug: components-treble-app
title: Treble App
category: 6261727455090d002780b880
parentDoc: 62b381c656b8c0008830a049
---

# Treble App

:::info Multi-product workflow

The TrebleApp component works in conjunction with the ProductLayout component for multi-product implementations. To learn more about the ProductLayout component [click here](components-treble-app).

:::

```jsx
<TrebleApp />
```

## Overview

The `<TrebleApp />` component encapsulates all the products we have defined using the Product Layouts, defined in the `src/products` folder and provides a single point of entry for a multi-product app.

## Displaying a Product

To select which product we want the TrebleApp to display we just have to pass in the correct `productId` as a prop into the component. If a **productId**, to identify which product to load, is not provided, the Treble App will default to using the first valid Product available in the `src/products` folder.

Alternatively, if the productId is not passed in as a prop, it can also be specified through the URL, by using the query-parameter `tkProduct` - i.e. `http://www.myapp.com?tkProduct=helmet`. This is useful for development and testing, however, it is not recommended for use in production as query-params can behave unexpectedly depending on where the you embed your app.

## Code Examples

```jsx
import ReactDOM from 'react-dom';
import { TrebleApp } from '@threekit-tools/treble';

ReactDOM.render(<TrebleApp />, document.getElementById('root'));
```

## Props

| Name      | Description                                                              | Type   | Default |
| --------- | ------------------------------------------------------------------------ | ------ | ------- |
| productId | The product (from the Product Layouts) to initialize the Treble App with | string | -       |
