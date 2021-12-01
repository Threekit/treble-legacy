---
id: form-components-tiles-group
title: Tiles Group
sidebar_label: Tiles Group
---

# Tiles Group

**A Form Component for `Asset / Part Reference` and `String` type Attributes**

```jsx
<TilesGroup />
```

## Overview

The `<TilesGroup />` component will render our a single row of Tile components, where each Tile represents an option in the options array.

**TilesGroup** are great for displaying very small option sets, example a selection between two values.

## How to Use

### Default use with an Attribute

To connect and use the `<TilesGroup />` component with an Attribute by default, you need to pass the attribute's name
to the component as the prop `attribute`.

E.g. `<TilesGroup attribute="Attribute Name" />`

### Custom use

You may want to use the **TilesGroup** component in a custom way rather than directly
with an attribute. To do this, instead of passing in an `attribute` prop, you
can directly pass in the `value`, `options` and `onClick` props. You can find more
information about the props in the Props Table below.

**Note**: The component will not manage your selection state, and will require
the selected value be passed in as well.

## Code Examples

```jsx
import { ThreekitProvider, Player, TilesGroup } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

const ThreekitApp = () => {
  return (
    <ThreekitProvider {...threekitConfig}>
      <Player />
      <div>
        <TilesGroup attribute="exterior-material">
      </div>
    </ThreekitProvider>
  );
};
```
