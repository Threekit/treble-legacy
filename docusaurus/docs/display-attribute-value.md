---
id: display-attribute-value
title: Attribute Value
sidebar_label: Attribute Value
---

# Attribute Value

```jsx
<AttributeValue />
```

## Overview

The `<AttributeValue>` will display the translated selected value of an attribute.

## Code Examples

```jsx
import { AttributeValue } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <AttributeValue attribute="Exterior Material">
    </div>
  );
};
```

## Props

| Type          | Description                                                 | Type   | Default |
| ------------- | ----------------------------------------------------------- | ------ | ------- |
| **attribute** | The name of the attribute you want to display the value of. | string | `''`    |
| **className** | A className to the display container.                       | string | `''`    |
