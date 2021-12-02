---
id: hooks-use-price
title: Use Price
sidebar_label: usePrice
---

# Use Price

```jsx
const totalPrice = usePrice();
```

## Overview

The `usePrice` hook provides the total price of the current configuration calculated based on the pricing set on the Threekit Platform.

## Code Examples

```jsx
import { usePrice } from '@threekit-tools/treble';

const PriceComponent = () => {
  const price = usePrice();
  return <div>${price}</div>;
};
```
