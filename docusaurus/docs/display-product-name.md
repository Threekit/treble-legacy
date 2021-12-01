---
id: display-product-name
title: Product Name
sidebar_label: Product Name
---

# Product Name

```jsx
<ProductName />
```

## Overview

The `<ProductName />` component will display the value of the metadata key `_title` on the Catalog Item used to initialize the Player.

The title can also be overwritten by passing in your own title in as a prop.

## Code Examples

```jsx
import { ProductName } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <ProductName title="Custom Title" />
    </div>
  );
};
```

## Props

| Type          | Description                                                             | Type                          | Default |
| ------------- | ----------------------------------------------------------------------- | ----------------------------- | ------- |
| **align**     | The CSS alignment of the title text.                                    | `left` \| `right` \| `center` | `left`  |
| **title**     | The override 'Title' to use in place of the initialized Product's name. | string                        | `''`    |
| **className** | A className to the display container.                                   | string                        | `''`    |
