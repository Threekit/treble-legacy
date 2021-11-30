---
id: components-widgets
title: Widgets
sidebar_label: Widgets
---

# Widgets

The **Widgets** offer a wide range of functionality and interactivity for the user to engage with including Downloadable Snapshots, Zoom Buttons, Save-to-Wishlist etc.

All the widgets are designed to be buttons that can be placed on and around the Threekit Player. Placing the Widgets on the Player component enhances their visibility for the end user, builds consistent experiences with our player and minimizes/simplifies the Threekit UI footprint when embedding into an existing page.

## Snapshots

The `<Snapshots />` is a button that will trigger the `window.threekit.treble.takeSnapshot()` when pressed and download the specified snapshots.

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

**Note: These cameras must be setup to the configurator using the reserved camera attribute.**

## Zoom

The `<Zoom />` widget allows the user to control the zoom property of the Threekit Player.

The component is built using the useZoom hook. It provides a pair of + and - buttons the user can click to update the zoom.

It defaults to single increments changes but also accepts increment values to use instead.

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
