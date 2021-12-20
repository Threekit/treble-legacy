---
id: tutorial-player
title: Setting up your Threekit Player
sidebar_label: '2. Setting up the Player'
---

# Setting up your Threekit Player

## The Player Component

The `<Player>` component, available as both a native component and custom component, should be used to render out the Threekit 3D/2D Player. Only a single Player component can be rendered in the DOM at any given time.

```jsx
import { ThreekitProvider, Player } from '@threekit-tools/treble';

const TrebleApp = () => {
  return (
    <ThreekitProvider>
      <Player />
    </ThreekitProvider>
  );
};
```

All styling and CSS related to the Player should be applied directly in the Player component and its relevant styles directly.

:::info Player Component sizing limitation

The player component is required to have a height above 0px at all times. If the div we try to embed the player into has a height of 0px, the Threekit API will not be able to use that div for the Player load and the API will not initialize correctly.

:::

## The Player Config

The Threekit Player also allows for a significant amount of customization and control (non-styling) through the parameters we pass in during the Threekit API's initialization. All these parameters and their defaults can be found in `.treble/player.config.js`. To change any of these parameters for your project, you simply need to update the values in the player.config.js file and restart your local development server for the changes to have taken effect.
