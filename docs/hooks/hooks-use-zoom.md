---
slug: treble-hooks-use-zoom
title: Use Zoom
category: 6261727455090d002780b880
parentDoc: 62b4ff1dea5ebc037be1664b
---

```jsx
const [zoomIn, zoomOut] = useZoom();
```

## Overview

The `useZoom` hook provides functionality to control the zoom property in the Threekit Player.

The hook returns an array of 2 functions: zoom-in and zoom-out. Both functions accept a single argument: the zoom increment step.

The default increment value is `1`.

It is used to build the [Zoom Widget](widgets-zoom).

## Code Examples

```jsx
import { useZoom } from '@threekit-tools/treble';

const ZoomComponent = () => {
  const [zoomIn, zoomOut] = useZoom();
  return (
    <div>
      // Changes zoom by +1
      <button onClick={zoomIn}>Zoom In</button>
      // Changes zoom -3
      <button onClick={() => zoomOut(3)}>Zoom Out</button>
    </div>
  );
};
```
