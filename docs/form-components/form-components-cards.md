---
slug: form-components-cards
title: Cards
category: 6261727455090d002780b880
parentDoc: 62b381c61332320084fdb81d
---

**A Form Component for `Asset / Part Reference` and `String` type Attributes**

```jsx
<Cards />
```

## Overview

The component will render out rows of Cards, where each card represents an option in the options array.

Cards are great for displaying option sets where the **options include both an image and additional information**. They work best when the option set is small and the thumbnail is important for the
user in their selection process.

## How to Use

### Default use with an Attribute

To connect and use the `<Cards />` component with an Attribute by default, you need to pass the attribute's name
to Cards component as the prop `attribute`.

E.g. `<Cards attribute="Attribute Name" />`

### Custom use

You may want to use the **Cards** component in a custom way rather than directly
with an attribute. To do this, instead of passing in an `attribute` prop, you
can directly pass in the `value`, `options` and `onClick` props. You can find more
information about the props in the Props Table below.

**Note**: The component will not manage your selection state, and will require
the selected value be passed in as well.

## Code Examples

```jsx
import { ThreekitProvider, Player, Cards } from '@threekit-tools/treble';

const App = () => {
  return (
    <ThreekitProvider>
      <Player />
      <div>
        <Cards attribute="exterior-material">
      </div>
    </ThreekitProvider>
  );
};
```

## Props

Each Card component can display the following elements. When used
with an Attribute all the data will be sourced from the Threekit Platform:

- **Title** of the Catalog Item or String Value the Card component is presenting
- **Thumbnail [Part Reference Only]** which can be either a `image url`, `css rgb value` or
  `hex value`; located in the Catalog Item's metadata under the key `_thumbnail`.
- **Description [Part Reference Only]** located in the Catalog Item's metadata
  under the key `_description`
- **Price [Part Reference Only]** The Price of the Catalog Item defined on the
  active [pricebook and currency](https://docs.threekit.com/docs/adding-pricing).
