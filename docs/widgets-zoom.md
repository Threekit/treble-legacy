---
slug: widgets-zoom
title: Zoom
category: 6261727455090d002780b880
parentDoc: 62b381c6798771004e5b994c
---

```jsx
<Zoom />
```

## Overview

The `<Zoom />` widget allows the user to control the zoom property of the Threekit Player.

The component is built using the useZoom hook. It provides a pair of + and - buttons the user can click to update the zoom.

It defaults to single increments changes but also accepts increment values to use instead.

## Code Example

```jsx
import { ThreekitProvider, Player, Zoom } from '@threekit-tools/treble';

const Component = () => {
  return (
    <ThreekitProvider>
      <Player>
        <Player.MiddleRightWidgets>
          <Zoom orientation="vertical" />
        </Player.MiddleRightWidgets>
      </Player>
    </ThreekitProvider>
  );
};
```

## Props

| Property        | Description                                                  | Type                                                          | Default      |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------- | ------------ |
| **orientation** | Sets whether to align the buttons horizontally or vertically | `vertical` \| `horizontal`                                    | `horizontal` |
| **step**        | The amount to step the zoom by.                              | number                                                        | 1            |
| **shape**       | Sets the shape of the button.                                | `round` \| `square`                                           | `round`      |
| **type**        | Sets the type of button.                                     | `hollow` \| `standard` \| `accent` \| `primary` \| `threekit` | `threekit`   |
| **className**   | A className to the widget container.                         | string                                                        | `''`         |
