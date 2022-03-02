---
id: form-components-upload
title: Upload
sidebar_label: Upload
---

# Upload

**A Form Component for an `Image Upload` type Attributes**

```jsx
<Upload />
```

## Overview

The `<Upload />` component...

## How to Use

### Default use with an Attribute

To connect and use the `<Upload />` component with an Image Upload Attribute by default, you need to pass the attribute's name
to the component as the prop `attribute`.

E.g. `<Upload attribute="Attribute Name" />`

### Custom use

## Code Examples

```jsx
import { ThreekitProvider, Player, Upload } from '@threekit-tools/treble';

const App = () => {
  return (
    <ThreekitProvider>
      <Player />
      <div>
        <Upload attribute="front-image">
      </div>
    </ThreekitProvider>
  );
};
```
