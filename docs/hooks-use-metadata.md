---
slug: hooks-use-metadata
title: Use Metadata
category: 6261727455090d002780b880
parentDoc: 62b381c6f82af7001342ffec
---

# Use Metadata

```jsx
const metadata = useMetadata();
```

## Overview

The `useMetadata` hook provides the metadata present on the item used to initialize the player.

The hook returns an object with the metadata.

It is used to build the [Product Description Display component](display-product-description)

## Code Examples

```jsx
import { useMetadata } from '@threekit-tools/treble';

const MetadataComponent = () => {
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
