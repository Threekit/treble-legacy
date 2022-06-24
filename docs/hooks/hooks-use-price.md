---
slug: treble-hooks-use-price
title: Use Price
category: 6261727455090d002780b880
parentDoc:
---

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
