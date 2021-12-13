---
id: hooks-use-attribute
title: Use Attribute
sidebar_label: useAttribute
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

  const selected = attribute.value;

  return (
    <div>
      <div>{attribute.label}</div>
      <div>
        {attribute.values.map((option, i) => (
          <div key={i} onClick={() => setAttribute(option.assetId)}>
            {option.label}
          </div>
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
      <div>{attribute.label}</div>
      <div>
        {attribute.values.map((option, i) => (
          <div key={i} onClick={() => setAttribute(option.value)}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
```
