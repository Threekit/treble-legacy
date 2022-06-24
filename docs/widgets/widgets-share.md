---
slug: treble-widgets-share
title: Share
category: 6261727455090d002780b880
parentDoc: 62b4ff1d3a0cda006e751920
---

```jsx
<Share />
```

## Overview

The `<Share />` can be used to allow the user to share their product's configuration through a URL link.

The Share widget renders out a single button. When the button is clicked, a URL to resume the current configuration is copied to the user's clipboard and a message is shown saying the configuration have been copied.

The user can paste this URL wherever they would like to share it.

## Code Examples

```jsx
import { ThreekitProvider, Player, Share } from '@threekit-tools/treble';

const Component = () => {
  return (
    <ThreekitProvider>
      <Player>
        <Player.TopRightWidgets>
          <Share />
        </Player.TopRightWidgets>
      </Player>
    </ThreekitProvider>
  );
};
```

## Props

| Property        | Description                                                                                                    | Type                                                          | Default       |
| --------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------- |
| **message**     | Used to set an overwrite of the message presented to the user when the share URL has been successfully copied. | string                                                        | `Link copied` |
| **orientation** | Sets whether to align the buttons horizontally or vertically                                                   | `vertical` \| `horizontal`                                    | `horizontal`  |
| **shape**       | Sets the shape of the button.                                                                                  | `round` \| `square`                                           | `round`       |
| **type**        | Sets the type of button.                                                                                       | `hollow` \| `standard` \| `accent` \| `primary` \| `threekit` | `threekit`    |
| **className**   | A className to the widget container.                                                                           | string                                                        | `''`          |
