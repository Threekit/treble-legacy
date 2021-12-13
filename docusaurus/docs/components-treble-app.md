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

## Code Examples

```jsx
import ReactDOM from 'react-dom';
import { TrebleApp } from '@threekit-tools/treble';

ReactDOM.render(<TrebleApp />, document.getElementById('root'));
```

## Props

| Name      | Description                                   | Type   | Default |
| --------- | --------------------------------------------- | ------ | ------- |
| productId | The product to initialize the Treble App with | string | -       |
