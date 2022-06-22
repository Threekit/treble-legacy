---
slug: hooks-use-attribute
title: Use Attribute
category: 62b1eff483c1e000b8a4dc26
---

# Use Attribute

```jsx
const [attribute, setAttribute] = useAttribute('Attribute Name');
```

## Overview

The `useAttribute` hook allows us to connect a component to an Attribute in our product's configurator.

It takes the name of the attribute that you want to interact with and returns an array where the first element is the data for that attribute, as returned by the `getDisplayAttributes()` function, and the second element is a function that can be used to update the value of that attribute, by prepping and passing the value on to `setConfiguration()`.

## Code Examples

#### For a Asset/Part Reference type Attribute

```jsx
import { useAttribute } from '@threekit-tools/treble';

const AttributeComponent = () => {
  const [attribute, setAttribute] = useAttribute('Attribute Name');

  return (
    <div>
      <h2>{attribute.label}</h2>
      <div>
        {attribute.values.map((option, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setAttribute(option.assetId)}
            selected={option.assetId === attribute.value.assetId}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
```

#### For a String type Attribute with a defined option set

```jsx
import { useAttribute } from '@threekit-tools/treble';

const AttributeComponent = () => {
  const [attribute, setAttribute] = useAttribute('Attribute Name');

  const selected = attribute.value;

  return (
    <div>
      <h2>{attribute.label}</h2>
      <div>
        {attribute.values.map((option, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setAttribute(option.value)}
            selected={option.value === attribute.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
```

#### For an Image Upload type Attribute with a defined option set

```jsx
import { useAttribute } from '@threekit-tools/treble';

const AttributeComponent = () => {
  const [attribute, setAttribute] = useAttribute('Attribute Name');

  return (
    <div>
      <h2>{attribute.label}</h2>
      <div>
        <input type="file" onChange={e => setAttribute(e.target.files[0])} />
      </div>
    </div>
  );
};
```
