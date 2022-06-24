---
slug: treble-display-product-description
title: Product Description
category: 6261727455090d002780b880
parentDoc: 62b4ff1d11db8c0013df7d5f
---

```jsx
<ProductDescription />
```

## Overview

The `<ProductDescription />` component will display the value of the metadata key `_description` on the Catalog Item used to initialize the Player.

The description can also be overwritten by passing in your own description in as a prop.

It is built using the [useMetadata() hook](#use-metadata).

## Code Examples

```jsx
import { Description } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <ProductDescription />
      // With a custom description
      <ProductDescription description="This is a custom description." />
    </div>
  );
};
```

## Props

| Type            | Description                                                                          | Type   | Default |
| --------------- | ------------------------------------------------------------------------------------ | ------ | ------- |
| **description** | The override 'Description' to use in place of the initialized Product's description. | string | `''`    |
| **className**   | A className to the display container.                                                | string | `''`    |
