---
id: form-components-tiles
title: Tiles
sidebar_label: Tiles
---

# Tiles

**A Form Component for `Asset / Part Reference` and `String` type Attributes**

```jsx
<Tiles />
```

## Overview

The `<Tiles />` component will render out 2 or more columns of Tile components, where each Tile
represents an option in the options array. The Tiles form a neat grid.

**Tiles** are great for displaying option sets where each option only
needs to display a title.

## How to Use

### Default use with an Attribute

To connect and use the `<Tiles />` component with an Attribute by default, you need to pass the attribute's name
to the component as the prop `attribute`.

E.g. `<Tiles attribute="Attribute Name" />`

### Custom use

You may want to use the **Tiles** component in a custom way rather than directly
with an attribute. To do this, instead of passing in an `attribute` prop, you
can directly pass in the `value`, `options` and `onClick` props. You can find more
information about the props in the Props Table below.

**Note**: The component will not manage your selection state, and will require
the selected value be passed in as well.

## Code Examples

```jsx
import { ThreekitProvider, Player, Tiles } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

const ThreekitApp = () => {
  return (
    <ThreekitProvider {...threekitConfig}>
      <Player />
      <div>
        <Tiles attribute="exterior-material">
      </div>
    </ThreekitProvider>
  );
};
```
