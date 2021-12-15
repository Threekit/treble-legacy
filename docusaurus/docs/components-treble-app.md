---
id: components-treble-app
title: Treble App
sidebar_label: Treble App
---

# Treble App

```jsx
<TrebleApp />
```

## Overview

The `<TrebleApp />` component encapsulates all the Product Layouts, defined in the `src/products` folder, as a single component. It provides a single point of entry for a multi-product app.

If a **productId**, to identify which product to load, is not provided, the Treble App will default to using the first valid Product available in the `src/products` folder. You can specify the productId either through the URL, by using the query-parameter `tkProduct` - i.e. `http://www.myapp.com?tkProduct=helmet` - or by passing in the productId as a prop directly into the Treble App component.

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
