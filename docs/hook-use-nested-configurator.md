---
slug: hooks-use-nested-configurator
title: Use Nested Configurator
category: 62b1eff483c1e000b8a4dc26
tags:
  - Hooks
---

```jsx
const [attributes, setConfiguration, metadata, price] =
  useNestedConfigurator(address);
```

## Overview

The `useNestedConfigurator` hook allows us to connect to a nested product configurator, including its metadata and price.

The hook returns an array of four items. The first item is almost identical to the value returned by `getDisplayAttributes()`. The second item is a change handler function that passes the value passed in straight through to `setConfiguration()`. The third is the metadata object. Finally, the fourth is the price.

## Code Examples

```jsx
import { useNestedConfigurator } from '@threekit-tools/treble';

const AttributeComponent = () => {
  const [attributes, setConfiguration, metadata, price] =
    useNestedConfigurator(address);
  return <div>Attributes Component example</div>;
};
```
