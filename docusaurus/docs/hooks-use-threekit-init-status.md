---
id: hooks-use-threekit-init-status
title: Use Threekit Init Status
sidebar_label: useThreekitInitStatus
---

# Use Threekit Init Status

```jsx
const hasLoaded = useThreekitInitStatus();
```

## Overview

The `useThreekitInitStatus` hook returns a single boolean value indicating if the Threekit API has initialized or not.

The hook will initially return `false`. Once the Threekit API has loaded it will continue to return `true`.

The Threekit Configurator, and by extension the product form, will load with the initialization of the Threekit API as the data is made available after the API loads. As such, we use this hook internally to determine if the Threekit API is ready and we should render our components or instead render some loading indicator.

## Code Examples

```jsx
import { useThreekitInitStatus } from '@threekit-tools/treble';

const Component = () => {
  const hasLoaded = useThreekitInitStatus();
  return (
    <div>
      {hasLoaded ? 'Threekit API has loaded' : 'Loading in progress...'}
    </div>
  );
};
```
