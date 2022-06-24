---
slug: treble-widgets-snapshots
title: Snapshots
category: 6261727455090d002780b880
parentDoc:
---

```jsx
<Snapshots />
```

## Overview

The `<Snapshots />` is a button that will trigger the `window.threekit.treble.takeSnapshot()` when pressed and download the specified snapshots.

## Code Examples

```jsx
import { ThreekitProvider, Player, Snapshots } from '@threekit-tools/treble';

const Component = () => {
  return (
    <ThreekitProvider>
      <Player>
        <Player.TopRightWidgets>
          <Snapshots
            cameras={[undefined, 'birdsey-camera']}
            config={{ format: 'jpeg' }}
          />
        </Player.TopRightWidgets>
      </Player>
    </ThreekitProvider>
  );
};
```

The Snapshot takes two props: `camerasList` and `snapshotsConfig`.

The `camerasList` take a list of cameras to take snapshots from. It can be a single `string` or an `array of strings` depending on how many cameras are to be used for the snapshot. To take a snapshot from the user's current view, we specify that camera as undefined, both as an individual camera value or as part of the array of cameras. e.g. `const cameras = [undefined, 'snapshot-camera-alt']`

The `snapshotConfig` allows us to define the following values:

```js
const snapshotsConfig = {
  format: 'png' | 'jpeg',
  filename: 'snapshot-filename',
};
```

> 🚧 Note
>
> These cameras must be setup to the configurator using the reserved camera attribute.

## Props

| Property        | Description                                                  | Type                                                          | Default      |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------- | ------------ |
| **orientation** | Sets whether to align the buttons horizontally or vertically | `vertical` \| `horizontal`                                    | `horizontal` |
| **shape**       | Sets the shape of the button.                                | `round` \| `square`                                           | `round`      |
| **type**        | Sets the type of button.                                     | `hollow` \| `standard` \| `accent` \| `primary` \| `threekit` | `threekit`   |
| **className**   | A className to the widget container.                         | string                                                        | `''`         |
