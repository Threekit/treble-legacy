---
id: hooks-use-configurator
title: Use Configurator
sidebar_label: useConfigurator
---

# Use Configurator

```jsx
const [attributes, setConfiguration] = useConfigurator('Attribute Name');
```

## Overview

The `useConfigurator` hook allows us to connect to all our attributes in the initialized item's configurator.

The hook returns an array of two items. The first item is almost identical to the value returned by `getDisplayAttributes()`. The second item is a change handler function that passes the value passed in straight through to `setConfiguration()`.

## Code Examples

```jsx
import { useConfigurator } from '@threekit-tools/treble';

const AttributeComponent = () => {
  const [attributes, setConfiguration] = useConfigurator();
  return <div>Attributes Component example</div>;
};
```
