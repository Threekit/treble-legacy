---
id: display-total-price
title: Total Price
sidebar_label: Total Price
---

# Product Title

```jsx
<Price />
```

## Overview

The `<Price>` component will display the total price of your configuration. It is calculated using the first Pricebook in the Org, and the first currency in that Pricebook.

<!-- It is built using the [usePrice() hook](#use-price). -->

:::info Coming Soon!

Currently the component can only show the price from the first pricing schema. Support for multiple Pricebooks and Currencies coming soon.

:::

## Code Examples

```jsx
import { TotalPrice } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <TotalPrice />
    </div>
  );
};
```

## Props

| Type          | Description                                                              | Type   | Default |
| ------------- | ------------------------------------------------------------------------ | ------ | ------- |
| **price**     | The override 'Price' to use in place of the initialized Product's price. | string | `''`    |
| **className** | A className to the display container.                                    | string | `''`    |
