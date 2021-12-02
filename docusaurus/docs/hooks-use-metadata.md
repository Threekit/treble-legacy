---
id: hooks-use-metadata
title: Use Metadata
sidebar_label: useMetadata
---

# Use Metadata

```jsx
const metadata = useMetadata();
```

## Overview

The `useMetadata` hook provides the metadata present on the item used to initialize the player.

The hook returns an object with the metadata.

It is used to build the [Description Display component](displays-description)

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
