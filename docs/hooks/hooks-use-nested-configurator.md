---
slug: treble-hooks-use-nested-configurator
title: Use Nested Configurator
category: 6261727455090d002780b880
parentDoc: 62b4ff1dea5ebc037be1664b
---

```jsx
const [attributes, setConfiguration, metadata, price] =
  useNestedConfigurator(address);
```

## Overview

The `useNestedConfigurator` hook allows a user to connect to a nested product configurator, including its metadata and price.

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
