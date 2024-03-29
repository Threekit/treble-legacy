---
id: display-attribute-title
title: Attribute Title
sidebar_label: Attribute Title
---

# Attribute Title

```jsx
<AttributeTitle />
```

## Overview

The `<AttributeTitle>` will display the translated attribute name of an attribute.

It is built using the [useName() hook](#use-name).

## Code Examples

```jsx
import { AttributeTitle } from '@threekit-tools/treble';

const Component = () => {
  return (
    <div>
      <AttributeTitle attribute="Attribute Name" />
    </div>
  );
};
```

## Props

| Type          | Description                                                                                                                     | Type   | Default |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- |
| **attribute** | The name of the attribute you want to display the title of.                                                                     | string | `''`    |
| **title**     | The text you wish to display as a title. If both `title` and `attribute` are defined, the component will sue the `title` value. | string | `''`    |
| **className** | A className to the display container.                                                                                           | string | `''`    |
