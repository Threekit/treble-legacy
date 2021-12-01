---
id: form-components-strips
title: Strips
sidebar_label: Strips
---

# Strips

**A Form Component for `Asset / Part Reference` and `String` type Attributes**

```jsx
<Strips />
```

## Overview

The `<Strips />` component will render out rows of Strips, where each strip
represents an option in the options array.

**Strips** are great for displaying option sets in which each option include an image and additional information.

They work best when the option set is small-medium sized.

## How to Use

### Default use with an Attribute

To connect and use the `<Strips />` component with an Attribute by default, you need to pass the attribute's name
to Strips component as the prop `attribute`.

E.g. `<Strips attribute="Attribute Name" />`

### Custom use

You may want to use the **Strips** component in a custom way rather than directly
with an attribute. To do this, instead of passing in an `attribute` prop, you
can directly pass in the `value`, `options` and `onClick` props. You can find more
information about the props in the Props Table below.

**Note**: The component will not manage your selection state, and will require
the selected value be passed in as well.

## Code Examples

```jsx
import { ThreekitProvider, Player, Strips } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={threekitConfig}>
      <Player />
      <div>
        <Strips attribute="exterior-material">
      </div>
    </ThreekitProvider>
  );
};
```

## Props

Each Strip component can display the following elements. When used
with an Attribute all the data will be sourced from the Threekit Platform:

- **Title** of the Catalog Item or String Value the Strip component is presenting
- **Thumbnail [Part Reference Only]** which can be either a `image url`, `css rgb value` or
  `hex value`; located in the Catalog Item's metadata under the key `_thumbnail`.
- **Description [Part Reference Only]** located in the Catalog Item's metadata
  under the key `_description`
- **Price [Part Reference Only]** The Price of the Catalog Item defined on the
  active [pricebook and currency](https://docs.threekit.com/docs/adding-pricing).
