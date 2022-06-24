---
slug: treble-hooks-use-name
title: Use Name
category: 6261727455090d002780b880
parentDoc:
---

```jsx
const name = useName();
```

## Overview

The `useName` hook provides the name of the Product used to initialize the Threekit API.

The hook a single `string` value.

It is used to build the [Product Name Display component](display-product-name)

## Code Examples

```jsx
import { useMetadata } from '@threekit-tools/treble';

const NameComponent = () => {
  const metadata = useMetadata();
  return (
    <div>
      {Object.entries(metadata).map(([key, value], i) => (
        <div>
          {key}: {value}
        </div>
      ))}
    </div>
  );
};
```
