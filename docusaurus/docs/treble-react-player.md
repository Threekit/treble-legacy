---
id: treble-react-player
title: Player
sidebar_label: Player
---

# Player

```jsx
<Player />
```

## Overview

The `<Player />` component renders the **Threekit 2D/3D Player**.

The Player component also includes layout containers for placing `Widgets` onto the player itself. The container must be used as a child of the Player component; with its own children/content being placed in the location the widget container specified.

- TopRightWidgets
- TopCenterWidgets
- TopLeftWidgets
- MiddleRightWidgets
- MiddleLeftWidgets
- BottomRightWidgets
- BottomCenterWidgets
- BottomLeftWidgets

The containers are available on the Player itself and can be used directly from the component if needed, e.g. `<Player.TopRightWidgets> </Player.TopRightWidgets>`

:::info Player needs a height

The Player requires that it always have a defined height 1px or greater. We recommend you pass in a height value into the component props.

:::

### Code Examples

#### Basic Setup

The basic implementation of the Player component

```jsx
import { ThreekitProvider, Player } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

const ThreekitApp = () => {
  return (
    <ThreekitProvider {...threekitConfig}>
      <Player />
    </ThreekitProvider>
  );
};
```

#### Adding Widgets to the Player

Example of how to use the widget containers.

```jsx
import { ThreekitProvider, Player } from '@threekit-tools/treble';
import threekitConfig from './threekit.config.js';

//  We can separate out the widget container component
//  or use the component directly from the Player component
const { TopRightWidgets } = Player;

const ThreekitApp = () => {
  return (
    <ThreekitProvider {...threekitConfig}>
      <Player>
        <TopRightWidgets>
          <div>This will show up in the top-right of the player</div>
        </TopRightWidgets>

        <Player.BottomRightWidgets>
          <div>This will show up in the bottom-right of the player</div>
        </Player.BottomRightWidgets>
      </Player>
    </ThreekitProvider>
  );
};
```

## Props

| Property      | Description                                            | Type   | Default  |
| ------------- | ------------------------------------------------------ | ------ | -------- |
| **height**    | The height for the Player component.                   | string | `70vh`   |
| **width**     | The width for the Player component links.              | string | `100%`   |
| **minHeight** | The minimum height for the Player component messaging. | string | `#600px` |
